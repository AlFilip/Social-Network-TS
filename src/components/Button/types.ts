import {HTMLAttributes} from "react";

export enum ButtonSize {
    SMALL= 'small',
    BASE= 'base',
    LARGE = 'large'
}

export enum ButtonVariant {
    PRIMARY= 'primary',
    SECONDARY= 'secondary',
    CLEAR = 'clear'
}

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    onClick?: () => void
    size?: ButtonSize
    variant?: ButtonVariant
    disabled?: boolean
    fit?: boolean
}
