import { useStateMachine } from "little-state-machine";
import React from "react";
import { useForm } from "react-hook-form";
import '../../../css/missionFormSteps.css';
import useApi from "../../../hooks/useApi";
import updateAction from "./UpdateAction";
import WithRouter from "./WithRouter";

/* Step 3 - The user chooses the spacecraft for their voyage. */

const Step3 = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { state, actions } = useStateMachine({ updateAction });
    const { data } = useApi("/spacecraft")

    const onSubmit = (data) => {
        actions.updateAction(data);
        props.history("../step4");
    };

    /* Navigate to previos step in funnel form */
    function goBack() {
        props.history("../step2")
    };

    return (
        <div className="mission-form-container">

            <div>
                <h1>Step 3 - Choose Your Spacecraft</h1>
                <p>Select the spacecraft for your voyage and then click Next to proceed to the next step.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="sticky-buttons-back-next">
                    <button onClick={goBack}>Back</button>
                    {errors.spaceCraft && <p className="input-error-msg">Please select a spacecraft.</p>}
                    <input type="submit" value="Next" />
                </div>


                <div>
                    {data?.spacecraft?.map(sc => (
                        sc?.craftImg ?
                            <div key={sc.id}>

                                <img src={sc.craftImg} alt={`Photo of  ${sc.craftName} spacecraft.`} />
                                <h3>{sc.craftName}</h3>

                                <label>
                                    <input
                                        type="radio"
                                        value={JSON.stringify({
                                            id: `${sc.id}`,
                                            name: `${sc.craftName}`,
                                            imgUrl: `${sc.craftImg}`
                                        })
                                        }
                                        {...register("spaceCraft", { required: true })}
                                    />
                                    Select
                                </label>

                            </div>
                            : null
                    )
                    )}
                </div>

            </form>

        </div>
    );
};

export default WithRouter(Step3);