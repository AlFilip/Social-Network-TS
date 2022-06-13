import {Color} from '../../labels';
import {colorValues} from '../../values';

const color: Record<Color, string> = {
    [Color.PRIMARY]: colorValues.PRIMARY_BLUE,
    [Color.SECONDARY]: colorValues.SECONDARY_BLUE,
    [Color.THIRD]: colorValues.WHITE,
    [Color.FOURTH]: colorValues.LIGHT_BLUE,
    [Color.PRIMARY_TEXT_COLOR]: colorValues.PRIMARY_BLUE,
    [Color.SECONDARY_TEXT_COLOR]: colorValues.WHITE,
    [Color.THIRD_TEXT_COLOR]: colorValues.DARK_GREY,
    [Color.DANGER]: colorValues.RED,
    [Color.SECONDARY_DANGER]: colorValues.DARK_RED,
    [Color.DISABLED]: colorValues.LIGHT_GREY,
    [Color.IN_PROGRESS]: colorValues.ORANGE,
    [Color.SUCCESS]: colorValues.GREEN,

};

export {color};
