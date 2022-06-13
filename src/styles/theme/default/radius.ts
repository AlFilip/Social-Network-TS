import {BorderRadius} from '../../labels/size';
import {sizeValues} from '../../values';

const radius: Record<BorderRadius, string | number> = {
    [BorderRadius.EXTRA_SMALL]: sizeValues.PX_2,
    [BorderRadius.SMALL]: sizeValues.PX_3,
    [BorderRadius.MEDIUM]: sizeValues.PX_4,
    [BorderRadius.LARGE]: sizeValues.PX_5,
    [BorderRadius.EXTRA_LARGE]: sizeValues.PX_6,
};

export {radius};
