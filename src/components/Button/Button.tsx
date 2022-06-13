import {FC} from "react";
import {StyledButton} from "./Button.styled";
import {ButtonProps} from "./types";

const Button: FC<ButtonProps> = ({ children, ...restProps}) => {

    return <StyledButton {...restProps}>{children}</StyledButton>
}

export {Button}