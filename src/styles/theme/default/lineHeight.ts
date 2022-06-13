import {LineHeight} from '../../labels/typography';
import {typographyValues} from '../../values/TypographyValues';

const lineHeight: Record<LineHeight, number> = {
    [LineHeight.EXTRA_SMALL]: typographyValues.LINE_HEIGHT_16,
    [LineHeight.BASE]: typographyValues.LINE_HEIGHT_20,
    [LineHeight.SMALL]: typographyValues.LINE_HEIGHT_20,
    [LineHeight.LARGE]: typographyValues.LINE_HEIGHT_24,
    [LineHeight.EXTRA_LARGE]: typographyValues.LINE_HEIGHT_32,
};

export {lineHeight};
