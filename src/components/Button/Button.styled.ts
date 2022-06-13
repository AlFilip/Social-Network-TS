import styled from "styled-components";
import {ButtonProps} from "./types";

const StyledButton = styled.button<ButtonProps>`
  width: ${({theme, fit}) => {
    const {BASE_WIDTH, FIT_CONTENT} = theme.size
    if (fit) return FIT_CONTENT
    return BASE_WIDTH
  }};

  padding: ${({theme, size}) => {
    const {SPACE_BASE, SPACE_LARGE, SPACE_TINY, SPACE_SMALL} = theme.space
    if (size === 'large') return `${SPACE_SMALL} ${SPACE_LARGE}`
    if (size === 'base') return `${SPACE_TINY} ${SPACE_BASE}`
    if (size === 'small') return `${SPACE_TINY} ${SPACE_SMALL}`
    return `${SPACE_TINY} ${SPACE_BASE}`
  }};

  transition: background-color ${({theme}) => theme.transition.BASE}, color ${({theme}) => theme.transition.BASE};

  background-color: ${({theme, variant}) => {
    const {PRIMARY, SECONDARY, THIRD} = theme.color
    if (variant === 'primary') return PRIMARY
    if (variant === 'secondary') return SECONDARY
    if (variant === 'clear') return THIRD
    return PRIMARY
  }};

  color: ${({theme, variant}) => {
    const {SECONDARY_TEXT_COLOR, PRIMARY, PRIMARY_TEXT_COLOR} = theme.color
    if (variant === 'primary') return SECONDARY_TEXT_COLOR
    if (variant === 'secondary') return PRIMARY_TEXT_COLOR
    if (variant === 'clear') return PRIMARY
    return SECONDARY_TEXT_COLOR
  }};
  border-radius: ${({theme}) => theme.radius.EXTRA_LARGE}px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({theme, variant}) => {
    const {PRIMARY, SECONDARY, THIRD} = theme.color
    if (variant === 'primary') return PRIMARY
    if (variant === 'secondary') return SECONDARY
    if (variant === 'clear') return THIRD
    return PRIMARY
  }};

  &:hover {
    transition: background-color ${({theme}) => theme.transition.FAST}, color ${({theme}) => theme.transition.FAST};
    background-color: ${({theme, variant}) => {
      const {DANGER, SECONDARY, THIRD,} = theme.color
      if (variant === 'primary') return DANGER
      if (variant === 'secondary') return THIRD
      if (variant === 'clear') return SECONDARY
      return DANGER
    }};

    color: ${({theme, variant}) => {
      const {SECONDARY_TEXT_COLOR, PRIMARY, PRIMARY_TEXT_COLOR} = theme.color
      if (variant === 'primary') return SECONDARY_TEXT_COLOR
      if (variant === 'secondary') return PRIMARY_TEXT_COLOR
      if (variant === 'clear') return PRIMARY
      return SECONDARY_TEXT_COLOR
    }};
  }

  &:active {
    background-color: ${({theme, variant}) => {
      const {SECONDARY_DANGER, FOURTH, THIRD,} = theme.color
      if (variant === 'primary') return SECONDARY_DANGER
      if (variant === 'secondary') return FOURTH
      if (variant === 'clear') return THIRD
      return SECONDARY_DANGER
    }};

    color: ${({theme, variant}) => {
      const {SECONDARY_TEXT_COLOR, PRIMARY, PRIMARY_TEXT_COLOR} = theme.color
      if (variant === 'primary') return SECONDARY_TEXT_COLOR
      if (variant === 'secondary') return PRIMARY_TEXT_COLOR
      if (variant === 'clear') return PRIMARY
      return SECONDARY_TEXT_COLOR
    }};

    border-color: ${({theme, variant}) => {
      const {SECONDARY_DANGER, SECONDARY, FOURTH} = theme.color
      if (variant === 'primary') return SECONDARY_DANGER
      if (variant === 'secondary') return FOURTH
      if (variant === 'clear') return SECONDARY
      return SECONDARY_DANGER
    }};
  }
`

export {StyledButton}