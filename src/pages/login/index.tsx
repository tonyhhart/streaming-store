import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync, selectAuth } from 'store';

import "./style.css";

export default function Login() {
    const dispatch = useDispatch();
    const { loading, error } = useSelector(selectAuth)

    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    });

    function onSubmit(event: FormEvent) {
        event.preventDefault();

        if (loading) return;

        dispatch(loginAsync(formValues))
    }

    function onChange(event: ChangeEvent<{ id: string; value: string }>) {
        const { id, value } = event.target;
        setFormValues(values => ({
            ...values,
            [id]: value
        }))
    }

    return (
        <div className="form-container text-center" >
            <form className="form-signin" onSubmit={onSubmit} >
                <img className="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
                <h1 className="h3 font-weight-normal" > Please sign in </h1>
                <p className="text-danger">{'\u00A0'}{error}</p>
                <label htmlFor="email" className="sr-only" > Email address </label>
                <input type="email" id="email" name="username" onChange={onChange} className="form-control" placeholder="Email address" required />
                <label htmlFor="password" className="sr-only" > Password </label>
                <input type="password" id="password" name="password" onChange={onChange} className="form-control" placeholder="Password" required />
                <button disabled={loading} className="mt-4 btn btn-lg btn-primary btn-block" type="submit" > Sign in </button>
                <p className="mt-5 mb-3 text-muted" >© 2021 </p>
            </form>
        </div>
    );
}