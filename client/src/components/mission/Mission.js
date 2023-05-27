import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import '../../css/tables.css';
import useApi from '../../hooks/useApi';

/* Renders details on one mission.  Is for an admin to view all missions. */

const Mission = () => {
    const { user } = useContext(AuthContext);
    const { data, removeData } = useApi(`/missions/${user?.id}`);
    const navigate = useNavigate()

    /*Delete a missions based on missions ID */
    function handleDelete(id) {
        try {
            removeData(`/missions/${id}`);
            window.flash(`Your missions has been deleted.`, 'success');
        } catch (error) {
            console.log(error)
        };
    };

    return (
        <div className='table-container'>
            <div className="header-missions">
                <h1 >My Missions</h1>
            </div>
            {data?.missions?.length > 0 && (
                <table>
                    <thead>
                        <tr >
                            <th>Name</th>
                            <th>Created</th>
                            <th>Commander </th>
                            <th>Captain</th>
                            <th>Navigator</th>
                            <th>Planet</th>
                            <th>Distance</th>
                            <th>Craft</th>
                            <th>L/Site</th>
                            <th>L/Date</th>
                            <th>L/Time</th>
                            <th>&#128465;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.missions?.map(m => (
                            <tr key={m?.id}>
                                <td>{m?.missionName}</td >
                                <td >{m?.createdOn.slice(0, 10)}</td >
                                <td>{m?.commanderName}</td >
                                <td>{m?.captainName}</td >
                                <td>{m?.navigatorName}</td >
                                <td>{m?.planetName}</td >
                                <td >{m?.distance}</td>
                                <td>{m?.spacecraftName}</td>
                                <td>{m?.launchSiteName}</td >
                                <td >{m?.launchDate.slice(0, 10)}</td >
                                <td >{m?.launchDate.slice(11)}</td >
                                <td className='edit-delete-icons'
                                    onClick={() => handleDelete(m?.misionId)}
                                >
                                    &#128465;
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <section>
                {!data?.missions?.length > 0 &&
                    (<div>
                        <h3>It doesn't look like you have any missions scheduled</h3>
                        <p>How does a weekend on Mars sound?</p>
                        <button onClick={() => { navigate("/missions/new") }}>Book Now!</button>
                    </div>)
                }
            </section>
        </div >
    );
};

export default Mission;