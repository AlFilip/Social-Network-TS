import {memo, useEffect} from "react";

import s from './RecentDialogs.module.scss'
import {SubHeader} from "../Common/SubHeader/SubHeader";
import {useAppSelector} from "../../redux/redux-store";
import {selectDialogs} from "../../redux/selectors";
import {useDispatch} from "react-redux";
import {getDialogs} from "../../redux/diaogsReducer";
import {RecentDialogChatItem} from "./RecentDialogChatItem/RecentDialogChatItem";

export const RecentDialogs = memo(() => {
    const dialogsList = useAppSelector(selectDialogs)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!dialogsList.length) {
            dispatch(getDialogs())
        }
    }, [])

    return (
        <div className={s.recentDialogs}>
            <SubHeader title='Recent dialogs' className={s.header}/>
            <div className={s.dialogsList}>
                {
                    dialogsList.map(dialog => (
                        <RecentDialogChatItem key={dialog.id} {...dialog} />
                    ))
                }
            </div>
        </div>
    )
})
