import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../css/forms.css';
import useApi from '../../hooks/useApi';
import PageNotFound from '../PageNotFound';
import FormUsers from './FormUsers';

/* Render form for the current user to update personal details.  If isAdmin, can edit details of any user */

const UpdateUserForm = ({ user }) => {
    const [userData, setUserData] = useState({});
    const [serverError, setServerError] = useState();
    const isAdmin = user.isAdmin;
    const { id } = useParams();
    const { updateData, data } = useApi(`/users/${id}`);
    const navigate = useNavigate();

    useEffect(() => {
        if (data.user) {
            setUserData(data.user)
        }
    }, [data])

    /* If the current user is not an admin, ensure params id and user.id match. If not, return page not found component.  */

    if (!isAdmin) {
        if (user.id !== +id) {
            return <PageNotFound />
        };
    };

    const onSubmit = async (formData) => {
        delete formData.missionCount;
        try {
            const response = await updateData(`/users/${id}`, formData);
            navigate(`/users/${id}`);
            window.flash('Your details have been updated!', 'success');

            if (response) {
                setServerError(response.response.data.error.message);
            };
        } catch (error) {
        };
    };

    return (userData?.username ? <FormUsers onSubmit={onSubmit} isAdmin={isAdmin} serverError={serverError} userData={userData} /> : <h1>User Not Found.</h1>)
};

export default UpdateUserForm;