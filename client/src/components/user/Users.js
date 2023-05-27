import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/tables.css';
import useApi from '../../hooks/useApi';

/* Renders details on all users.  Is for an admin to view all missions. */
const Users = ({ user }) => {
    const { data, removeData } = useApi(`/users`)
    const isAdmin = user?.isAdmin
    const navigate = useNavigate();

    /* Deletes a user based on user ID */
    function handleDelete(id) {
        try {
            removeData(`/users/${id}`)
            window.flash('record has been created successfully!', 'success');
        } catch (error) {
            console.log(error)
        };
    };

    // window.flash('record has been created successfully!', 'success')

    return (
        <div className='table-container'>

            <div className='header-users'>
                <h1 >Users</h1>
                <div>
                    <button onClick={() => { navigate('/users/new') }}>Add User</button>
                </div>
            </div>

            {isAdmin &&
                <table>
                    <thead>
                        <tr >
                            <th>ID</th>
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Image URL </th>
                            <th>Admin</th>
                            <th>Missions</th>
                            {isAdmin &&
                                <th>&#9998;</th>
                            }
                            {isAdmin &&
                                <th>&#128465;</th>
                            }
                        </tr>
                    </thead>

                    <tbody>
                        {data?.users?.map(u => (
                            <tr key={u.id}>
                                <td >{u.id}</td >
                                <td >
                                    <Link to={`/users/${u.id}`}>{u.username}</Link>
                                </td>
                                <td >{u.firstName}</td >
                                <td >{u.lastName}</td >
                                <td>{u.age}</td >
                                <td >{u.email}</td >
                                <td>{u.phone}</td >
                                <td>{u.userImg}</td >
                                <td>{u.isAdmin ? "True" : "False"}</td >
                                <td>{u.missionCount}</td>
                                {isAdmin &&
                                    <td className="edit-delete-icons">
                                        <Link to={`/users/update/${u.id}`}>&#9998;</Link>
                                    </td>
                                }
                                {isAdmin &&
                                    <td
                                        className="edit-delete-icons"
                                        onClick={() => handleDelete(u.id)}
                                    >
                                        &#128465;
                                    </td>
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div>
    );
};

export default Users;