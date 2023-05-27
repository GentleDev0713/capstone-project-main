import { useStateMachine } from "little-state-machine";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from '../../../context/AuthContext';
import '../../../css/missionFormSteps.css';
import useApi from "../../../hooks/useApi";
import updateAction from "./UpdateAction";

/* Step "8" - The user is presented with a summary of that user's sections.  The user can either go back to a step to edit it or book the mission. */

const Summary = (props) => {
    const { state } = useStateMachine(updateAction);
    const { user } = useContext(AuthContext);
    const { addData, error } = useApi();
    const navigate = useNavigate();

    /* Adds user_id property to state {} and assigns it current user's ID.  user_id is FK on missions table and relates to id PK on users table*/
    state.userId = user.id;

    const commander = JSON.parse(state.commander);
    const captain = JSON.parse(state.captain);
    const navigator = JSON.parse(state.navigator);
    const launchSite = JSON.parse(state.launchSite);
    const planet = JSON.parse(state.planet);
    const spaceCraft = JSON.parse(state.spaceCraft);

    async function newMission() {
        try {
            let mission = {
                missionName: state?.missionName,
                launchDate: state?.launchDate,
                userId: state?.userId,
                planetId: planet?.id,
                commanderId: commander?.id,
                captainId: captain?.id,
                navigatorId: navigator?.id,
                spacecraftId: spaceCraft?.id,
                launchSiteId: launchSite?.id
            };

            const response = await addData('/missions/new', mission);

            if (!response?.response?.data?.error?.message) {
                window.flash('Your mission has been created!', 'success');
                navigate('/');
            };
        } catch (error) {
            console.log(error)
        };
    };

    /* Navigate to previos step in funnel form */
    function goBack() {
        navigate("/missions/new/step7")
    };

    return (
        <div className="new-mission-summary">

            <div>
                <h1>Mission Summary</h1>
                <p>Review your mission's details.  To edit a selection, click Back. Click Book to reserve your trip. </p>
                <button className="summary-btns summary-btn-back" onClick={goBack}>Back</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Mission Name</th>
                        <th>Launch Date</th>
                        <th>Launch Time</th>
                        <th>Travel Time</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>{state?.missionName}</td>
                        <td>{state?.launchDate?.slice(0, 10)}</td>
                        <td>{state?.launchDate?.slice(11)} Hours</td>
                        <td>{planet?.distance} Light Years</td>
                    </tr>
                </tbody>
            </table>

            <section>
                <div>
                    <h3>Destination</h3>
                    <img src={planet?.imgUrl} />
                    <p>{planet?.name}</p>
                </div>

                <div>
                    <h3>Spacecraft</h3>
                    <img src={spaceCraft?.imgUrl} />
                    <p>{spaceCraft?.name}</p>
                </div>

                <div>
                    <h3>Launch Site</h3>ß
                    <img src={launchSite?.imgUrl} />
                    <p>{launchSite?.name}</p>
                </div>
            </section>

            <section>
                <div>
                    <h3>Commander</h3>
                    <img src={commander?.imgUrl} />
                    <p>{commander?.name}</p>
                </div>

                <div>
                    <h3>Captain</h3>
                    <img src={captain?.imgUrl} />
                    <p>{captain?.name}</p>
                </div>

                <div>
                    <h3>Navigator</h3>ß
                    <img src={navigator?.imgUrl} />
                    <p>{navigator?.name}</p>
                </div>
            </section>

            <button className="summary-btn-book summary-btns " onClick={() => { newMission() }} >Book!</button>

            <div className="summary-btns" >
                <p style={{ color: "red" }}>{error}</p>
            </div>
        </div>
    );
};

export default Summary;