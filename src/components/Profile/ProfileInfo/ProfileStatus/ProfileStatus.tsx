import React, { ChangeEventHandler, KeyboardEventHandler, MouseEventHandler, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from "../../../../redux/redux-store"
import { setStatus, setStatusToState } from "../../../../redux/profileReducer"
import { selectCurrentProfileUserId, selectIsUserId, selectStatus } from '../../../../redux/selectors'


export const ProfileStatus = () => {
    const status = useSelector<AppStateType, string>( selectStatus)
    const authUserId = useSelector<AppStateType, number | null>( selectIsUserId )
    const profileUserId = useSelector<AppStateType, number | undefined>( selectCurrentProfileUserId )
    const [editMode, setEditMode] = useState( false )
    const [spanValue, setSpanValue] = useState( status )
    const dispatch = useDispatch()

    useEffect( () => {
        status !== spanValue
        && setSpanValue( status )
    }, [status] )

    useEffect( () => {
        return () => {
            dispatch( setStatusToState( '' ) )
        }
    }, [] )

    const discardChanges = () => {
        setEditMode( false )
        setSpanValue( status )
    }
    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = e => setSpanValue( e.currentTarget.value )

    const onKeyDownHandler: KeyboardEventHandler<HTMLInputElement> = e => {
        switch (e.key) {
            case 'Enter':
                spanValue !== status
                && dispatch( setStatus( spanValue ) )

                setEditMode( false )
                break
            case 'Escape':
                discardChanges()
                break
            default:
            // console.log(e.key)
        }
    }

    const onDoubleClickHandler: MouseEventHandler<HTMLDivElement> = e => setEditMode( !editMode )

    const isStatusOwner = authUserId === profileUserId

    const getStatusMessage = () => {
        if (status) return status
        if (isStatusOwner) return 'Click here to change your status'
        return ''
    }

    return (
        <div onDoubleClick={ onDoubleClickHandler }>

            {
                ( editMode && isStatusOwner )

                    ? <input
                        value={ spanValue }
                        onChange={ onChangeHandler }
                        onKeyDown={ onKeyDownHandler }
                        onBlur={ discardChanges }
                        autoFocus
                    />

                    : <span>
                        { getStatusMessage() }
                    </span>
            }
        </div>
    )
}
