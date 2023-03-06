import {AppBar, Box, Toolbar} from "@mui/material";

export default function Navbar() {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar sx={{
                display: 'flex'
            }}>
                <Toolbar>
                    <a>
                        Thing 1
                    </a>
                    <a>
                        Thing 2
                    </a>
                    <a>
                        Thing 3
                    </a>
                </Toolbar>
            </AppBar>
        </Box>
    )
}