import {DetailedHTMLProps, HTMLAttributes} from "react";

import s from "./SubHeader.module.scss";


type DefaultHeaderPropsType = DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>

type SubHeaderPropsType = DefaultHeaderPropsType & {
    title?: JSX.Element | string
}

export const SubHeader = ({
                              title,
                              children,
                              ...restProps
                          }: SubHeaderPropsType) => {

    return (
        <h3 {...restProps}
            className={`${s.header} ${restProps?.className}`}
        >
            {title}
            {children}
        </h3>
    )
}