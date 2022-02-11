import s from "./Comment.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import React from "react";
import {faComment} from "@fortawesome/free-regular-svg-icons";


export const Comment = () => {

    return (
        <div className={s.comment}>
            <span className={s.iconSection}>
                <FontAwesomeIcon icon={faComment} className={s.icon}/>
                <span>Comment</span>
            </span>
            <span className={s.count}>
                {0}
            </span>
        </div>
    )
}