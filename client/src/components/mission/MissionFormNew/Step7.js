import { useStateMachine } from "little-state-machine";
import React from "react";
import { useForm } from "react-hook-form";
import '../../../css/missionFormSteps.css';
import useApi from "../../../hooks/useApi";
import updateAction from "./UpdateAction";
import WithRouter from "./WithRouter";

/* Step 7 - The user chooses the launch site.*/

const Step7 = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { state, actions } = useStateMachine({ updateAction });
    const { data } = useApi('/launchsites')

    const onSubmit = (data) => {
        actions.updateAction(data);
        props.history("../summary");
    };

    /* Navigate to previos step in funnel form */
    function goBack() {
        props.history("../step6")
    };

    return (
        <div className="mission-form-container">

            <div>
                <h1>Select Your Launch Site</h1>
                <p>Select your launchsite and then click Next to proceed to the last step.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="sticky-buttons-back-next">
                    <button onClick={goBack}>Back</button>
                    {errors.launchSite && <p className="input-error-msg">Please choose a launch site.</p>}
                    <input type="submit" value="Next" />
                </div>

                <div>
                    {data?.launchSites?.map(ls => (
                        <div key={ls.id}>
                            <img src={ls.siteImg} alt={`Photo of launchsite ${ls.siteName}.`} />

                            <h3>
                                {
                                    ls.siteName.length > 17 ?
                                        ls.siteName.substring(0, 17) + '...'
                                        : ls.siteName
                                }
                            </h3>

                            <label>
                                <input
                                    type="radio"
                                    value={JSON.stringify({
                                        id: `${ls.id}`,
                                        name: `${ls.siteName}`,
                                        imgUrl: `${ls.siteImg}`
                                    })
                                    }
                                    {...register("launchSite", { required: true })} />
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

export default WithRouter(Step7);