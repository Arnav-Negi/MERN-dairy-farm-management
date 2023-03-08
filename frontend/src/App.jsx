import './App.css'
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Profile from "./components/Profile/Profile.jsx";

function App() {

    return (
        <div className={'min-h-screen w-full'}>
            <Routes>
                <Route path={'/'} element={<Navbar/>}>
                    <Route path={'/'} element={<Profile />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App
