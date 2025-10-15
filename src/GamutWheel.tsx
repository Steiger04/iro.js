import { h } from "preact";
import { useRef, useEffect, useMemo } from "preact/hooks";
import {
  IroColor,
  cssBorderStyles,
  cssValue,
  isInputInsideGamutWheel,
  getGamutWheelHandlePosition,
  getGamutWheelValueFromInput,
  translateWheelAngle,
  getWheelDimensions,
  getHandleAtPoint,
  mapToGamutPerceptual,
  WheelDirection,
} from "@irojs/iro-core";

import { IroComponentWrapper } from "./ComponentWrapper";
import { IroComponentProps, IroInputType } from "./ComponentTypes";
import { IroHandle } from "./Handle";

export interface IroGamutWheelProps extends IroComponentProps {
  colors: IroColor[];
}

export function IroGamutWheel(props: IroGamutWheelProps) {
  // Gamut validation with safe fallback
  const validGamuts = new Set(["A", "B", "C"]);
  const safeGamut =
    props.gamut && validGamuts.has(props.gamut) ? props.gamut : "B";

  if (!props.gamut || !validGamuts.has(props.gamut)) {
    console.warn(
      "GamutWheel requires gamut to be A, B, or C. Received:",
      props.gamut,
      "- Falling back to gamut B"
    );
  }

  // Props extraction and defaults
  const { colors } = props;
  const wheelAngle = props.wheelAngle ?? 0;
  const wheelDirection = props.wheelDirection;
  const wd: WheelDirection =
    wheelDirection === "clockwise" ? "clockwise" : "anticlockwise";
  const propsWithDefaults = { ...props, wheelAngle, wheelDirection: wd };
  const { width, radius, cx, cy } = getWheelDimensions(propsWithDefaults);

  // Refs and state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorPicker = props.parent;
  const activeColor = props.color;
  const hsv = activeColor.hsv;
  const handlePositions = colors.map((color) =>
    getGamutWheelHandlePosition(propsWithDefaults, color)
  );

  // Lightweight memoization cache for handle colors to avoid redundant computation
  // Cache is keyed by: colorIndex, hue, gamut, matrixProfile
  // Invalidated when any dependency changes
  const handleColorCache = useMemo(
    () => new Map<string, string>(),
    [safeGamut, props.matrixProfile]
  );

  // Helper function to compute gamut-mapped HSL color for a handle
  const getHandleColor = (color: IroColor): string => {
    // Create cache key from color properties and dependencies
    const cacheKey = `${color.index}:${color.hue}:${color.saturation}:${color.value}`;

    // Check cache first
    const cached = handleColorCache.get(cacheKey);
    if (cached !== undefined) {
      return cached;
    }

    // IMPORTANT: Use saturation=100% AND value=100% to match the canvas rendering.
    // The canvas renders all colors at full saturation and full brightness, with:
    // - White radial overlay creating the visual saturation gradient
    // - Black lightness overlay (when wheelLightness=true) creating the brightness gradient
    // The handle must use the same approach (s=100, v=100) to ensure color consistency.
    // If we used v=color.value here, brightness would be reduced twice:
    // once in the computed color, and again by the lightness overlay.
    const hsv = { h: color.hue, s: color.saturation, v: color.value };
    const rgb = IroColor.hsvToRgb(hsv);

    const mappedRgb = mapToGamutPerceptual(rgb, safeGamut, props.matrixProfile);
    const mappedHsv = IroColor.rgbToHsv(mappedRgb);
    const hsl = IroColor.hsvToHsl(mappedHsv);
    const result = `hsl(${Math.round(hsl.h)}, ${Math.round(
      hsl.s
    )}%, ${Math.round(hsl.l)}%)`;

    // Store in cache
    handleColorCache.set(cacheKey, result);
    return result;
  };

  // Canvas rendering logic
  useEffect(() => {
    // Inline HSV to RGB conversion helper (avoids IroColor object creation per pixel)
    function hsvToRgb(
      h: number,
      s: number,
      v: number
    ): { r: number; g: number; b: number } {
      const hNorm = h / 60;
      const sNorm = s / 100;
      const vNorm = v / 100;

      const c = vNorm * sNorm;
      const x = c * (1 - Math.abs((hNorm % 2) - 1));
      const m = vNorm - c;

      let r = 0,
        g = 0,
        b = 0;

      if (hNorm >= 0 && hNorm < 1) {
        r = c;
        g = x;
        b = 0;
      } else if (hNorm >= 1 && hNorm < 2) {
        r = x;
        g = c;
        b = 0;
      } else if (hNorm >= 2 && hNorm < 3) {
        r = 0;
        g = c;
        b = x;
      } else if (hNorm >= 3 && hNorm < 4) {
        r = 0;
        g = x;
        b = c;
      } else if (hNorm >= 4 && hNorm < 5) {
        r = x;
        g = 0;
        b = c;
      } else if (hNorm >= 5 && hNorm < 6) {
        r = c;
        g = 0;
        b = x;
      }

      return {
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((b + m) * 255),
      };
    }

    function renderGamutWheel() {
      if (!canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d", {
        willReadFrequently: false,
      }) as CanvasRenderingContext2D | null;
      if (!ctx) return;

      // Validate width before creating ImageData (prevents IndexSizeError)
      if (!width || width <= 0 || !Number.isFinite(width)) {
        console.warn("GamutWheel renderGamutWheel: Invalid width", width);
        return;
      }

      // HiDPI/Retina support
      const dpr = window.devicePixelRatio || 1;
      const physicalWidth = Math.round(width * dpr);
      const physicalHeight = Math.round(width * dpr);

      // Set canvas physical dimensions (scaled for HiDPI)
      canvas.width = physicalWidth;
      canvas.height = physicalHeight;

      // Calculate physical center and radius
      const pCx = Math.round(cx * dpr);
      const pCy = Math.round(cy * dpr);
      const pRadius = Math.round(radius * dpr);

      // Create ImageData for pixel manipulation at physical size
      const imageData = ctx.createImageData(physicalWidth, physicalHeight);
      const data = imageData.data;

      // For each pixel in the canvas (physical coordinates)
      for (let y = 0; y < physicalHeight; y++) {
        for (let x = 0; x < physicalWidth; x++) {
          // 1. Calculate distance from center in physical coordinates
          const dx = x - pCx;
          const dy = pCy - y; // Note: pCy - y because DOM Y-axis points down
          const distance = Math.sqrt(dx * dx + dy * dy);

          // 2. Only render inside the circle
          if (distance <= pRadius) {
            // 3. Convert Cartesian to Polar coordinates
            const visualAngle = Math.atan2(dy, dx) * (360 / (2 * Math.PI));

            // 4. Convert visual angle to HSV hue
            const hue = translateWheelAngle(
              propsWithDefaults,
              visualAngle,
              false
            );

            // 5. Use 100% saturation (saturation gradient is applied by CSS overlay)
            const saturation = 100;

            // 6. Convert HSV to RGB (with V=100 for full brightness)
            const rgb = hsvToRgb(hue, saturation, 100);

            // 7. Apply perceptual gamut mapping with matrix profile
            const mappedRgb = mapToGamutPerceptual(
              rgb,
              safeGamut,
              props.matrixProfile
            );

            // 8. Set pixel in ImageData
            const index = (y * physicalWidth + x) * 4;
            data[index] = mappedRgb.r; // Red
            data[index + 1] = mappedRgb.g; // Green
            data[index + 2] = mappedRgb.b; // Blue
            data[index + 3] = 255; // Alpha (fully opaque)
          }
          // Pixels outside the circle remain transparent (alpha = 0)
        }
      }

      // Put ImageData onto canvas at origin (no transform needed)
      ctx.putImageData(imageData, 0, 0);
    }

    renderGamutWheel();
  }, [
    width,
    radius,
    cx,
    cy,
    safeGamut,
    props.matrixProfile,
    wheelAngle,
    wheelDirection,
    props.wheelLightness,
  ]);

  // Event handling function
  function handleInput(x: number, y: number, inputType: IroInputType) {
    if (inputType === IroInputType.Start) {
      // Check if input is inside wheel
      if (!isInputInsideGamutWheel(propsWithDefaults, x, y)) {
        return false;
      }

      // Check if input hit a handle
      const activeHandle = getHandleAtPoint(
        propsWithDefaults,
        x,
        y,
        handlePositions
      );

      if (activeHandle !== null) {
        // Hit a handle, switch active color
        colorPicker.setActiveColor(activeHandle);
      } else {
        // Didn't hit a handle, update color
        colorPicker.inputActive = true;
        activeColor.hsv = getGamutWheelValueFromInput(propsWithDefaults, x, y);
      }
    } else if (inputType === IroInputType.Move) {
      // Update color during drag
      colorPicker.inputActive = true;
      activeColor.hsv = getGamutWheelValueFromInput(propsWithDefaults, x, y);
    }
    // let the color picker fire input:start, input:move or input:end events
    props.onInput(inputType, props.id);
  }

  // Render JSX
  return (
    <IroComponentWrapper {...props} onInput={handleInput}>
      {(uid: string, rootProps: any, rootStyles: preact.JSX.CSSProperties) => (
        <div
          {...rootProps}
          className="IroGamutWheel"
          style={{
            width: cssValue(width),
            height: cssValue(width),
            position: "relative",
            ...rootStyles,
          }}
        >
          {/* Canvas for gamut-mapped color wheel */}
          <canvas
            ref={canvasRef}
            className="IroGamutWheelCanvas"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "50%",
            }}
          />

          {/* Saturation overlay (radial gradient from white to transparent) */}
          <div
            className="IroGamutWheelSaturation"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background:
                "radial-gradient(circle closest-side, #fff, transparent)",
              pointerEvents: "none",
            }}
          />

          {/* Lightness overlay (optional) */}
          {props.wheelLightness && (
            <div
              className="IroGamutWheelLightness"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background: "#000",
                opacity: 1 - hsv.v / 100,
                pointerEvents: "none",
              }}
            />
          )}

          {/* Border */}
          <div
            className="IroGamutWheelBorder"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              boxSizing: "border-box",
              ...cssBorderStyles(props),
              pointerEvents: "none",
            }}
          />

          {/* Inactive handles - rendered after overlays to appear on top */}
          {colors
            .filter((color) => color !== activeColor)
            .map((color) => (
              <IroHandle
                isActive={false}
                index={color.index}
                fill={getHandleColor(color)}
                r={props.handleRadius}
                url={props.handleSvg}
                props={props.handleProps}
                x={handlePositions[color.index].x}
                y={handlePositions[color.index].y}
              />
            ))}

          {/* Active handle - rendered last to appear on top of inactive handles */}
          <IroHandle
            isActive={true}
            index={activeColor.index}
            fill={getHandleColor(activeColor)}
            r={props.activeHandleRadius || props.handleRadius}
            url={props.handleSvg}
            props={props.handleProps}
            x={handlePositions[activeColor.index].x}
            y={handlePositions[activeColor.index].y}
          />
        </div>
      )}
    </IroComponentWrapper>
  );
}
