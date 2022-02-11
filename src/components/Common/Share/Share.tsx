import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShareNodes} from "@fortawesome/free-solid-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

import s from "./Comment.module.scss";

export const Share = () => {

    return (
        <div className={s.share}>
            <span className={s.iconSection}>
                <FontAwesomeIcon icon={faShareNodes as IconProp} className={s.icon}/>
                <span>Share</span>
            </span>
            <span className={s.count}>
                {0}
            </span>
        </div>
    )
}