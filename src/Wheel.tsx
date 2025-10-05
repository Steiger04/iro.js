import { h } from "preact";
import {
  IroColor,
  cssGradient,
  cssBorderStyles,
  isInputInsideWheel,
  getWheelDimensions,
  getWheelHandlePosition,
  getWheelValueFromInput,
  getHandleAtPoint,
  cssValue,
} from "@irojs/iro-core";

import { IroComponentWrapper } from "./ComponentWrapper";
import { IroComponentProps, IroInputType } from "./ComponentTypes";
import { IroHandle } from "./Handle";

const HUE_GRADIENT_CLOCKWISE =
  "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)";
const HUE_GRADIENT_ANTICLOCKWISE =
  "conic-gradient(red, magenta, blue, aqua, lime, yellow, red)";
// Base rotation to convert from math convention (0°=East) to CSS (0°=North)
const BASE_ROT_DEG = 90;

interface IroWheelProps extends IroComponentProps {
  colors: IroColor[];
}

export function IroWheel(props: IroWheelProps) {
  const { colors, borderWidth } = props;

  // Default to 0 if wheelAngle is null or undefined (nullish coalescing)
  const wheelAngle = props.wheelAngle ?? 0;
  // Normalize wheelDirection: only 'clockwise' is clockwise, everything else is 'anticlockwise'
  const wd = (
    props.wheelDirection === "clockwise" ? "clockwise" : "anticlockwise"
  ) as "clockwise" | "anticlockwise";

  // Create props object with default values for core functions
  const propsWithDefaults = { ...props, wheelAngle, wheelDirection: wd };

  const { width, radius, cx, cy } = getWheelDimensions(propsWithDefaults);

  // Calculate hue rotation: BASE_ROT_DEG converts from math to CSS coordinates
  // For clockwise: subtract wheelAngle, for anticlockwise: add wheelAngle
  const hueRotation =
    wd === "clockwise" ? BASE_ROT_DEG - wheelAngle : BASE_ROT_DEG + wheelAngle;

  const colorPicker = props.parent;
  const activeColor = props.color;
  const hsv = activeColor.hsv;
  const handlePositions = colors.map((color) =>
    getWheelHandlePosition(propsWithDefaults, color)
  );
  const circleStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    boxSizing: "border-box",
  };

  function handleInput(x: number, y: number, inputType: IroInputType) {
    if (inputType === IroInputType.Start) {
      // input hitbox is a square,
      // so we want to ignore any initial clicks outside the circular shape of the wheel
      if (!isInputInsideWheel(propsWithDefaults, x, y)) {
        // returning false will cease all event handling for this interaction
        return false;
      }
      // getHandleAtPoint() returns the index for the handle if the point 'hits' it, or null otherwise
      const activeHandle = getHandleAtPoint(
        propsWithDefaults,
        x,
        y,
        handlePositions
      );
      // If the input hit a handle, set it as the active handle, but don't update the color
      if (activeHandle !== null) {
        colorPicker.setActiveColor(activeHandle);
      }
      // If the input didn't hit a handle, set the currently active handle to that position
      else {
        colorPicker.inputActive = true;
        activeColor.hsv = getWheelValueFromInput(propsWithDefaults, x, y);
        props.onInput(inputType, props.id);
      }
    }
    // move is fired when the user has started dragging
    else if (inputType === IroInputType.Move) {
      colorPicker.inputActive = true;
      activeColor.hsv = getWheelValueFromInput(propsWithDefaults, x, y);
    }
    // let the color picker fire input:start, input:move or input:end events
    props.onInput(inputType, props.id);
  }

  return (
    <IroComponentWrapper {...props} onInput={handleInput}>
      {(uid, rootProps, rootStyles) => (
        <div
          {...rootProps}
          className="IroWheel"
          style={{
            width: cssValue(width),
            height: cssValue(width),
            position: "relative",
            ...rootStyles,
          }}
        >
          {/* CSS rotation: BASE_ROT_DEG converts from math convention (0°=East) to CSS (0°=North)
              For clockwise: subtract wheelAngle
              For anticlockwise: add wheelAngle
              This aligns with translateWheelAngle's coordinate system. */}
          <div
            className="IroWheelHue"
            style={{
              ...circleStyles,
              transform: `rotateZ(${hueRotation}deg)`,
              background:
                wd === "clockwise"
                  ? HUE_GRADIENT_CLOCKWISE
                  : HUE_GRADIENT_ANTICLOCKWISE,
            }}
          />
          <div
            className="IroWheelSaturation"
            style={{
              ...circleStyles,
              background:
                "radial-gradient(circle closest-side, #fff, transparent)",
            }}
          />
          {props.wheelLightness && (
            <div
              className="IroWheelLightness"
              style={{
                ...circleStyles,
                background: "#000",
                opacity: 1 - hsv.v / 100,
              }}
            />
          )}
          <div
            className="IroWheelBorder"
            style={{
              ...circleStyles,
              ...cssBorderStyles(props),
            }}
          />
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
