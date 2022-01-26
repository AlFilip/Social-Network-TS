import React from "react"
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import s from './Login.module.css'
import { useDispatch } from "react-redux"
import {  makeLogin } from "../../redux/authReducer"
import { useAppSelector } from '../../redux/redux-store'
import { Navigate } from "react-router-dom"
import { selectAuthError, selectCaptcha, selectIsAuth } from '../../redux/selectors'


export type loginValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

export type formikActionsTypes = {
    setSubmitting: (isSubmitting: boolean) => void;
}

const loginSchema = Yup.object().shape( {
    email: Yup.string().email( 'Invalid email' ).required( 'Required' ),
    password: Yup.string()
        .min( 2, 'Too Short!' )
        .max( 50, 'Too Long!' )
        .required( 'Required' ),
} )

const Login = () => {
    const isAuth = useAppSelector( selectIsAuth )
    const captcha = useAppSelector( selectCaptcha )
    const error = useAppSelector(selectAuthError)
    const dispatch = useDispatch()

    const onSubmitHandler = async (values: loginValuesType, actions: FormikHelpers<loginValuesType>) => {
        await dispatch( makeLogin( values ) )
        actions.setSubmitting(false)
        values.captcha = ''
    }
    if (isAuth) return <Navigate to={ '/profile' }/>

    return (
        <div>
            <Formik
                initialValues={ {
                    email: '',
                    password: '',
                    rememberMe: false,
                    captcha: '',
                } }
                validationSchema={ loginSchema }
                onSubmit={ onSubmitHandler }
            >
                {
                    ({ isSubmitting }) =>
                        <Form className={ s.form }>
                            <div>
                                <Field disabled={ isSubmitting } name='email' type='email' placeholder='login'/>
                                <ErrorMessage name="email"/>
                            </div>
                            <div>
                                <Field disabled={ isSubmitting } name='password' placeholder='password'
                                       type='password'/>
                                <ErrorMessage name="password"/>
                            </div>
                            <label>
                                Remember me
                                <Field type='checkbox' name='rememberMe'/>
                            </label>
                            {error}
                            {
                                captcha
                                && <label>
                                    <img src={ captcha } alt=""/>
                                    <Field type='text' name='captcha'/>
                                </label>
                            }
                            <button disabled={ isSubmitting } type='submit'>ok</button>
                        </Form>
                }
            </Formik>
        </div>
    )
}

export default Login