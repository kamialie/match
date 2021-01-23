import React from 'react';
import {Link} from 'react-router-dom';
import {
    Formik, Field, Form, ErrorMessage
} from 'formik';
import * as Yup from 'yup';

import {accountService} from '../../services/account.service';
import {alertService} from '../../services/alert.service';

function Login({history, location}) {
    const initialValues = {
        username: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });

    function onSubmit({username, password}, {setSubmitting}) {
        alertService.clear();
        accountService.login(username, password)
            .then(() => {
                const {from} = location.state || {from: {pathname: '/'}};
                history.push(from);
            })
            .catch((error) => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({errors, touched, isSubmitting}) => (
                <Form>
                    <h3 className='card-header'>Login</h3>
                    <div className='card-body'>
                        <div className='form-group'>
                            <label>Username</label>
                            <Field name='username' type='text' className={`form-control${errors.username && touched.username ? ' is-invalid' : ''}`} />
                            <ErrorMessage name='username' component='div' className='invalid-feedback' />
                        </div>
                        <div className='form-group'>
                            <label>Password</label>
                            <Field name='password' type='password' className={`form-control${errors.password && touched.password ? ' is-invalid' : ''}`} />
                            <ErrorMessage name='password' component='div' className='invalid-feedback' />
                        </div>
                        <div className='form-row'>
                            <div className='form-group col'>
                                <button type='submit' disabled={isSubmitting} className='btn btn-primary'>
                                    {isSubmitting && <span className='spinner-border spinner-border-sm mr-1' />}
                                    Login
                                </button>
                                <Link to='register' className='btn btn-link'>Register</Link>
                            </div>
                            <div className='form-group col text-right'>
                                <Link to='forgot-password' className='btn btn-link pr-0'>Forgot Password?</Link>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export {Login};
