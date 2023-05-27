import React from 'react';
import '../../css/tables.css';
import useApi from '../../hooks/useApi';


/* Renders details on all mission.  Is for an admin to view all missions. */

const Missions = () => {
    const { data, removeData } = useApi(`/missions`)

    function handleDelete(id) {
        try {
            removeData(`/missions/${id}`);
            window.flash(`Mission ${id} has been deleted. `, 'success');
        } catch (error) {
            console.log(error)
        };
    };

    return (
        <div className='table-container'>

            <div className="header-missions">
                <h1 >Missions</h1>
            </div>

            <table>
                <thead>
                    <tr >
                        <th>M/ID</th>
                        <th>U/ID</th>
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
                        <tr key={m.id}>
                            <td >{m.id}</td >
                            <td >{m.userId}</td >
                            <td>{m.missionName}</td >
                            <td >{m.createdOn.slice(0, 16)}</td >
                            <td>{m.commanderName}</td >
                            <td>{m.captainName}</td >
                            <td>{m.navigatorName}</td >
                            <td>{m.planetName}</td >
                            <td >{m.distance}</td>
                            <td>{m.spacecraftName}</td>
                            <td>{m.launchSiteName}</td >
                            <td >{m.launchDate.slice(0, 10)}</td >
                            <td >{m.launchDate.slice(11)}</td >
                            <td
                                className='edit-delete-icons'
                                onClick={() => handleDelete(m.id)}
                            >
                                &#128465;
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default Missions;