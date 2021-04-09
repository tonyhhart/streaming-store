import React, { useState, FormEvent, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync, selectAuth } from "store";

export default function Login() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(selectAuth);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  function onSubmit(event: FormEvent) {
    event.preventDefault();

    if (loading) return;

    dispatch(loginAsync(formValues));
  }

  function onChange(event: ChangeEvent<{ id: string; value: string }>) {
    const { id, value } = event.target;
    setFormValues((values) => ({
      ...values,
      [id]: value,
    }));
  }

  return (
    <div className="form-container d-flex flex-fill">
      <form className="form-signin" onSubmit={onSubmit}>
        <div className="text-center">
          <img
            className="mb-4"
            src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg"
            alt=""
            width="72"
            height="72"
          />
          <h1 className="h3 font-weight-normal"> Please sign in </h1>
        </div>
        <p className="text-danger">
          {"\u00A0"}
          {error}
        </p>
        <div className="form-floating">
          <input
            type="email"
            id="email"
            name="username"
            onChange={onChange}
            className="form-control"
            placeholder="Email address"
            required
          />
          <label htmlFor="email">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            id="password"
            name="password"
            onChange={onChange}
            className="form-control"
            placeholder="Password"
            required
          />
          <label htmlFor="password">Password</label>
        </div>
        <button
          disabled={loading}
          className="w-100 btn btn-lg btn-primary"
          type="submit"
        >
          Sign in
        </button>
        <p className="mt-5 mb-3 text-muted text-center">© 2021 </p>
      </form>
    </div>
  );
}
