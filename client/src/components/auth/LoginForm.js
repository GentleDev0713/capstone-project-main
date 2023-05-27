import jwtDecode from 'jwt-decode';
import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import '../../css/forms.css';
import useApi from '../../hooks/useApi';
import useLocalStorage from '../../hooks/useLocalStorage';

/* Form to login an existing user */

const LoginForm = ({ setUser }) => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const { addData, data, error } = useApi();
    const [, updateToken] = useLocalStorage();
    const navigate = useNavigate();

    const onSubmit = async (formData) => {
        try {
            const response = await addData('/auth/login', formData);
            if (response?.token) {
                updateToken(response?.token);
                const payload = jwtDecode(response?.token);
                setUser(payload)
                navigate('/');
                window.flash('Welcome back!', 'success');
            };
        } catch (error) {
        };
    };

    return (
        <div className='form-container'>

            <div className='form-header'>
                <h1>Login</h1>
                <p>Enter your username and password.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>

                <input
                    id="username"
                    type="text"
                    placeholder="Username (Required)"
                    name="username"
                    {...register("username", { required: true, minLength: 8, maxLength: 15 })} />
                {errors.username && <p className='input-server-errors'>Username must be 8-20 characters.</p>}

                <input
                    id="password"
                    type="password"
                    placeholder="Password (Required)"
                    name="password"
                    {...register("password", { required: true, minLength: 8, maxLength: 60 })} />
                {!errors.username && errors.password && <p className='input-server-errors'>Password must be 8-20 characters.</p>}

                <input placeholder="Login" className="submit" type="submit" />

                <p className='input-server-errors'>{error}</p>


            </form>
        </div>
    );
};

export default LoginForm;