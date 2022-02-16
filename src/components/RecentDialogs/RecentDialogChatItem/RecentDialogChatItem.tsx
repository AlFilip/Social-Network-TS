import s from './RecentDialogChatItem.module.scss'
import defaultUserImg from '../../../assets/images/defaultUserImg.png'
import {DomainDialogType} from "../../../api/dialogsApi";
import {lastSeen} from "../../../helpers/lastSeen";
import {Link} from "react-router-dom";

export const RecentDialogChatItem = (dialog: DomainDialogType) => {

    const userPhoto = dialog.photos.small ? dialog.photos.small : defaultUserImg
    return (
        <div className={s.chatItem}>
            <Link to={`/profile/${dialog.id}`}>
                <span className={s.userPhoto}>
                <img src={userPhoto} alt=""/>
                    {
                        dialog.hasNewMessages
                        && <span className={s.active}/>
                    }
            </span>
            </Link>
            <div className={s.text}>
                <Link to={`/dialogs/${dialog.id}`}>
                    <span className={s.userName}>
                        {
                            dialog.userName
                        }
                    </span>
                </Link>
                <span className={s.lastSeen}>
                    {
                        lastSeen(dialog.lastUserActivityDate)
                    }
                </span>
            </div>
        </div>
    )
}