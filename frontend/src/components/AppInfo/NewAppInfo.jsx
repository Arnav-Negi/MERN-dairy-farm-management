import {Typography} from "@mui/joy";
import React, {useEffect} from "react";
import {useRecoilState} from "recoil";
import {userAtom} from "../../atoms/user"
import ColorSchemeToggle from "../Navbar/ColorSchemeToggle.tsx";
import Box from "@mui/joy/Box";


export default function AppInfo() {

    const appInfo = {
        'About Us': 'Avadoha SaaS platform to connect dairy farmers to customers, ' +
            'brought to you Dasvande Technologies.',
        'How It Works': 'The SaaS platform has inventory management and order management' +
            ' capabilities. With the help of Avadoha, dairy farmers can manage their' +
            ' products and manage the sale and delivery of these products rigfht at their ' +
            'customer\'s doorsteps',
        'Terms Of Use': 'Terms of use go here',
        'Privacy Policy': 'privacy policy goes here',
        'FAQs': 'FAQs go here',
        'App Version': '0.1.0'
    }

    return (
        <Box
            component="main"
            className="MainContent"
            sx={(theme) => ({
                px: {
                    xs: 2,
                    md: 6,
                },
                pt: {
                    xs: `calc(${theme.spacing(2)}`,
                    sm: `calc(${theme.spacing(2)}`,
                    md: 3,
                },
                pb: {
                    xs: 4,
                    sm: 4,
                    md: 6,
                },
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
                width: '100dvw',
                minHeight: '100dvh',
                gap: 1,
            })}
        >
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'right'
                }}>
                <ColorSchemeToggle
                    sx={{ml: 'auto', display: {xs: 'none', md: 'inline-flex'},}}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    my: 1,
                    gap: 1,
                    flexWrap: 'wrap',
                    '& > *': {
                        minWidth: 'clamp(0px, (500px - 100%) * 999, 100%)',
                        flexGrow: 1,
                    },
                    width: '75%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >
                <Typography level="h1" fontSize="xl5" color={'primary'}>
                    App Information, Avadoha
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingTop: '10px',
                    flexWrap: 'wrap',
                    width: '75%',
                    marginLeft: 'auto',
                    marginRight: 'auto',

                }}
            >
                {Object.keys(appInfo).map(key => {return (
                        <React.Fragment>
                            <Typography level="h3" fontSize="xl2" color={'primary'} paddingTop={5}>
                                {key}
                            </Typography>
                            <Typography fontSize={'xl'} sx={{
                                borderColor: 'text.primary'
                            }}>
                                {appInfo[key]}
                            </Typography>
                        </React.Fragment>
                    )}
                )}
            </Box>
        </Box>
    )
};