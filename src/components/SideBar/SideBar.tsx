import s from './SideBar.module.scss'
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getFriends} from "../../redux/friendReducer";
import {useAppSelector} from "../../redux/redux-store";
import {selectFriends} from "../../redux/selectors";
import {ContactItem} from "./ContactItem/ContactItem";
import {SubHeader} from "../Common/SubHeader/SubHeader";

export const SideBar = () => {
    const dispatch = useDispatch()
    const friends = useAppSelector(selectFriends)

    useEffect(() => {
        if (!friends.length) {
            dispatch(getFriends())
        }
    }, [friends])

    return (
        <div className={s.sidebar}>
            <SubHeader title={'Friends'} style={{marginBottom: 20}}/>

            {
                friends.map(item => (
                    <ContactItem
                        key={item.id}
                        {...item}
                    />))
            }
        </div>
    )
}

