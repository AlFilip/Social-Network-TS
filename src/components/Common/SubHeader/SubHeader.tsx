import {DetailedHTMLProps, HTMLAttributes, memo} from "react";

import s from "./SubHeader.module.scss";


type DefaultHeaderPropsType = DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>

type SubHeaderPropsType = DefaultHeaderPropsType & {
    title: JSX.Element | string
}

export const SubHeader = memo(({
                                   title,
                                   ...restProps
                               }: SubHeaderPropsType) => {

    return (
        <h3 {...restProps}
            className={`${s.header} ${restProps?.className}`}
        >
            {
                title
            }
        </h3>
    )
})