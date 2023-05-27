import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import '../css/forms.css';
import useApi from '../hooks/useApi';

/* Renders contact form and handles form submissions */

const Contact = () => {
    const { addData, error } = useApi()
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (formData) => {
        try {
            const response = await addData('/contact', formData)
            if (response.code) {
                console.log(response.code)
            };
            navigate('/')
            window.flash('Your message has been submitted.', 'success');
        } catch (error) {
            console.log(error);
        };
    };

    return (
        <div className='form-container'>

            <div className='form-header'>
                <h1>Contact Stellar Travel</h1>
                <p>Looking for a getaway?  Need to disconnect? How can we can help. </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>

                <input
                    id="name"
                    type="text"
                    placeholder="Name (Required)"
                    name="name"
                    {...register("name", { required: true, minLength: 1, maxLength: 20 })} />
                {errors.name && <p className='input-server-errors'>Name is required.</p>}

                <input
                    id="email"
                    type="email"
                    placeholder="Email (Required)"
                    name="email"
                    {...register("email", { required: true, minLength: 9, maxLength: 30 })} />
                {!errors.name && errors.email && <p className='input-server-errors'>Email must be 8 or more characters.</p>}

                <input
                    id="phone"
                    type="phone"
                    placeholder="Phone (Required)"
                    name="phone"
                    {...register("phone", { required: true, maxLength: 15 })} />
                {!errors.email && errors.phone && <p className='input-server-errors'>Phone number is required</p>}

                <input
                    id="message"
                    type="message"
                    placeholder="How may we help you? (Required)"
                    name="message"
                    {...register("message", { required: true, minLength: 20, maxLength: 500 })} />
                {!errors.email && errors.message && <p className='input-server-errors'>Message must be 20 or more characters.</p>}

                <input placeholder="Login" className="submit" type="submit" />

            </form>
        </div>
    );
};

export default Contact;