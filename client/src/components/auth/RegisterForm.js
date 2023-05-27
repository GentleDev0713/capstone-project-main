import jwtDecode from 'jwt-decode';
import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import '../../css/forms.css';
import useApi from '../../hooks/useApi';
import useLocalStorage from '../../hooks/useLocalStorage';

/* Form to register a new user */

const RegisterForm = ({ setUser }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { addData, error } = useApi();
    const [, updateToken] = useLocalStorage();
    const navigate = useNavigate();

    const onSubmit = async (formData) => {
        try {
            const response = await addData('/auth/register', formData);
            if (response?.token) {
                updateToken(response?.token);
                const payload = jwtDecode(response?.token);
                setUser(payload)
                navigate('/');
                window.flash(`Welcome to Stellar Travel Agency, ${formData.firstName}!`, 'success');
            };
        } catch (error) {
            console.log(error);
        };
    };

    return (
        <div className='form-container'>

            <div className='form-header'>
                <h1>Create a New Account</h1>
                <p>Complete and submit the form to create an account.</p>
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

                <input
                    id="firstName"
                    type="text"
                    placeholder="First Name (Required)"
                    name="firstName"
                    {...register("firstName", { required: true, minLenght: 1, maxLength: 20 })} />

                {!errors.password && errors.firstName && <p className='input-server-errors'>First name must be 1-20 characters.</p>}


                <input
                    id="lastName"
                    type="text"
                    placeholder="Last Name (Required)"
                    name="lastName"
                    {...register("lastName", { required: true, minLenght: 1, maxLength: 20 })} />
                {!errors.firstName && errors.lastName && <p className='input-server-errors'>Last name must be 1-20 characters.</p>}

                <input
                    id="age"
                    type="number"
                    placeholder="Age (Required)"
                    name="age"
                    {...register("age", { valueAsNumber: true, required: true, min: 18, max: 80 })} />
                {!errors.lastName && errors.age && <p className='input-server-errors'>User must be 18-80 years old.</p>}

                <input
                    id="email"
                    type="text"
                    placeholder="Email (Required)"
                    name="email"
                    {...register("email", { required: true, minLength: 9, maxLength: 40, pattern: /^\S+@\S+$/i })} />
                {!errors.age && errors.email && <p className='input-server-errors'>Email must be 19-40 characters.</p>}

                <input
                    id="phone"
                    type="text"
                    placeholder="Phone Number (Required)"
                    name="phone"
                    {...register("phone", { required: true, minLength: 8, maxLength: 20 })} />
                {!errors.email && errors.phone && <p className='input-server-errors'>Phone number must be between 8-20 characters.</p>}

                <input
                    id="imgUrl"
                    type="text"
                    placeholder="Profile Image URL (Optional)"
                    name="imgUrl"
                    {...register("imgUrl", { required: false, maxLength: 300 })} />
                {!errors.phone && errors.imgUrl && <p className='input-server-errors'>URL must be 300 characters or fewer.</p>}

                <input className="submit" type="submit" />

                <p className='input-server-errors'>{error}</p>

            </form>
        </div>
    );
};

export default RegisterForm;