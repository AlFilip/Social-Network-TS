import {DefaultTheme} from 'styled-components';
import {borders} from './borders';
import {color} from './color';
import {size} from './size';
import {radius} from './radius';
import {font} from './font';
import {lineHeight} from './lineHeight';
import {fontSize} from './fontSize';
import {fontWeight} from './fontWeight';
import {space} from './space';
import {transition} from "./transition";

const defaultTheme: DefaultTheme = {
    border: borders,
    color,
    size,
    radius,
    font,
    lineHeight,
    fontSize,
    fontWeight,
    space,
    transition
};

export {defaultTheme};
