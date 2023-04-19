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
import {userAtom} from "../../atoms/user";
import {useNavigate} from "react-router-dom";
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import {logout} from '../../utils/checkToken';
import {Check} from "@mui/icons-material";

export default function SidebarVendor() {
    const [user, setUser] = useRecoilState(userAtom);
    let navigate = useNavigate();

    return (
        <React.Fragment>
            <Box
                className="SecondSidebar-overlay"
                sx={{
                    position: 'fixed',
                    zIndex: 1,
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100%',
                    bgcolor: 'background.body',
                    opacity: 'calc(var(--SideNavigation-slideIn, 0) - 0.2)',
                    transition: 'opacity 0.4s',
                    transform: {
                        xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--FirstSidebar-width, 0px)))',
                        lg: 'translateX(-100%)',
                    },
                    overflowX: 'hidden',
                }}
            />
            <Sheet
                className="SecondSidebar"
                sx={{
                    position: 'fixed',
                    transform: {
                        xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--FirstSidebar-width, 0px)))',
                        lg: 'none',
                    },
                    borderRight: '1px solid',
                    borderColor: 'divider',
                    transition: 'transform 0.4s',
                    zIndex: 9999,
                    height: '100vh',
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
                        display: 'block',
                    }}
                >
                    <ListSubheader role="presentation" color={'primary'}>
                        Dashboard
                    </ListSubheader>
                    <ListItem>
                        <ListItemButton onClick={() => {
                            navigate('/vendor/profile')
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
                            navigate('/vendor/app-info')
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
                            navigate('/vendor/inventory')
                        }} >
                            <ListItemDecorator>
                                <Inventory2OutlinedIcon sx={{ fontSize: 30}}/>
                            </ListItemDecorator>
                            <ListItemContent >
                                Inventory
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={() => {
                            navigate('/vendor/subscriptions')
                        }} >
                            <ListItemDecorator>
                                <FormatListBulletedOutlinedIcon sx={{ fontSize: 30}}/>
                            </ListItemDecorator>
                            <ListItemContent >
                                Subscriptions
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
                    <IconButton variant='plain' color='primary' sx={{ml: 'auto'}} onClick={() => {
                                    logout();
                                    navigate('/')
                                }}>
                        <LogoutOutlinedIcon />
                    </IconButton>
                </Box>
            </Sheet>
        </React.Fragment>
    );
}
