import React, { useEffect } from 'react'

import s from './UpdateProfile.module.css'
import { useAppSelector } from '../../../../redux/redux-store'
import { selectCurrentProfile } from '../../../../redux/selectors'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { updateProfile } from '../../../../redux/profileReducer'
import { useDispatch } from 'react-redux'


const validateHref = (href: string) => {
    const regexp = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
    return regexp.test( href )
}

type contactsType = {
    facebook: string
    github: string
    instagram: string
    mainLink: string
    twitter: string
    vk: string
    youtube: string
    website: string,
}


type initValuesTypeType = {
    fullName: string
    aboutMe: string
    lookingForAJob: string
    lookingForAJobDescription: string
    contacts: Partial<contactsType>
}

type UpdateProfilePropsType = {
    confirm?: (payload: any) => void;
    cancel: () => void;
};


export const UpdateProfile = ({ cancel, confirm }: UpdateProfilePropsType) => {
    const profile = useAppSelector( selectCurrentProfile )
    const dispatch = useDispatch()
    useEffect( () => {
        const body = document.querySelector( 'body' )
        if (body) body.style.overflow = 'hidden'
        return () => {
            if (body) body.style.overflow = 'auto'
        }
    }, [] )

    return (
        <div className={ s.modal } onClick={ cancel }>
            <div className={ s.updateProfile } onClick={ (e) => e.stopPropagation() }>
                <Formik
                    initialValues={ {
                        fullName: profile?.fullName || '',
                        aboutMe: profile?.aboutMe || '',
                        lookingForAJob: profile?.lookingForAJob || false,
                        lookingForAJobDescription: profile?.lookingForAJobDescription || '',
                        contacts: {
                            facebook: profile?.contacts.facebook || '',
                            github: profile?.contacts.github || '',
                            instagram: profile?.contacts.instagram || '',
                            mainLink: profile?.contacts.mainLink || '',
                            twitter: profile?.contacts.twitter || '',
                            vk: profile?.contacts.vk || '',
                            youtube: profile?.contacts.youtube || '',
                            website: profile?.contacts.website || '',
                        },
                    } }
                    validate={ values => {
                        const errors: Partial<initValuesTypeType> = {}
                        if (!values.lookingForAJobDescription) {
                            errors.lookingForAJobDescription = 'Required'
                        }
                        if (!values.fullName) {
                            errors.fullName = 'Required'
                        }
                        if (!values.aboutMe) {
                            errors.aboutMe = 'Required'
                        }
                        Object.keys( values.contacts ).forEach( f => {
                            const key = f as keyof contactsType
                            if (values.contacts[key] && !validateHref( values.contacts[key] )) {
                                if (!errors.contacts) {
                                    errors.contacts = {}
                                }
                                errors.contacts[key] = 'invalid link'
                            }
                        } )
                        return errors
                    } }
                    onSubmit={ async (values, { setSubmitting }) => {
                        await dispatch( updateProfile( values ) )
                        setSubmitting( false )
                    } }
                >
                    { ({ values, isSubmitting }) => (
                        <Form action="">
                            <fieldset disabled={ isSubmitting }>
                                <legend>Personal information</legend>
                                <span>My name</span>
                                <Field type="text" name='fullName' placeholder='Name'/>
                                <ErrorMessage name="fullName" component="div"/>
                                <span>About me</span>
                                <Field type="text" name='aboutMe' placeholder='about me'/>
                                <ErrorMessage name={ 'aboutMe' } component={ 'div' }/>
                            </fieldset>
                            <fieldset disabled={ isSubmitting }>
                                <legend>Job information</legend>
                                <div><Field type="checkbox" name='lookingForAJob'/>
                                    <span>Looking for a job</span></div>
                                {
                                    values.lookingForAJob
                                    && <>
                                        <span>Job description</span>
                                        <Field type="text" name='lookingForAJobDescription'
                                               placeholder='looking for a job description'/>
                                        <ErrorMessage name={ 'lookingForAJobDescription' } component={ 'div' }/>
                                    </>
                                }
                            </fieldset>
                            <fieldset disabled={ isSubmitting }>
                                <legend>Contacts</legend>
                                {
                                    Object.keys( values.contacts ).map( m => {
                                        return (
                                            <div key={ m }>
                                                <Field type="text" name={ `contacts.${ m }` } placeholder={ m }/>
                                                <ErrorMessage name={ `contacts.${ m }` } component={ 'div' }/>
                                            </div>
                                        )
                                    } )
                                }
                            </fieldset>
                            <button type='submit' disabled={ isSubmitting }>send</button>
                        </Form> ) }
                </Formik>
            </div>
        </div>
    )
}
