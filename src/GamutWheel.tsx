import { h } from "preact";
import { useRef, useEffect } from "preact/hooks";
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
  // Gamut validation (early exit)
  const validGamuts = new Set(["A", "B", "C"]);
  if (!props.gamut || !validGamuts.has(props.gamut)) {
    console.warn(
      "GamutWheel requires gamut to be A, B, or C. Received:",
      props.gamut
    );
    return null;
  }

  // Props extraction and defaults
  const { colors } = props;
  const wheelAngle = props.wheelAngle ?? 0;
  const wheelDirection = props.wheelDirection;
  const wd: WheelDirection =
    wheelDirection === "clockwise" ? "clockwise" : "anticlockwise";
  const propsWithDefaults = { ...props, wheelAngle, wheelDirection: wd };
  const { width, radius, cx, cy } = getWheelDimensions(propsWithDefaults);

  // Early exit if dimensions are invalid (prevents createImageData errors)
  if (!width || width <= 0 || !Number.isFinite(width)) {
    console.warn(
      "GamutWheel: Invalid dimensions, skipping render. width:",
      width
    );
    return null;
  }

  // Refs and state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorPicker = props.parent;
  const activeColor = props.color;
  const hsv = activeColor.hsv;
  const handlePositions = colors.map((color) =>
    getGamutWheelHandlePosition(propsWithDefaults, color)
  );

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

      // Apply DPR scaling to drawing context
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Create ImageData for pixel manipulation at logical size
      const imageData = ctx.createImageData(width, width);
      const data = imageData.data;

      // For each pixel in the canvas (logical coordinates)
      for (let y = 0; y < width; y++) {
        for (let x = 0; x < width; x++) {
          // 1. Calculate distance from center
          const dx = x - cx;
          const dy = cy - y; // Note: cy - y because DOM Y-axis points down
          const distance = Math.sqrt(dx * dx + dy * dy);

          // 2. Only render inside the circle
          if (distance <= radius) {
            // 3. Convert Cartesian to Polar coordinates
            const visualAngle = Math.atan2(dy, dx) * (360 / (2 * Math.PI));

            // 4. Convert visual angle to HSV hue
            const hue = translateWheelAngle(
              propsWithDefaults,
              visualAngle,
              false
            );

            // 5. Calculate saturation from distance
            const saturation = (distance / radius) * 100;

            // 6. Convert HSV to RGB (with V=100 for full brightness)
            const rgb = hsvToRgb(hue, saturation, 100);

            // 7. Apply perceptual gamut mapping
            const mappedRgb = mapToGamutPerceptual(rgb, props.gamut);

            // 8. Set pixel in ImageData
            const index = (y * width + x) * 4;
            data[index] = mappedRgb.r; // Red
            data[index + 1] = mappedRgb.g; // Green
            data[index + 2] = mappedRgb.b; // Blue
            data[index + 3] = 255; // Alpha (fully opaque)
          }
          // Pixels outside the circle remain transparent (alpha = 0)
        }
      }

      // Put ImageData onto canvas at logical coordinates (DPR scaling applies automatically)
      ctx.putImageData(imageData, 0, 0);
    }

    renderGamutWheel();
  }, [
    width,
    radius,
    cx,
    cy,
    props.gamut,
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

          {/* Inactive handles */}
          {colors
            .filter((color) => color !== activeColor)
            .map((color) => (
              <IroHandle
                isActive={false}
                index={color.index}
                fill={color.hslString}
                r={props.handleRadius}
                url={props.handleSvg}
                props={props.handleProps}
                x={handlePositions[color.index].x}
                y={handlePositions[color.index].y}
              />
            ))}

          {/* Active handle */}
          <IroHandle
            isActive={true}
            index={activeColor.index}
            fill={activeColor.hslString}
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
