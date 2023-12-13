import { BrowserRouter as Router, Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Landing from "./components/Landing";
import CreateCourse from './components/CreateCourse';
import Register from './components/Register';
import ShowCourses from './components/ShowCourses';
import SignUp from './components/SignUp'
import AppBar from './components/AppBar';
import Course from './components/Course';

// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)
function App() {
    return (
        <>

            <Router>
                <AppBar></AppBar>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/addcourse" element={<CreateCourse />} />
                    <Route path="/courses" element={<ShowCourses />} />
                    <Route path="/course/:courseId" element={<Course />} />
                    <Route path="/signup" element={<SignUp />}></Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;