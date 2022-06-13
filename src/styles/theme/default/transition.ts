import {Transition} from "../../labels/transition";
import {transitionValues} from "../../values/TransitionValues";

const transition: Record<Transition, string> = {
    [Transition.SLOW]: transitionValues.SLOW,
    [Transition.BASE]: transitionValues.BASE,
    [Transition.FAST]: transitionValues.FAST,
}

export {transition}