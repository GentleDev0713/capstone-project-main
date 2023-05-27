import React from 'react';
import { useForm } from "react-hook-form";

const FormUsers = ({ serverError, isAdmin, onSubmit, userData }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: userData
    });

    return (
        <div className='form-container'>
            <div className='form-header'>
                {!isAdmin ? <h1>Update Your Details </h1>
                    : <h1>Updating {userData.username}'s' Profile </h1>
                }
                <p>Enter new details below.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>

                <input
                    id="password"
                    type="password"
                    placeholder="Password (Required)"
                    name="password"
                    {...register("password", { required: true, minLength: 8, maxLength: 20 })} />
                {errors.password && <p className='input-server-errors'>Password must be 8-20 characters.</p>}

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
                    id="userImg"
                    type="text"
                    placeholder="Profile Image URL (Optional)"
                    name="userImg"
                    {...register("userImg", { required: false, maxLength: 300 })} />
                {!errors.phone && errors.imgUrl && <p className='input-server-errors'>URL must be 300 characters or fewer.</p>}

                {isAdmin && <div className='admin-checkbox'>
                    <input
                        id="isAdmin"
                        type="checkbox"
                        name="isAdmin"
                        {...register("isAdmin", { required: false })} />
                    <label htmlFor='isAdmin'>Admin Status (Check bo if Admin)</label>
                </div>
                }


                <input className="submit" type="submit" />
                <p className='input-server-errors '>{serverError}</p>
            </form>
        </div>
    );
};

export default FormUsers;