import { h, Component } from "preact";
import {
  IroColor,
  IroColorValue,
  IroColorPickerOptions,
  iroColorPickerOptionDefaults,
  GamutType,
  translateWheelAngle,
} from "@irojs/iro-core";

import { IroInputType } from "./ComponentTypes";
import { IroWheel } from "./Wheel";
import { IroSlider } from "./Slider";
import { createWidget } from "./createWidget";

interface ColorPickerEvents {
  [key: string]: Function[];
}

interface ColorDeferredEvents {
  [key: string]: Array<any>;
}

interface ColorPickerEventGuards {
  [key: string]: boolean;
}

interface ColorPickerLayoutDefinition {
  component: any;
  options?: any;
}

type ColorPickerLayoutShorthand = "default";

export interface ColorPickerProps extends IroColorPickerOptions {
  display?: string;
  id?: string;
  layout?: ColorPickerLayoutDefinition[] | ColorPickerLayoutShorthand;
  colors?: IroColorValue[];
  transparency?: boolean;
  margin?: number;
  preserveVisualHueOnWheelChange?: boolean;
}

export interface ColorPickerState extends ColorPickerProps {
  layout: ColorPickerLayoutDefinition[] | ColorPickerLayoutShorthand;
  color: IroColor;
  colors: IroColor[];
}

export class IroColorPicker extends Component<
  ColorPickerProps,
  ColorPickerState
