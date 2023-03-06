import './App.css'
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

function App() {

    return (
        <div className={'min-h-screen w-screen'}>
            <Routes>
                <Route path={'/'} element={<Navbar/>}>
                </Route>
            </Routes>
        </div>
    )
}

export default App
