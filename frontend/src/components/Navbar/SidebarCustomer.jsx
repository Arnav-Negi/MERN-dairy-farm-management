import * as React from 'react';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import List from '@mui/joy/List';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import {useRecoilState} from "recoil";
import {userAtom} from "../../atoms/user.jsx";
import {useNavigate} from "react-router-dom";
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import HailOutlinedIcon from '@mui/icons-material/HailOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import {logout} from "../../utils/checkToken.jsx";

export default function SidebarCustomer() {
    const [user, setUser] = useRecoilState(userAtom);
    let navigate = useNavigate();

    return (
        <React.Fragment>
            <Box
                className="SecondSidebar-overlay"
                sx={{
                    position: 'fixed',
                    zIndex: 9999,
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    overflowX: 'hidden',
                    bgcolor: 'background.body',
                    opacity: 'calc(var(--SideNavigation-slideIn, 0) - 0.2)',
                    transition: 'opacity 0.4s',
                    transform: {
                        xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--FirstSidebar-width, 0px)))',
                        lg: 'translateX(-100%)',
                    },
                }}
            />
            <Sheet
                className="SecondSidebar"
                sx={{
                    position: {
                        xs: 'fixed',
                        lg: 'fixed',
                    },
                    transform: {
                        xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--FirstSidebar-width, 0px)))',
                        lg: 'none',
                    },
                    borderRight: '1px solid',
                    borderColor: 'divider',
                    transition: 'transform 0.4s',
                    zIndex: 9998,
                    height: '100dvh',
                    top: 0,
                    p: 2,
                    py: 3,
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                {/*TODO : Put avadoha logo here*/}
                <List
                    sx={{
                        '--ListItem-radius': '8px',
                        '--ListItem-minHeight': '32px',
                        '--List-gap': '4px',
                    }}
                >
                    <ListSubheader role="presentation" color={'primary'}>
                        Dashboard
                    </ListSubheader>
                    <ListItem>
                        <ListItemButton onClick={() => {
                            navigate('/customer/profile')
                        }} >
                            <ListItemDecorator>
                                <AccountBoxOutlinedIcon sx={{ fontSize: 30}}/>
                            </ListItemDecorator>
                            <ListItemContent >
                                Profile
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={() => {
                            navigate('/customer/app-info')
                        }} >
                            <ListItemDecorator>
                                <HelpCenterOutlinedIcon sx={{ fontSize: 30}}/>
                            </ListItemDecorator>
                            <ListItemContent >
                                App Info
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={() => {
                            navigate('/customer/vendors-list')
                        }} >
                            <ListItemDecorator>
                                <HailOutlinedIcon sx={{ fontSize: 30}}/>
                            </ListItemDecorator>
                            <ListItemContent >
                                Vendors
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={() => {
                            navigate('/customer/shopping-cart')
                        }} >
                            <ListItemDecorator>
                                <ShoppingCartOutlinedIcon sx={{ fontSize: 30}}/>
                            </ListItemDecorator>
                            <ListItemContent >
                                Your Cart
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={() => {
                            navigate('/customer/my-subscriptions')
                        }} >
                            <ListItemDecorator>
                                <InventoryOutlinedIcon sx={{ fontSize: 30}}/>
                            </ListItemDecorator>
                            <ListItemContent >
                                Your Subscriptions
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>
                </List>
                <Box sx={{pl: 1, mt: 'auto', display: 'flex', alignItems: 'center'}}>
                    <div style={{paddingRight: '10px'}}>
                        <Typography fontWeight="lg" level="body2" color={'primary'}>
                            {user.first_name + ' ' + user.last_name}
                        </Typography>
                        <Typography level="body2">{user.emailID}</Typography>
                    </div>
                    <IconButton variant='plain' color='primary' sx={{ml: 'auto'}}
                    onClick={() => {
                        logout()
                        navigate('/')
                    }}>
                        <LogoutOutlinedIcon />
                    </IconButton>
                </Box>
            </Sheet>
        </React.Fragment>
    );
}
