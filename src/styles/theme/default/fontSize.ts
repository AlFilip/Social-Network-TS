import {FontSize} from '../../labels/typography';
import {typographyValues} from '../../values/TypographyValues';

const fontSize: Record<FontSize, string> = {
    [FontSize.EXTRA_SMALL]: typographyValues.FONT_SIZE_12,
    [FontSize.SMALL]: typographyValues.FONT_SIZE_14,
    [FontSize.BASE]: typographyValues.FONT_SIZE_16,
    [FontSize.LARGE]: typographyValues.FONT_SIZE_16,
    [FontSize.EXTRA_LARGE]: typographyValues.FONT_SIZE_24,
};

export {fontSize};
