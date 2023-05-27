import { useStateMachine } from "little-state-machine";
import React from "react";
import { useForm } from "react-hook-form";
import '../../../css/missionFormSteps.css';
import useApi from "../../../hooks/useApi";
import updateAction from "./UpdateAction";
import WithRouter from "./WithRouter";

/* Step 2 - The user names choose the planet that will be the mission's destination. */

const Step2 = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { state, actions } = useStateMachine({ updateAction });
    const { data } = useApi('/planets')

    const onSubmit = (data) => {
        actions.updateAction(data);
        props.history("../step3");
    };

    /* Navigate to previos step in funnel form */
    function goBack() {
        props.history("../")
    };

    return (
        <div className="mission-form-container">

            <div>
                <h1>Choose Your Destination</h1>
                <p>Select a planet for your destiation and then click Next to proceed to the next step.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="sticky-buttons-back-next">
                    <button onClick={goBack}>Back</button>
                    {errors.planet && <p className="input-error-msg">Please select a planet.</p>}
                    <input type="submit" value="Next" />
                </div>

                <div>
                    {data?.planets?.map(p => (
                        <div key={p.id} >
                            <img src={p.planetImg} alt={`Photo of planet ${p.planetName}.`} />
                            <h3>{p.planetName}</h3>

                            <label >
                                <input
                                    type="radio"
                                    value={JSON.stringify({
                                        id: `${p.id}`,
                                        name: `${p.planetName}`,
                                        imgUrl: `${p.planetImg}`,
                                        distance: `${p.planetDistance}`
                                    })
                                    }
                                    {...register("planet", { required: true })}
                                />
                                Select
                            </label>

                        </div>
                    )
                    )}
                </div>

            </form>

        </div>
    );
};

export default WithRouter(Step2);