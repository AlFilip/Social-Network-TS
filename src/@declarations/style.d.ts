import {Border, Color, Size, Space} from '../styles/labels';
import {Font, FontSize, FontWeight, LineHeight} from "../styles/labels/typography";
import {BorderRadius} from "../styles/labels/size";
import {Transition} from "../styles/labels/transition";

declare module 'styled-components' {
    export interface DefaultTheme {
        space: Record<Space, string>;
        fontSize: Record<FontSize, string>;
        lineHeight: Record<LineHeight, number>;
        fontWeight: Record<FontWeight, number>;
        color: Record<Color, string>;
        size: Record<Size, string | number>;
        radius: Record<BorderRadius, string | number>;
        border: Record<Border, string>;
        font: Record<Font, string>
        transition: Record<Transition, any>
    }
}
