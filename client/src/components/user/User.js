import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../css/tables.css';
import useApi from '../../hooks/useApi';
import PageNotFound from '../PageNotFound';

/* Renders details on one user */
const User = ({ user }) => {
    const { id } = useParams();
    const { data } = useApi(`/users/${id}`)
    const navigate = useNavigate();
    const u = data.user;
    const isAdmin = user.isAdmin;

    if (+id === user.id || isAdmin && u) {
        return (
            <div className='verticle-table-container'>

                <div className='user-header'>
                    <img src={u?.userImg} />
                    <h1>{u?.firstName}'s Profile</h1>
                </div>

                <table >
                    <tbody>
                        {isAdmin &&
                            <tr>
                                <th>User ID:</th>
                                <td>{u?.id}</td>
                            </tr>
                        }
                        <tr>
                            <th>First Name:</th>
                            <td>{u?.firstName}</td>
                        </tr>
                        <tr>
                            <th>Last Name:</th>
                            <td>{u?.lastName}</td>
                        </tr>
                        <tr>
                            <th>Username:</th>
                            <td>{u?.username}</td>
                        </tr>
                        <tr>
                            <th>Age:</th>
                            <td>{u?.age}</td>
                        </tr>
                        <tr>
                            <th>Phone:</th>
                            <td>{u?.phone}</td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td>{u?.email}</td>
                        </tr>
                        <tr>
                            <th>Image URL:</th>
                            <td>{u?.userImg}</td>
                        </tr>
                        <tr>
                            <th>Missions:</th>
                            <td>{u?.missionCount}</td>
                        </tr>
                        {isAdmin &&
                            <tr>
                                <th>Admin:</th>
                                <td>{u?.isAdmin ? "True" : "False"}</td>
                            </tr>
                        }
                    </tbody>
                </table>
                <div>
                    <button onClick={() => { navigate(`/users/update/${id}`) }}>Update Profile</button>
                </div>
            </div>
        );
    } else {
        return <PageNotFound />
    }
};

export default User;