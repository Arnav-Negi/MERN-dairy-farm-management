import './App.css'
import {Route, Routes} from "react-router-dom";
import VendorNavbar from "./components/Navbar/VendorNavbar.jsx";
import VendorProfile from "./components/Profile/VendorProfile.jsx";
import CustomerProfile from "./components/Profile/CustomerProfile.jsx";

function App() {

    return (
        <div className={'min-h-screen w-full flex justify-center place-items-center'}>
            <VendorNavbar/>
            <Routes>
                <Route path={'vendor'}>
                    <Route path={'profile'} element={<VendorProfile/>}/>
                </Route>
                <Route path={'customer'}>
                    <Route path={'profile'} element={<CustomerProfile/>}/>
                </Route>
            </Routes>
        </div>
    )
}

export default App
