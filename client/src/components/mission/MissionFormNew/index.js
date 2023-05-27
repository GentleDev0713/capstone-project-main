// import { createStore, StateMachineProvider } from "little-state-machine";
// import React from "react";
// import ReactDOM from "react-dom";
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import Result from "./Result";
// import Step1 from "./Step1";
// import Step2 from "./Step2";
// import Step3 from "./Step3";
// import Step4 from "./Step4";
// import Step5 from "./Step5";
// import "./styles.css";

// createStore({});

// function App() {
//     return (
//         <StateMachineProvider>
//             <h1>Page Form Wizzard</h1>

//             <Router>

//                 {/* <Route path="/missions/new" element={<Step1 />} />
//                 <Route path="/missions/new" element={<Step2 />} /> */}

//                 <Route exact path="/" component={Step1} />
//                 <Route path="/step2" component={Step2} />

//                 <Route path="/step3" component={Step3} />
//                 <Route path="/step4" component={Step4} />
//                 <Route path="/step5" component={Step5} />
//                 <Route path="/result" component={Result} />
//             </Router>
//         </StateMachineProvider>
//     );
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
