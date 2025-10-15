import { h } from "preact";
import { IroColor } from "@irojs/iro-core";
import { IroComponentProps } from "./ComponentTypes";
export interface IroGamutWheelProps extends IroComponentProps {
    colors: IroColor[];
}
export declare function IroGamutWheel(props: IroGamutWheelProps): h.JSX.Element;