> {
  public static defaultProps: Partial<ColorPickerProps> = {
    colors: [],
    display: "block",
    id: undefined,
    layout: "default",
    margin: 0,
    preserveVisualHueOnWheelChange: true,
  };

  public el!: HTMLElement;
  public id: string;
  public colors: IroColor[] = [];
  public color!: IroColor;
  public inputActive: boolean = false;

  private events: ColorPickerEvents = {};
  private activeEvents: ColorPickerEventGuards = {};
  private deferredEvents: ColorDeferredEvents = {};
  private suppressColorEvents = false;

  constructor(props: ColorPickerProps) {
    super(props);
    this.id = props.id || "";
    const colors =
      props.colors && props.colors.length > 0
        ? props.colors
        : [props.color || "#fff"];
    colors.forEach((colorValue) => this.addColor(colorValue));
    this.setActiveColor(0);
    // Pass all the props into the component's state,
    // Except we want to add the color object and make sure that refs aren't passed down to children
    this.state = {
      ...props,
      color: this.color,
      colors: this.colors,
      layout: props.layout || "default",
    };
  }

  // Plubic multicolor API

  /**
   * @desc Get the current gamut type from state or props
   * @internal
   */
  getCurrentGamut() {
    return this.state && this.state.gamut !== undefined
      ? this.state.gamut
      : this.props.gamut !== undefined
      ? this.props.gamut
      : iroColorPickerOptionDefaults.gamut;
  }
  /**
   * @desc Add a color to the color picker
   * @param color new color to add
   * @param index optional color index
   */
  public addColor(color: IroColorValue, index: number = this.colors.length) {
    // Create a new iro.Color
    // Also bind it to onColorChange, so whenever the color changes it updates the color picker
    // Use gamut from state if available, otherwise fall back to props or default
    const gamut = this.getCurrentGamut();
    const newColor = new IroColor(color, this.onColorChange.bind(this), gamut);
    // Insert color @ the given index
    this.colors.splice(index, 0, newColor);
    // Reindex colors
    this.colors.forEach((color, index) => (color.index = index));
    // Update picker state if necessary
    if (this.state) {
      this.setState({ colors: this.colors });
    }
    // Fire color init event
    this.deferredEmit("color:init", newColor);
  }

  /**
   * @desc Remove a color from the color picker
   * @param index color index
   */
  public removeColor(index: number) {
    const color = this.colors[index];
    const wasActive = color === this.color;
    // Remove the color
    this.colors.splice(index, 1);
    // Destroy the color object -- this unbinds it from the color picker
    color.unbind();
    // Reindex colors
    this.colors.forEach((color, index) => (color.index = index));
    // Update picker state if necessary
    if (this.state) {
      this.setState({ colors: this.colors });
    }
    // If the active color was removed, set active to the same index (clamped), or 0 if list is empty
    if (wasActive) {
      if (this.colors.length > 0) {
        this.setActiveColor(Math.min(index, this.colors.length - 1));
      }
      // Handle empty state if needed
    }
    // Fire color remove event
    this.emit("color:remove", color);
  }

  /**
   * @desc Set the currently active color
   * @param index color index
   */
  public setActiveColor(index: number) {
    this.color = this.colors[index];
    if (this.state) {
      this.setState({ color: this.color });
    }
    // Fire color switch event
    this.emit("color:setActive", this.color);
  }

  /**
   * @desc Replace all of the current colorPicker colors
   * @param newColorValues list of new colors to add
   */
  public setColors(newColorValues: IroColorValue[], activeColorIndex = 0) {
    // Unbind color events
    this.colors.forEach((color) => color.unbind());
    // Destroy old colors
    this.colors = [];
    // Add new colors
    newColorValues.forEach((colorValue) => this.addColor(colorValue));
    // Reset active color
    this.setActiveColor(activeColorIndex);
    this.emit("color:setAll", this.colors);
  }

  // Public ColorPicker events API

  /**
   * @desc Set a callback function for an event
   * @param eventList event(s) to listen to
   * @param callback - Function called when the event is fired
   */
  public on(eventList: string[] | string, callback: Function) {
    const events = this.events;
    // eventList can be an eventType string or an array of eventType strings
    (!Array.isArray(eventList) ? [eventList] : eventList).forEach(
      (eventType) => {
        // Add event callback
        (events[eventType] || (events[eventType] = [])).push(callback);
        // Call deferred events
        // These are events that can be stored until a listener for them is added
        if (this.deferredEvents[eventType]) {
          // Deffered events store an array of arguments from when the event was called
          this.deferredEvents[eventType].forEach((args) => {
            callback.apply(null, args);
          });
          // Clear deferred events
          this.deferredEvents[eventType] = [];
        }
      }
    );
  }

  /**
   * @desc Remove a callback function for an event added with on()
   * @param eventList - event(s) to listen to
   * @param callback - original callback function to remove
   */
  public off(eventList: string[] | string, callback: Function) {
    (!Array.isArray(eventList) ? [eventList] : eventList).forEach(
      (eventType) => {
        const callbackList = this.events[eventType];
        // this.emitHook('event:off', eventType, callback);
        if (callbackList)
          callbackList.splice(callbackList.indexOf(callback), 1);
      }
    );
  }

  /**
   * @desc Emit an event
   * @param eventType event to emit
   */
  public emit(eventType: string, ...args: any) {
    const activeEvents = this.activeEvents;
    const isEventActive = activeEvents.hasOwnProperty(eventType)
      ? activeEvents[eventType]
      : false;
    // Prevent event callbacks from firing if the event is already active
    // This stops infinite loops if something in an event callback causes the same event to be fired again
    // (e.g. setting the color inside a color:change callback)
    if (!isEventActive) {
      activeEvents[eventType] = true;
      const callbackList = this.events[eventType] || [];
      callbackList.forEach((fn) => fn.apply(this, args));
      activeEvents[eventType] = false;
    }
  }

  /**
   * @desc Emit an event now, or save it for when the relevent event listener is added
   * @param eventType - The name of the event to emit
   */
  public deferredEmit(eventType: string, ...args: any) {
    const deferredEvents = this.deferredEvents;
    this.emit(eventType, ...args);
    (deferredEvents[eventType] || (deferredEvents[eventType] = [])).push(args);
  }

  // Public utility methods

  public setOptions(newOptions: Partial<ColorPickerProps>) {
    // Step 1: Filter out internal state fields that shouldn't be set from outsidea
    const { color, colors, ...safeOptions } = newOptions as any;

    // Step 1a: Check if wheelAngle or wheelDirection are being changed
    const preserveVisualHue =
      safeOptions.preserveVisualHueOnWheelChange ??
      this.props.preserveVisualHueOnWheelChange ??
      true;
    if (
      preserveVisualHue &&
      (safeOptions.wheelAngle !== undefined ||
        safeOptions.wheelDirection !== undefined)
    ) {
      const oldWheelAngle =
        this.state.wheelAngle ?? iroColorPickerOptionDefaults.wheelAngle;
      const oldWheelDirection =
        this.state.wheelDirection ??
        iroColorPickerOptionDefaults.wheelDirection;
      const newWheelAngle = safeOptions.wheelAngle ?? oldWheelAngle;
      const newWheelDirection = safeOptions.wheelDirection ?? oldWheelDirection;

      // Only transform if values actually changed
      if (
        oldWheelAngle !== newWheelAngle ||
        oldWheelDirection !== newWheelDirection
      ) {
        this.transformColorsForWheelChange(
          oldWheelAngle,
          oldWheelDirection,
          newWheelAngle,
          newWheelDirection
        );
      }
    }

    // Step 2: Check if gamut is being changed
    const gamutChanging =
      safeOptions.gamut !== undefined &&
      safeOptions.gamut !== this.getCurrentGamut();

    // Step 3: Separate gamut from rest of options
    const { gamut, ...rest } = safeOptions;

    // Step 4: Early return if only unchanged gamut is provided
    if (
      gamut !== undefined &&
      !gamutChanging &&
      Object.keys(rest).length === 0
    ) {
      return;
    }

    if (gamutChanging) {
      // Step 5: Call setGamut with rest to batch updates and emit gamut:change once
      this.setGamut(gamut as GamutType, rest);
    } else {
      // Step 6: Apply only non-gamut options to avoid passing unchanged gamut key
      // Include transformed colors in state update if wheel parameters changed
      const stateUpdate =
        safeOptions.wheelAngle !== undefined ||
        safeOptions.wheelDirection !== undefined
          ? { ...rest, colors: this.colors }
          : rest;
      this.setState(stateUpdate);
    }
  }

  /**
   * @desc Resize the color picker
   * @param width - new width
   */
  public resize(width: number) {
    this.setOptions({ width });
  }

  /**
   * @desc Reset the color picker to the initial color provided in the color picker options
   */
  public reset() {
    this.colors.forEach((color) => color.reset());
    this.setState({ colors: this.colors });
  }

  /**
   * @desc Transform colors when wheelAngle or wheelDirection changes
   * Transforms colors to preserve their visual position when wheel parameters change.
   * @param oldWheelAngle - the current wheelAngle value
   * @param oldWheelDirection - the current wheelDirection value
   * @param newWheelAngle - the new wheelAngle value
   * @param newWheelDirection - the new wheelDirection value
   * @emits wheel:transform - Fired once after all colors have been transformed
   */
  private transformColorsForWheelChange(
    oldWheelAngle: number,
    oldWheelDirection: string,
    newWheelAngle: number,
    newWheelDirection: string
  ) {
    const oldProps = {
      wheelAngle: oldWheelAngle,
      wheelDirection: oldWheelDirection as "clockwise" | "anticlockwise",
    };
    const newProps = {
      wheelAngle: newWheelAngle,
      wheelDirection: newWheelDirection as "clockwise" | "anticlockwise",
    };

    try {
      // Suppress color:change events during transformation to avoid event storm
      this.suppressColorEvents = true;

      this.colors.forEach((color) => {
        // Step 1: Calculate visual angle with old parameters (HSV Hue → Visual Angle)
        const visualAngle = translateWheelAngle(oldProps, color.hsv.h, true);

        // Step 2: Calculate new hue at that visual position with new parameters (Visual Angle → HSV Hue)
        const newHue = Math.round(
          translateWheelAngle(newProps, visualAngle, false)
        );

        // Step 3: Update the color with new hue, keeping saturation and value unchanged
        color.hsv = { h: newHue, s: color.hsv.s, v: color.hsv.v };
      });
    } finally {
      // Always restore event handling
      this.suppressColorEvents = false;
    }

    // Update state with transformed colors
    this.setState({ colors: this.colors });

    // Emit single aggregated event after all transformations
    this.emit("wheel:transform", {
      oldWheelAngle,
      oldWheelDirection,
      newWheelAngle,
      newWheelDirection,
    });
  }

  /**
   * @desc Set the gamut for all colors in the color picker
   * @param newGamut - the new gamut type to apply
   * @param extraState - optional additional state to update in the same batch
   * @emits gamut:change - Fired once after all colors have been updated with the new gamut
   */
  public setGamut(newGamut: GamutType, extraState?: Partial<ColorPickerState>) {
    // Update all colors with new gamut in silent mode to avoid multiple onChange callbacks
    this.colors.forEach((color) => {
      color.setGamutType(newGamut, { silent: true });
    });

    // Comment 1 & 3: Update state in single batch with gamut and any extra options
    this.setState({ gamut: newGamut, colors: this.colors, ...extraState });

    // Emit aggregated gamut:change event once after all colors updated
    this.emit("gamut:change", newGamut);
  }

  /**
   * @desc Called by the createWidget wrapper when the element is mounted into the page
   * @param container - the container element for this ColorPicker instance
   */
  public onMount(container: HTMLElement) {
    this.el = container;
    this.deferredEmit("mount", this);
  }

  // Internal methods

  /**
   * @desc React to a color update
   * @param color - current color
   * @param changes - shows which h,s,v,a color channels changed
   */
  private onColorChange(color: IroColor, changes: any) {
    // Early return if color events are suppressed (e.g., during wheel transformation)
    if (this.suppressColorEvents) {
      // Still update state.color if this is the active color
      if (color === this.color) {
        this.setState({ color: this.color });
      }
      return;
    }

    // Only update state if this is the active color
    if (color === this.color) {
      this.setState({ color: this.color });
    }
    if (this.inputActive) {
      this.inputActive = false;
      this.emit("input:change", color, changes);
    }
    this.emit("color:change", color, changes);
  }

  /**
   * @desc Handle input from a UI control element
   * @param type - event type
   */
  private emitInputEvent(type: IroInputType, originId: string) {
    if (type === IroInputType.Start) {
      this.emit("input:start", this.color, originId);
    } else if (type === IroInputType.Move) {
      this.emit("input:move", this.color, originId);
    } else if (type === IroInputType.End) {
      this.emit("input:end", this.color, originId);
    }
  }

  // Note: render signature uses 'any' to match Preact's Component base class
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public render(props?: any, state?: any) {
    const actualState = state || (this.state as ColorPickerState);
    let layout = actualState.layout;

    // use layout shorthands
    if (!Array.isArray(layout)) {
      switch (layout) {
        // TODO: implement some?
        default:
          layout = [{ component: IroWheel }, { component: IroSlider }];
      }
      // add transparency slider to the layout
      if (actualState.transparency) {
        layout.push({
          component: IroSlider,
          options: {
            sliderType: "alpha",
          },
        });
      }
    }

    return (
      <div
        class="iro__colorPicker"
        id={actualState.id}
        style={{
          display: actualState.display,
        }}
      >
        {layout.map(
          (
            {
              component: UiComponent,
              options: options,
            }: ColorPickerLayoutDefinition,
            componentIndex: number
          ) => (
            <UiComponent
              {...actualState}
              {...options}
              ref={undefined}
              onInput={this.emitInputEvent.bind(this)}
              parent={this}
              index={componentIndex}
            />
          )
        )}
      </div>
    );
  }
}

export const IroColorPickerWidget = createWidget<
  IroColorPicker,
  ColorPickerProps
>(IroColorPicker);
