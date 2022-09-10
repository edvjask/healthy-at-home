import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from "./pages/App";
import {UserContextProvider} from "./contexts/UserAuthContext";
import {GenerateWorkoutForm} from "./components/generate-form/GenerateWorkoutForm";
import {ExerciseAlternativeContextProvider} from "./contexts/ExerciseAlternativeContext";
import {ChooseExerciseForm} from "./components/choose-exercises-form/ChooseExerciseForm";
import {PrivateRoute, RouteType} from "./components/routes/PrivateRoute";
import {GenerateSchedule} from "./components/training-plans/GenerateSchedule";
import {TrainingPlans} from "./components/training-plans/TrainingPlans";
import {WorkoutSchedule} from "./components/workout-program/WorkoutSchedule";
import {WorkoutWrapper} from "./components/workout/WorkoutWrapper";
import {OutletWrapper} from "./components/training-plans/PlansOutlet";
import {TrainingSchedules} from "./components/workout-program/TrainingSchedules";
import {ExerciseDetails} from "./components/exercise/ExerciseDetails";
import {ExerciseList} from "./components/exercise/ExerciseList";
import {Homepage} from "./components/homepage/Homepage";
import Login from "./pages/Login";
import reportWebVitals from "./reportWebVitals";
import {ExerciseAdd} from "./components/exercise/ExerciseAdd";
import {WorkoutEdit} from "./components/workout/WorkoutEdit";
import {SnackbarContextProvider} from "./contexts/SnackbarContext";
import {Register} from "./pages/Register";
import {VerifyEmailPage} from "./pages/VerifyEmailPage";
import {EditPlan} from "./components/training-plans/EditPlan";
import {ThemeContextProvider} from "./contexts/ThemeContext";

ReactDOM.render(
    <React.StrictMode>
      <UserContextProvider>
        <ThemeContextProvider>
          <ExerciseAlternativeContextProvider>
            <SnackbarContextProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<App/>}>
                    <Route
                        path="/generate-workout"
                        element={<PrivateRoute type={RouteType.USER}>
                          <GenerateWorkoutForm/>
                        </PrivateRoute>}
                    />
                    <Route
                        path="/choose-exercises"
                        element={<PrivateRoute type={RouteType.USER}>
                          <ChooseExerciseForm/></PrivateRoute>}
                    />
                    <Route path="/training-plans"
                           element={<PrivateRoute type={RouteType.USER}><OutletWrapper/></PrivateRoute>}>
                      <Route
                          path=":id/generate-schedule"
                          element={<GenerateSchedule/>}
                      />
                      <Route
                          path=":id/edit"
                          element={<EditPlan/>}
                      />
                      <Route path="" element={<TrainingPlans/>}/>
                    </Route>
                    <Route path="/schedules"
                           element={<PrivateRoute type={RouteType.USER}><OutletWrapper/></PrivateRoute>}>
                      <Route path=":id" element={<WorkoutSchedule/>}/>
                      <Route path=":id/start-workout" element={<WorkoutWrapper/>}/>
                      <Route path=":id/edit-workout" element={<WorkoutEdit/>}/>
                      <Route path="" element={<TrainingSchedules/>}/>
                    </Route>
                    <Route path="/exercises" element={<OutletWrapper/>}>
                      <Route path="add" element={<PrivateRoute type={RouteType.ADMIN}><ExerciseAdd/></PrivateRoute>}/>
                      <Route path=":id" element={<ExerciseDetails/>}/>
                      <Route path="" element={<ExerciseList/>}/>
                    </Route>
                    <Route path="/" element={<Homepage/>}/>
                  </Route>
                  <Route path="login" element={<Login/>}/>
                  <Route path="register" element={<Register/>}/>
                  <Route path="verify-email" element={<VerifyEmailPage/>}/>
                </Routes>
              </BrowserRouter>
            </SnackbarContextProvider>
          </ExerciseAlternativeContextProvider>
        </ThemeContextProvider>
      </UserContextProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
