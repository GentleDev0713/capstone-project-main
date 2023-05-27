import { useStateMachine } from "little-state-machine";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthContext from '../../../context/AuthContext';
import '../../../css/missionFormSteps.css';
import updateAction from "./UpdateAction";
import WithRouter from "./WithRouter";

/* Step 1 - Renders the form for the user to name the mission and chooses the launch date and time.. */

const Step1 = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { actions, state } = useStateMachine({ updateAction });
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    //MAKE REQUEST TO MISSIONS TABLE AND COMPARE MISSION NAME TO MISSION NAMES ON DB.  IF ALREADY TAKEN, RETURN ERROR MESSAGE TO CLIENT TO CHOOSE A DIFFERENT NAME

    /* If no user, redirects client to register page */
    const onSubmit = (data) => {
        if (user?.id) {
            actions.updateAction(data);
            props.history("step2");
        } else {
            navigate("/auth/register");
            window.flash('To book a trip, please login or create an account.', 'success');
        };
    };

    return (
        <div className="step-1">
            <div>
                <h1>Mission Name and Schedule</h1>
                <p>Name your mission and select the launch date and time. Then, click Next to go to the next step.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="missionName">Mission Name</label>
                <input
                    id="missionName"
                    type="text"
                    {...register("missionName", { required: true, minLength: 8, maxLength: 40 })} required
                />

                <label htmlFor="launchDate">Launch Date and Time</label>
                <input
                    id="launchDate"
                    type="datetime-local"
                    {...register("launchDate", { required: true })}
                />
                <input type="submit" value="Next" />
                {errors.missionName && <p className="input-error-msg">Mission name must be 8-40 characters.</p>}
                {!errors.missionName && errors.launchDate && <p className="input-error-msg">Launch date and time are required.</p>}
            </form>
        </div>
    );
};

export default WithRouter(Step1);