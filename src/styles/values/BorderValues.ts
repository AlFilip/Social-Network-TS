import {ColorValues} from './ColorValues';
import {SizeValues} from './SizeValues';

class BorderValues {
    public BASE(size: SizeValues, color: ColorValues) {
        return `${size.PX_1}px solid ${color.LIGHT_GREY}`;
    }

    public BOX_SIZING() {
        return 'border-box';
    }
}

const borderValues = new BorderValues();

export {borderValues};
