import { useLocation, useNavigate, useParams } from 'react-router-dom';

const WithRouter = (Component) => {

    function ComponentWithRouterProps(props) {
        const history = useNavigate();
        const location = useLocation();
        const match = useParams();

        return (<Component {...props} history={history} location={location} match={match} />);
    };
    return ComponentWithRouterProps;
};

export default WithRouter;