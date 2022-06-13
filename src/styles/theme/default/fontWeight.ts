import {FontWeight} from '../../labels/typography';
import {typographyValues} from '../../values/TypographyValues';

const fontWeight: Record<FontWeight, number> = {
    [FontWeight.BASE]: typographyValues.FONT_WEIGHT_400,
    [FontWeight.SEMI_BOLD]: typographyValues.FONT_WEIGHT_600,
    [FontWeight.BOLD]: typographyValues.FONT_WEIGHT_700,
    [FontWeight.EXTRA_BOLD]: typographyValues.FONT_WEIGHT_900,
};

export {fontWeight};
