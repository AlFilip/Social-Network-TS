import React from "react";
import s from './Preloader.module.css'


export const Preloader = () => {
    return (
        <div className={s.container}>
            <div className={s.ldsRipple}>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}