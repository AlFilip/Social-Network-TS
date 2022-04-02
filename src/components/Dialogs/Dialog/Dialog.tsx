import s from "./Dialog.module.css"
import React, {memo} from "react";
import {SuperLink} from "../../NavBar/SuperLink/SuperLink";
import {DomainDialogType} from "../../../api/dialogsApi";

type DialogPropsType = {
    dialog: DomainDialogType
    isActive: boolean
}

const Dialog = memo(({
                         dialog,
                         isActive,
                     }: DialogPropsType) => {
    return (
        <div className={s.dialog}
        >
            <SuperLink to={`/dialogs/${dialog.id}`} linkName={dialog.userName} isActive={isActive}/>
        </div>
    )
})

export default Dialog