import React, {DetailedHTMLProps, HTMLAttributes} from "react";

import s from "./SubHeader.module.scss";


type DefaultHeaderPropsType = DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>

type SubHeaderPropsType = DefaultHeaderPropsType & {
    title: JSX.Element | string
    callback?: () => void
}

export const SubHeader = ({
                              title,
                              callback,
                              ...restProps
                          }: SubHeaderPropsType) => {

    return (
        <h3 {...restProps}
            className={`${s.header} ${restProps?.className}`}
            onClick={callback}
        >
            {
                title
            }
        </h3>
    )
}