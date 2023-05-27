import { useStateMachine } from "little-state-machine";
import React from "react";
import { useForm } from "react-hook-form";
import '../../../css/missionFormSteps.css';
import useApi from "../../../hooks/useApi";
import updateAction from "./UpdateAction";
import WithRouter from "./WithRouter";

/* Step 6 - The user chooses the mission's navigator.*/

const Step6 = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { state, actions } = useStateMachine({ updateAction });
    const { data } = useApi('/astronauts');

    /* Get ID of astronaut selected as the commander in Step4 and astronaut selected as the captain in Stept to ommit those astronauts from the astronauts listed in Step7: choosing the navigator.
 */
    const commander = JSON.parse(state.commander);
    const captain = JSON.parse(state.captain);

    const onSubmit = (data) => {
        actions.updateAction(data);
        props.history("../step7");
    };

    /* Navigate to previos step in funnel form */
    function goBack() {
        props.history("../step5")
    };

    return (
        <div className="mission-form-container">

            <div>
                <h1>Select Your Navigator</h1>
                <p>Select your navigator and then click Next to proceed to the next step.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="sticky-buttons-back-next">
                    <button onClick={goBack}>Back</button>
                    {errors.navigator && <p className="input-error-msg">Please choose a navigator.</p>}
                    <input type="submit" value="Next" />
                </div>

                <div>
                    {data?.astronauts?.map(a => (
                        +commander?.id !== a?.id && +captain?.id !== a?.id ?
                            (<div key={a.id}>

                                <img src={a.profileImg} style={{ style: "200px" }} alt={`Photo of astronaut ${a.name}.`} />

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
                                        {...register("navigator", { required: true })}
                                    />
                                    Navigator
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

export default WithRouter(Step6);