import {HTMLAttributes} from "react";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    onClick?: () => void
    size?: 'small' | 'base' | 'large'
    variant?: 'primary' | 'secondary' | 'clear'
    disabled?: boolean
    fit?: boolean
}
