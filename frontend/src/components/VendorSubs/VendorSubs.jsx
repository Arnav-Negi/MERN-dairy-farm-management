import {useRecoilState} from "recoil";
import Box from "@mui/joy/Box";
import ColorSchemeToggle from "../../utils/ColorSchemeToggle.jsx";
import {Typography} from "@mui/joy";
import * as React from "react";
import {userAtom} from "../../atoms/user.jsx";
import VendorSubscriptionsTable from "./VendorSubscriptionsTable.jsx";
import axios from "axios";
import {useEffect, useState} from "react";

export default function VendorSubs() {
    const [user, setUser] = useRecoilState(userAtom);


    return (
        <Box sx={{display: 'flex', minHeight: '100dvh',}}>
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
                    height: '100dvh',
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
                <Typography level="h1" fontSize="xl4" color={'primary'}>
                    Subscriptions for {user.dairyFarm.name}
                </Typography>
                <VendorSubscriptionsTable/>
                <Box sx={{minHeight: '80px'}}></Box>
            </Box>
        </Box>
    )
}