import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import '../../css/forms.css';
import useApi from '../../hooks/useApi';

/* Form for an admin to register a new user. */

const AddUserForm = ({ user }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { addData, error } = useApi();
    const isAdmin = user.isAdmin
    const navigate = useNavigate()

    const onSubmit = (data) => {
        addData('/users/new', data);
        navigate('/users')
    };

    return (
        <div className='form-container'>

            <div className='form-header'>
                <h1>Add a New User</h1>
                <p>Enter the new user's details below.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>

                <input
                    id="username"
                    type="text"
                    placeholder="Username (Required)"
                    name="username"
                    {...register("username", { required: true, minLength: 8, maxLength: 20 })} />
                {errors.username && <p className='input-server-errors'>Username must be 8-20 characters.</p>}

                <input
                    id="password"
                    type="password"
                    placeholder="Password (Required)"
                    name="password"
                    {...register("password", { required: true, minLength: 8, maxLength: 20 })} />
                {!errors.username && errors.password && <p className='input-server-errors'>Password must be 8-20 characters.</p>}

                <input
                    id="firstName"
                    type="text"
                    placeholder="First Name (Required)"
                    name="firstName"
                    {...register("firstName", { required: true, minLenght: 1, maxLength: 20 })} />
                {!errors.password && errors.firstName && <p className='input-server-errors'>First must be 1-20 characters.</p>}

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

                {isAdmin && <div className='admin-checkbox'>
                    <input
                        id="isAdmin"
                        type="checkbox"
                        name="isAdmin"
                        {...register("isAdmin", { required: false })} />
                    <label htmlFor='isAdmin'>Admin Status (Check box if Admin)</label>
                </div>
                }

                <input className="submit" type="submit" />
                <p className='input-server-errors'>{error}</p>
            </form>
        </div>
    );
};

export default AddUserForm;