import {Border} from '../../labels';
import {borderValues, colorValues, sizeValues} from '../../values';

const borders: Record<Border, string> = {
    [Border.BASE]: borderValues.BASE(sizeValues, colorValues),
};

export {borders};
