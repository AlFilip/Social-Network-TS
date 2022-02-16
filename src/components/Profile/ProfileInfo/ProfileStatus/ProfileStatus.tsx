import {ChangeEventHandler, KeyboardEventHandler, memo, MouseEventHandler, useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {AppStateType} from "../../../../redux/redux-store"

import s from './ProfileStatus.module.css'
import {setStatus, setStatusToState} from "../../../../redux/profileReducer"
import {selectAuthorisedUserId, selectCurrentProfileUserId, selectStatus} from '../../../../redux/selectors'


export const ProfileStatus = memo(() => {
    const status = useSelector<AppStateType, string>(selectStatus)
    const authUserId = useSelector<AppStateType, number | null>(selectAuthorisedUserId)
    const profileUserId = useSelector<AppStateType, number | undefined>(selectCurrentProfileUserId)
    const [editMode, setEditMode] = useState(false)
    const [spanValue, setSpanValue] = useState(status)
    const dispatch = useDispatch()

    useEffect(() => {
        if (status !== spanValue) {
            setSpanValue(status)
        }
    }, [status])

    useEffect(() => {
        return () => {
            dispatch(setStatusToState(''))
        }
    }, [dispatch])

    const discardChanges = () => {
        setEditMode(false)
        setSpanValue(status)
    }
    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = e => setSpanValue(e.currentTarget.value)

    const onKeyDownHandler: KeyboardEventHandler<HTMLInputElement> = e => {
        switch (e.key) {
            case 'Enter':
                spanValue !== status
                && dispatch(setStatus(spanValue))

                setEditMode(false)
                break
            case 'Escape':
                discardChanges()
                break
        }
    }

    const onDoubleClickHandler: MouseEventHandler<HTMLDivElement> = () => setEditMode(!editMode)

    const isStatusOwner = authUserId === profileUserId

    const getStatusMessage = () => {
        if (status) return status
        if (isStatusOwner) return 'Click here to change your status'
        return ''
    }

    return (
        <div onDoubleClick={onDoubleClickHandler}>

            {
                (editMode && isStatusOwner)

                    ? <input
                        value={spanValue}
                        onChange={onChangeHandler}
                        onKeyDown={onKeyDownHandler}
                        onBlur={discardChanges}
                        autoFocus
                    />

                    : <span className={s.status}>
                        {getStatusMessage()}
                    </span>
            }
        </div>
    )
})
