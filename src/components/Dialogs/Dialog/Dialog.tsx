import s from "./Dialog.module.css"
import React from "react";
import {SuperLink} from "../../NavBar/SuperLink/SuperLink";
import { DialogType } from "../../../redux/store";

function Dialog(props:DialogType) {
    return (
        <div className={s.dialog}>
            <SuperLink to={`/dialogs/${props.id}`} linkName={props.name}/>
        </div>
    )
}

export default Dialog;