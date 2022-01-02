import React, { useEffect } from 'react'

import s from './UpdateProfile.module.css'
import { useAppSelector } from '../../../../redux/redux-store'
import { selectCurrentProfile } from '../../../../redux/selectors'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { updateProfile } from '../../../../redux/profileReducer'
import { useDispatch } from 'react-redux'


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
                        facebook: profile?.contacts.facebook || '',
                        github: profile?.contacts.github || '',
                        instagram: profile?.contacts.instagram || '',
                        mainLink: profile?.contacts.mainLink || '',
                        twitter: profile?.contacts.twitter || '',
                        vk: profile?.contacts.vk || '',
                        youtube: profile?.contacts.youtube || '',
                    } }
                    validate={ values => {
                        const errors: { fullName?: string } = {}
                        if (!values.fullName) {
                            errors.fullName = 'Required'
                        }
                        return errors
                    } }
                    onSubmit={ (values, { setSubmitting }) => {
                        const success = dispatch( updateProfile( values ) )
                        setSubmitting( !success )
                    } }
                >
                    { ({ values, isSubmitting }) => (
                        <Form action="">
                            <fieldset disabled={ isSubmitting }>
                                <legend>Personal information</legend>
                                <Field type="text" name='fullName' placeholder='Name'/>
                                <ErrorMessage name="fullName" component="div"/>
                                <Field type="text" name='aboutMe' placeholder='about me'/>
                            </fieldset>
                            <fieldset disabled={ isSubmitting }>
                                <legend>Job information</legend>
                                <Field type="checkbox" name='lookingForAJob'/>
                                {
                                    values.lookingForAJob
                                    && <Field type="text" name='lookingForAJobDescription'
                                              placeholder='looking for a job description'/>
                                }
                            </fieldset>
                            <fieldset disabled={ isSubmitting }>
                                <legend>Contacts</legend>
                                <Contact title={ 'facebook' }/>
                                <Contact title={ 'github' }/>
                                <Contact title={ 'instagram' }/>
                                <Contact title={ 'mainLink' }/>
                                <Contact title={ 'twitter' }/>
                                <Contact title={ 'vk' }/>
                                <Contact title={ 'youtube' }/>
                            </fieldset>
                            <button type='submit' disabled={ isSubmitting }>send</button>
                        </Form> ) }
                </Formik>
            </div>
        </div>
    )
}

const Contact: React.FC<{ title: string }> = ({ title }) => {
    return (
        <Field type="text" name={ title } placeholder={ title }/>
    )
}