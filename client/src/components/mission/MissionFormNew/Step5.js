import { useStateMachine } from "little-state-machine";
import React from "react";
import { useForm } from "react-hook-form";
import '../../../css/missionFormSteps.css';
import useApi from "../../../hooks/useApi";
import updateAction from "./UpdateAction";
import WithRouter from "./WithRouter";


/* Step 5 - The user chooses the mission's captain.*/

const Step5 = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { state, actions } = useStateMachine({ updateAction });
    const { data } = useApi('/astronauts');

    /* Get ID of astronaut selected as the commander in Step4 to ommit that astronaut from the astronauts listed in Step5 when choosing the captain
     */
    const commander = JSON.parse(state.commander)

    const onSubmit = (data) => {
        actions.updateAction(data);
        props.history("../step6");
    };

    /* Navigate to previos step in funnel form */
    function goBack() {
        props.history("../step4")
    };

    return (
        <div className="mission-form-container">

            <div>
                <h1>Select Your Captain</h1>
                <p>Select your captain and then click Next to proceed to the next step.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="sticky-buttons-back-next">
                    <button onClick={goBack}>Back</button>
                    {errors.captain && <p className="input-error-msg">Please select a captain.</p>}
                    <input type="submit" value="Next" />
                </div>

                <div>
                    {data?.astronauts?.map(a => (
                        +commander?.id !== a?.id ?
                            (<div key={a.id}>

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
                                        {...register("captain", { required: true })}
                                    />
                                    Captain
                                </label>
                            </div>)
                            : null
                    )
                    )}
                </div>

            </form>

        </div>
    );
};

export default WithRouter(Step5);