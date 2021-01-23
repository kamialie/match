import React from 'react';
import {Link} from 'react-router-dom';
import {
    Formik, Field, Form, ErrorMessage
} from 'formik';
import * as Yup from 'yup';

import {accountService} from '../../services/account.service';
import {alertService} from '../../services/alert.service';

function Register({history}) {
    const initialValues = {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required'),
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required')
    });

    function onSubmit(fields, {setSubmitting}) {
        alertService.clear();
        accountService.register(fields)
            .then(() => {
                alertService.success('Registration successful, please check your email for verification instructions', {keepAfterRouteChange: true});
                history.push('login');
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
                    <h3 className='card-header'>Register</h3>
                    <div className='card-body'>
                        <div className='form-row'>
                            <div className='form-group col'>
                                <label htmlFor='username'>Username</label>
                                <Field
                                    name='username'
                                    type='text'
                                    className={`form-control${errors.username && touched.username ? ' is-invalid' : ''}`}
                                />
                                <ErrorMessage name='username' component='div' className='invalid-feedback'/>
                            </div>
                            <div className='form-group col'>
                                <label htmlFor='firstName'>First Name</label>
                                <Field
                                    name='firstName'
                                    type='text'
                                    className={`form-control${errors.firstName && touched.firstName ? ' is-invalid' : ''}`}
                                />
                                <ErrorMessage name='firstName' component='div' className='invalid-feedback'/>
                            </div>
                            <div className='form-group col'>
                                <label htmlFor='lastName'>Last Name</label>
                                <Field
                                    name='lastName'
                                    type='text'
                                    className={`form-control${errors.lastName && touched.lastName ? ' is-invalid' : ''}`}
                                />
                                <ErrorMessage name='lastName' component='div' className='invalid-feedback'/>
                            </div>

                        </div>
                        <div className='form-group'>
                            <label htmlFor='email'>Email</label>
                            <Field
                                name='email'
                                type='text'
                                className={`form-control${errors.email && touched.email ? ' is-invalid' : ''}`}
                            />
                            <ErrorMessage name='email' component='div' className='invalid-feedback'/>
                        </div>
                        <div className='form-row'>
                            <div className='form-group col'>
                                <label htmlFor='password'>Password</label>
                                <Field
                                    name='password'
                                    type='password'
                                    className={`form-control${errors.password && touched.password ? ' is-invalid' : ''}`}
                                />
                                <ErrorMessage name='password' component='div' className='invalid-feedback'/>
                            </div>
                            <div className='form-group col'>
                                <label htmlFor='confirmPassword'>Confirm Password</label>
                                <Field
                                    name='confirmPassword'
                                    type='password'
                                    className={`form-control${errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : ''}`}
                                />
                                <ErrorMessage name='confirmPassword' component='div' className='invalid-feedback'/>
                            </div>
                        </div>
                        <div className='form-group'>
                            <button type='submit' disabled={isSubmitting} className='btn btn-primary'>
                                {isSubmitting && <span className='spinner-border spinner-border-sm mr-1'/>}
                                Register
                            </button>
                            <Link to='login' className='btn btn-link'>Cancel</Link>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export {Register};
