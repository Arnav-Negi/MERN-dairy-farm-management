import * as React from "react";
import axios from "axios";
import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
import Auth from './components/Auth/Auth';
import Verify from './Verify'
import Choose from './components/Choice/Choose';
import VendorNavbar from "./components/Navbar/VendorNavbar.jsx";
import VendorProfile from "./components/Profile/VendorProfile.jsx";
import CustomerProfile from "./components/Profile/CustomerProfile.jsx";
import CustomerNavbar from "./components/Navbar/CustomerNavbar.jsx";
import { useRecoilState } from "recoil";
import { userAtom } from "./atoms/user";
import { useEffect } from "react";
import { setToken } from "./utils/checkToken";

export default function App() {

    return (
        <div className={'min-h-screen w-full bg-white'}>
            <Routes>
                <Route path="/" element={<Choose/>}/>
                <Route path="/auth" element={<Auth/>}/>
                <Route path="/:type/:user_id/verify/:token" element={<Verify/>}/>
                <Route path="/*" element={<Navigate to='/'/>}/>
                <Route path={'/vendor/*'} element={<VendorScreen />} />
                <Route path={'/customer/*'} element={<CustomerScreen />} />
            </Routes>
        </div>
    )
}

function VendorScreen() {

    const [user, setUser] = useRecoilState(userAtom);
    const navigate = useNavigate();
    useEffect( () => {
        async function fetchData() {
            if (setToken())
                navigate('/')
            try {
                const response = await axios.get('http://localhost:5000/api/vendor');
                setUser({...user, ...response.data.vendor});
            }
            catch {
                navigate('/');
            }
        }

        fetchData();
    }, [])

    if (!user) return (<div>loading</div>)
    else
    return (
        <>
            <VendorNavbar/>
            <div style={{marginLeft: '20%', width: '75%', minHeight: '100%', marginTop: '20%'}}>
            <Routes>
                <Route path={'profile'} element={<VendorProfile/>} />
            </Routes>
            </div>
        </>
    )
}

function CustomerScreen() {
    
    const [user, setUser] = useRecoilState(userAtom);
    const navigate = useNavigate();
    useEffect( () => {
        async function fetchData() {
            if (setToken())
                navigate('/')
            try {
                const response = await axios.get('http://localhost:5000/api/customer');
                console.log(response)
                setUser({...user, ...response.data.customer});
            }
            catch {
                navigate('/');
            }
        }

        fetchData();
    }, [])

    if (!user) return (<div>loading</div>)
    else
    return (
        <>
            <CustomerNavbar/>
            <div style={{marginLeft: '20%', width: '75%', minHeight: '100%'}}>
            <Routes>
                <Route path={'profile'} element={<CustomerProfile/>} />
            </Routes>
            </div>
        </>
    )
}
