import * as React from "react";
import './App.css'
import {Routes, Route, Navigate} from "react-router-dom";
import Auth from './components/Auth/Auth';
import Verify from './Verify'
import Choose from './components/Choice/Choose';
import VendorNavbar from "./components/Navbar/VendorNavbar.jsx";
import VendorProfile from "./components/Profile/VendorProfile.jsx";
import CustomerProfile from "./components/Profile/CustomerProfile.jsx";
import CustomerNavbar from "./components/Navbar/CustomerNavbar.jsx";

export default function App() {

    return (
        <div className={'min-h-screen w-full flex justify-center place-items-center'}>
            {/*<VendorNavbar/>*/}
            <Routes>
                <Route path="/" element={<Choose/>}/>
                <Route path="/auth" element={<Auth/>}/>
                <Route path="/:type/:user_id/verify/:token" element={<Verify/>}/>
                <Route path="*" xelement={<Navigate to='/'/>}/>
                <Route path={'/vendor/*'} element={<VendorScreen />} />
                <Route path={'/customer/*'} element={<CustomerScreen />} />
            </Routes>
        </div>
    )
}

function VendorScreen() {
    return (
        <>
            <VendorNavbar/>
            <Routes>
                <Route path={'profile'} element={<VendorProfile/>} />
            </Routes>
        </>
    )
}

function CustomerScreen() {
    return (
        <>
            <CustomerNavbar/>
            <Routes>
                <Route path={'profile'} element={<CustomerProfile/>} />
            </Routes>
        </>
    )
}