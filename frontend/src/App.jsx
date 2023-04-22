import axios from "axios";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Auth from './components/Auth/Auth';
import Verify from './Verify'
import Choose from './components/Choice/Choose';
import VendorProfile from "./components/Profile/VendorProfileNew.jsx";
import CustomerProfile from "./components/Profile/CustomerProfileNew.jsx";
import ItemList from "./components/ItemList/ItemList";
import VendorList from "./components/VendorList/OrdersListPage";
import MySubs from "./components/MySubs/MySubsList";
import Cart from "./components/Cart/Cart";
import { useRecoilState } from "recoil";
import { userAtom } from "./atoms/user";
import React, {Fragment, useEffect} from "react";
import { setToken } from "./utils/checkToken";
import AppInfo from "./components/AppInfo/NewAppInfo.jsx";
import SidebarCustomer from "./components/Navbar/SidebarCustomer.jsx";
import SidebarVendor from "./components/Navbar/SidebarVendor.tsx";
import { Box } from "@mui/joy";
import { CssVarsProvider } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import customTheme from './assets/theme/cartTheme'


export default function App() {
    return (
        <CssVarsProvider disableTransitionOnChange theme={customTheme}>
            <GlobalStyles
                styles={{
                    '[data-feather], .feather': {
                        color: 'var(--Icon-color)',
                        margin: 'var(--Icon-margin)',
                        fontSize: 'var(--Icon-fontSize, 20px)',
                        width: '1em',
                        height: '1em',
                    },
                }}
            />
            <CssBaseline />
            <Routes>
                <Route path="/" element={<Choose />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/:type/:user_id/verify/:token" element={<Verify />} />
                <Route path="/*" element={<Navigate to='/' />} />
                <Route path={'/vendor/*'} element={<VendorScreen />} />
                <Route path={'/customer/*'} element={<CustomerScreen />} />
            </Routes>
        </CssVarsProvider>
    )
}

function VendorScreen() {

    const [user, setUser] = useRecoilState(userAtom);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            if (setToken())
                navigate('/')
            try {
                const response = await axios.get('http://localhost:5000/api/vendor');
                console.log(response.data);
                setUser({ ...user, ...response.data.vendor });
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
            <Fragment>
            <Box sx={{ display: 'flex', minHeight: '100dvh', zIndex: 999, position: 'absolute', top: 0, width: '100%' }}>
                <SidebarVendor />
                <Box
                    component="main"
                    className="MainContent"
                    sx={(theme) => ({
                        px: {
                            xs: 2,
                            md: 6,
                        },
                        pt: {
                            xs: `calc(${theme.spacing(2)} + var(--Header-height))`,
                            sm: `calc(${theme.spacing(2)} + var(--Header-height))`,
                            md: 3,
                        },
                        pb: {
                            xs: 2,
                            sm: 2,
                            md: 3,
                        },
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: 0,
                        minHeight: '100dvh',
                        gap: 1,
                        backgroundColor: theme.vars.palette.background.level1,
                    })}
                >
                    <Routes>
                        <Route path={'profile'} element={<VendorProfile />} />
                        <Route path={'app-info'} element={<AppInfo />} />
                    </Routes>
                </Box>
            </Box>
            </Fragment>
        )
}


function CustomerScreen() {

    const [user, setUser] = useRecoilState(userAtom);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            if (setToken())
                navigate('/')
            try {
                const response = await axios.get('http://localhost:5000/api/customer');
                console.log(response.data.customer)
                setUser({ ...user, ...response.data.customer });
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
            <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
                <SidebarCustomer />
                <Box
                    component="main"
                    className="MainContent"
                    sx={(theme) => ({
                        ml: {
                            xs: 2,
                            md: 6,
                            lg: 30
                        },
                        // pt: {
                        //     xs: `calc(${theme.spacing(2)} + var(--Header-height))`,
                        //     sm: `calc(${theme.spacing(2)} + var(--Header-height))`,
                        //     md: 3,
                        // },
                        pb: {
                            xs: 2,
                            sm: 2,
                            md: 3,
                        },
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: 0,
                        height: '100dvh',
                        gap: 1,
                    })}
                >
                    <Routes>
                        <Route path={'profile'} element={<CustomerProfile/>} />
                        <Route path={'app-info'} element={<AppInfo />} />
                        <Route path={'vendors-list'} element={<VendorList />} />
                        <Route path={'vendors-list/:id'} element={<ItemList />} />
                        <Route path={'shopping-cart'} element={<Cart />} />
                        <Route path={'my-subscriptions'} element={<MySubs />} />
                    </Routes>
                </Box>
            </Box>
        )
}
