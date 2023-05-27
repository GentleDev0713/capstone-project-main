import jwtDecode from 'jwt-decode';
import { createStore, StateMachineProvider } from "little-state-machine";
import React, { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './components/About';
import Astronaut from './components/astronaut/Astronaut';
import Astronauts from './components/astronaut/Astronauts';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Contact from './components/Contact';
import Flash from './components/Flash';
import Home from './components/Home';
import LaunchSite from './components/launchSite/LaunchSite';
import LaunchSites from './components/launchSite/LaunchSites';
import Mission from './components/mission/Mission';
import NewMission from './components/mission/MissionFormNew/NewMission';
import Step1 from './components/mission/MissionFormNew/Step1';
import Step2 from './components/mission/MissionFormNew/Step2';
import Step3 from './components/mission/MissionFormNew/Step3';
import Step4 from './components/mission/MissionFormNew/Step4';
import Step5 from './components/mission/MissionFormNew/Step5';
import Step6 from './components/mission/MissionFormNew/Step6';
import Step7 from './components/mission/MissionFormNew/Step7';
import Summary from './components/mission/MissionFormNew/Summary';
import Missions from './components/mission/Missions';
import NavBar from './components/NavBar';
import PageNotFound from './components/PageNotFound';
import Planet from './components/planet/Planet';
import Planets from './components/planet/Planets';
import Spacecraft from './components/spacecraft/SpaceCraft';
import Spacecrafts from './components/spacecraft/SpaceCrafts';
import AddUserForm from './components/user/FormAddUser';
import UpdateUserForm from './components/user/FormUpdateUser';
import User from './components/user/User';
import Users from './components/user/Users';
import AuthContext from './context/AuthContext';
import useLocalStorage from './hooks/useLocalStorage';
import Bus from './Utils/Bus';

window.flash = (message, type = "success") => Bus.emit('flash', ({ message, type }));

function App() {
    const [token] = useLocalStorage();
    const { user, setUser } = useContext(AuthContext);
    const isAdmin = user.isAdmin;
    createStore({});

    useEffect(() => {
        try {
            const payload = jwtDecode(token);
            setUser(payload)
        } catch (error) {
        };
    }, []);

    return (
        <div>
            <Flash />
            <NavBar user={user} setUser={setUser} />

            <StateMachineProvider>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/contact' element={<Contact />} />


                    <Route path='/auth/register' element={<RegisterForm setUser={setUser} />} />
                    <Route path='/auth/login' element={<LoginForm setUser={setUser} />} />

                    <Route path='/users' element={isAdmin ? <Users user={user} /> : <PageNotFound />} />

                    <Route path='/users/:id' element={user.id || isAdmin ? <User user={user} /> : <PageNotFound />} />

                    <Route
                        path='/users/update/:id'
                        element={user.id || isAdmin ? <UpdateUserForm user={user} />
                            : <PageNotFound />}
                    />
                    <Route
                        path='/users/new'
                        element={isAdmin ? <AddUserForm user={user} />
                            : <PageNotFound />}
                    />

                    <Route path='missions/new' element={<NewMission />} >
                        <Route index element={<Step1 />} />
                        <Route path='step2' element={<Step2 />} />
                        <Route path='step3' element={<Step3 />} />
                        <Route path='step4' element={<Step4 />} />
                        <Route path='step5' element={<Step5 />} />
                        <Route path='step6' element={<Step6 />} />
                        <Route path='step7' element={<Step7 />} />
                        <Route path='summary' element={<Summary />} />
                    </Route>

                    <Route
                        path='/missions'
                        element={isAdmin ? <Missions />
                            : <PageNotFound />}
                    />

                    <Route
                        path='/missions/my'
                        element={user.id ? <Mission />
                            : <PageNotFound />}
                    />

                    <Route path='/astronauts' element={<Astronauts />} />
                    <Route path='/astronauts/:id' element={<Astronaut />} />

                    <Route path='/planets' element={<Planets />} />
                    <Route path='/planets/:id' element={<Planet />} />

                    <Route path='/launchsites' element={<LaunchSites />} />
                    <Route path='/launchsites/:id' element={<LaunchSite />} />

                    <Route path='/spacecraft' element={<Spacecrafts />} />
                    <Route path='/spacecraft/:id' element={<Spacecraft />} />

                    <Route path='*' element={<PageNotFound />} />

                </Routes>
            </StateMachineProvider>
        </div >
    );
};

export default App;