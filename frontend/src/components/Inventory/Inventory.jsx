import {Typography} from "@mui/joy";
import React, {useEffect} from "react";
import {useRecoilState} from "recoil";
import {userAtom} from "../../atoms/user"
import ColorSchemeToggle from "../Navbar/ColorSchemeToggle.tsx";
import Box from "@mui/joy/Box";


export default function AppInfo() {
    const [user, setUser] = useRecoilState(userAtom);


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

            </Box>
        </Box>
    )
};