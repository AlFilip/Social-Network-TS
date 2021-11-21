import React from "react"
import { Field, Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import s from './Login.module.css'
import { useDispatch, useSelector } from "react-redux"
import { makeLogin } from "../../redux/authReducer"
import { AppStateType } from '../../redux/redux-store'
import { Redirect } from "react-router-dom"


export type loginValuesType = {
    email: string
    password: string
    rememberMe: boolean
}

const loginSchema = Yup.object().shape( {
    email: Yup.string()
        .email( 'Invalid email' )
        .required( 'Required' ),
    password: Yup.string()
        .min( 2, 'Too Short!' )
        .max( 50, 'Too Long!' )
        .required( 'Required' ),
} )

export const Login = () => {
    const isAuth = useSelector<AppStateType, boolean>( state => state.auth.isAuth )
    const dispatch = useDispatch()

    const onSubmitHandler = async (values: loginValuesType, { setSubmitting }: FormikHelpers<loginValuesType>) => {
        dispatch( makeLogin( values ) )


        // const pr = await new Promise(res => {
        //     setTimeout(() => res(''), 1000)
        // })
        // console.log(values)
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
                    ({ isSubmitting, errors, touched, values }) =>
                        <Form className={ s.form }>
                            <div>
                                <Field disabled={ isSubmitting } name='email' type='email' placeholder='login'/>

                                { errors.email && touched.email ? (
                                    <span>{ errors.email }</span>
                                ) : null }
                            </div>
                            <div>
                                <Field disabled={ isSubmitting } name='password' placeholder='password'/>
                                { errors.password && touched.password ? (
                                    <span>{ errors.password }</span>
                                ) : null }
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