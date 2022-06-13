import {Space} from '../../labels';
import {spaceValues} from '../../values';

const space: Record<Space, string> = {
    [Space.SPACE_ZERO]: spaceValues.PX_0,
    [Space.SPACE_EXTRA_TINY]: spaceValues.PX_2,
    [Space.SPACE_TINY]: spaceValues.PX_4,
    [Space.SPACE_SMALL]: spaceValues.PX_8,
    [Space.SPACE_MEDIUM]: spaceValues.PX_14,
    [Space.SPACE_BASE]: spaceValues.PX_16,
    [Space.SPACE_LARGE]: spaceValues.PX_24,
    [Space.SPACE_BIG]: spaceValues.PX_32,
    [Space.SPACE_EXTRA_BIG]: spaceValues.PX_48,
};

export {space};
