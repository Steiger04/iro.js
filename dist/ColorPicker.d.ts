import { h, Component } from "preact";
import { IroColor, IroColorValue, IroColorPickerOptions, GamutType } from "@irojs/iro-core";
interface ColorPickerLayoutDefinition {
    component: any;
    options?: any;
}
declare type ColorPickerLayoutShorthand = "default";
export interface ColorPickerProps extends IroColorPickerOptions {
    display?: string;
    id?: string;
    layout?: ColorPickerLayoutDefinition[] | ColorPickerLayoutShorthand;
    colors?: IroColorValue[];
    transparency?: boolean;
    margin?: number;
}
export interface ColorPickerState extends ColorPickerProps {
    layout: ColorPickerLayoutDefinition[] | ColorPickerLayoutShorthand;
    color: IroColor;
    colors: IroColor[];
}
export declare class IroColorPicker extends Component<ColorPickerProps, ColorPickerState> {
    static defaultProps: Partial<ColorPickerProps>;
    el: HTMLElement;
    id: string;
    colors: IroColor[];
    color: IroColor;
    inputActive: boolean;
    private events;
    private activeEvents;
    private deferredEvents;
    constructor(props: ColorPickerProps);
    /**
     * @desc Get the current gamut type from state or props
     * @internal
     */
    getCurrentGamut(): GamutType;
    /**
     * @desc Add a color to the color picker
     * @param color new color to add
     * @param index optional color index
     */
    addColor(color: IroColorValue, index?: number): void;
    /**
     * @desc Remove a color from the color picker
     * @param index color index
     */
    removeColor(index: number): void;
    /**
     * @desc Set the currently active color
     * @param index color index
     */
    setActiveColor(index: number): void;
    /**
     * @desc Replace all of the current colorPicker colors
     * @param newColorValues list of new colors to add
     */
    setColors(newColorValues: IroColorValue[], activeColorIndex?: number): void;
    /**
     * @desc Set a callback function for an event
     * @param eventList event(s) to listen to
     * @param callback - Function called when the event is fired
     */
    on(eventList: string[] | string, callback: Function): void;
    /**
     * @desc Remove a callback function for an event added with on()
     * @param eventList - event(s) to listen to
     * @param callback - original callback function to remove
     */
    off(eventList: string[] | string, callback: Function): void;
    /**
     * @desc Emit an event
     * @param eventType event to emit
     */
    emit(eventType: string, ...args: any): void;
    /**
     * @desc Emit an event now, or save it for when the relevent event listener is added
     * @param eventType - The name of the event to emit
     */
    deferredEmit(eventType: string, ...args: any): void;
    setOptions(newOptions: Partial<ColorPickerProps>): void;
    /**
     * @desc Resize the color picker
     * @param width - new width
     */
    resize(width: number): void;
    /**
     * @desc Reset the color picker to the initial color provided in the color picker options
     */
    reset(): void;
    /**
     * @desc Set the gamut for all colors in the color picker
     * @param newGamut - the new gamut type to apply
     * @param extraState - optional additional state to update in the same batch
     * @emits gamut:change - Fired once after all colors have been updated with the new gamut
     */
    setGamut(newGamut: GamutType, extraState?: Partial<ColorPickerState>): void;
    /**
     * @desc Called by the createWidget wrapper when the element is mounted into the page
     * @param container - the container element for this ColorPicker instance
     */
    onMount(container: HTMLElement): void;
    /**
     * @desc React to a color update
     * @param color - current color
     * @param changes - shows which h,s,v,a color channels changed
     */
    private onColorChange;
    /**
     * @desc Handle input from a UI control element
     * @param type - event type
     */
    private emitInputEvent;
    render(props?: any, state?: any): h.JSX.Element;
}
export declare const IroColorPickerWidget: {
    (parent: string | HTMLElement, props?: Partial<ColorPickerProps>): IroColorPicker;
    prototype: any;
    __component: import("preact").ComponentType<{}>;
};
export {};
