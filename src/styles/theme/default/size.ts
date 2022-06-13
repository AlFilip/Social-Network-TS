import {sizeValues} from '../../values';
import {Size} from '../../labels';

const size: Record<Size, string | number> = {
    [Size.BASE_WIDTH]: sizeValues.PERCENT_100,
    [Size.BASE_HEIGHT]: sizeValues.PERCENT_100,
    [Size.FIT_CONTENT]: sizeValues.FIT_CONTENT,

    [Size.SMALL_BUTTON_PADDING]: `${sizeValues.PX_12}px ${sizeValues.PX_22}px ${sizeValues.PX_13}px`,
    [Size.LARGE_BUTTON_PADDING]: `${sizeValues.PX_12}px ${sizeValues.PX_22}px ${sizeValues.PX_13}px`,

    [Size.SWITCHER_WIDTH]: sizeValues.PX_436,
    [Size.TABS_BUTTON_SHIFT]: sizeValues.PX_MINUS_10,
    [Size.TABS_ACTIVE_Z_INDEX]: sizeValues.Z_10,
    [Size.TABS_BASE_Z_INDEX]: sizeValues.Z_1,

    [Size.SMALL_IMAGE_HEIGHT]: sizeValues.PX_32,
    [Size.SMALL_IMAGE_WIDTH]: sizeValues.PX_32,

    [Size.TINY]: sizeValues.PX_8,
    [Size.EXTRA_SMALL]: sizeValues.PX_12,
    [Size.SMALL]: sizeValues.PX_14,
    [Size.MEDIUM]: sizeValues.PX_16,
    [Size.BIG]: sizeValues.PX_17,
    [Size.LARGE]: sizeValues.PX_22,
    [Size.EXTRA_LARGE]: sizeValues.PX_32,
    [Size.EXTRA_EXTRA_LARGE]: sizeValues.PX_40,
    [Size.GIANT]: sizeValues.PX_48,
    [Size.EXTRA_GIANT]: sizeValues.PX_56,
    [Size.EXTRA_EXTRA_GIANT]: sizeValues.PX_64,
};

export {size};
