import React from "react"
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import s from './Login.module.css'
import { useDispatch, useSelector } from "react-redux"
import { makeLogin } from "../../redux/authReducer"
import { AppStateType } from '../../redux/redux-store'
import { Redirect } from "react-router-dom"
import { FormikErrors } from 'formik/dist/types'


export type loginValuesType = {
    email: string
    password: string
    rememberMe: boolean
}

export type formikActionsTypes = {
    // setStatus: (status?: any) => void
    setErrors: (errors: FormikErrors<loginValuesType>) => void;
    setSubmitting: (isSubmitting: boolean) => void;
}

const loginSchema = Yup.object().shape( {
    email: Yup.string().email( 'Invalid email' ).required( 'Required' ),
    // Yup.string()
    // .email( 'Invalid email' )
    // .required( 'Required' ),
    password: Yup.string()
        .min( 2, 'Too Short!' )
        .max( 50, 'Too Long!' )
        .required( 'Required' ),
} )

export const Login = () => {
    const isAuth = useSelector<AppStateType, boolean>( state => state.auth.isAuth )
    const dispatch = useDispatch()

    const onSubmitHandler = async (values: loginValuesType, { setStatus, setErrors, setSubmitting }: FormikHelpers<loginValuesType>) => {
        dispatch( makeLogin( values, {  setErrors, setSubmitting } ) )
    }
    if (isAuth) return <Redirect to={ '/profile' }/>

    return (
        <div>
            <Formik
                initialValues={ {
                    email: '',
                    password: '',
                    rememberMe: false,
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
                            <button disabled={ isSubmitting } type='submit'>ok</button>
                        </Form>
                }
            </Formik>
        </div>
    )
}