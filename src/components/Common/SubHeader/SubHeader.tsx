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
        <h3 className={s.header}
            onClick={callback}
            {...restProps}
        >
            {
                title
            }
        </h3>
    )
}