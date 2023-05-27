import { useStateMachine } from "little-state-machine";
import React from "react";
import { useForm } from "react-hook-form";
import '../../../css/missionFormSteps.css';
import useApi from "../../../hooks/useApi";
import updateAction from "./UpdateAction";
import WithRouter from "./WithRouter";

/* Step 4 - The user chooses the mission's commander.*/

const Step4 = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { state, actions } = useStateMachine({ updateAction });
    const { data } = useApi('/astronauts');

    const onSubmit = (data) => {
        actions.updateAction(data);
        props.history("../step5");
    };

    /* Navigate to previos step in funnel form */
    function goBack() {
        props.history("../step3")
    };

    return (
        <div className="mission-form-container">

            <div>
                <h1>Select Your Commander</h1>
                <p>Select your commander and then click Next to proceed to the next step.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="sticky-buttons-back-next">
                    <button onClick={goBack}>Back</button>
                    {errors.commander && <p className="input-error-msg">Please select a commander.</p>}
                    <input type="submit" value="Next" />
                </div>

                <div>
                    {data?.astronauts?.map(a => (
                        <div key={a.id}>

                            <img src={a.profileImg} alt={`Photo of astronaut ${a.name}.`} />

                            <h3>
                                {
                                    a.name.length > 17 ?
                                        a.name.substring(0, 17) + '...'
                                        : a.name
                                }
                            </h3>

                            <label>
                                <input
                                    type="radio"
                                    value={JSON.stringify({
                                        id: `${a.id}`,
                                        name: `${a.name}`,
                                        imgUrl: `${a.profileImg}`
                                    })
                                    }
                                    {...register("commander", { required: true })}
                                />
                                Commander
                            </label>
                        </div>)
                    )}
                </div>
            </form>

        </div>
    );
};

export default WithRouter(Step4);