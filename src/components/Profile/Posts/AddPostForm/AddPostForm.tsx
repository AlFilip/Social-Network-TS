import React from "react";
import {useDispatch} from "react-redux";
import {addPost} from "../../../../redux/profileReducer";
import {Field, Form, Formik} from "formik";
import s from './AddPostForm.module.scss'
import {SubHeader} from "../../../Common/SubHeader/SubHeader";

export const AddPostForm = () => {

    const dispatch = useDispatch()

    return (
        <div className={s.addPostForm}>

            <SubHeader title={'Create new post'} style={{marginBottom: 25}}/>

            <Formik initialValues={{message: ''}}
                    onSubmit={(values, {setSubmitting, setValues, resetForm}) => {
                        dispatch(addPost(values.message))
                        setSubmitting(false)
                        resetForm()
                    }}
            >

                {({values, isSubmitting}) => (
                    <Form action=""
                          className={s.form}
                    >
                        <Field className={s.textarea} name='message' as='textarea' placeholder='Write something here'/>

                        <button type='submit' disabled={isSubmitting}>Post</button>

                    </Form>)}
            </Formik>
        </div>
    )
}
