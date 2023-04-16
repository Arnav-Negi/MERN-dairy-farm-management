import * as React from "react"
import {CssVarsProvider, useColorScheme} from "@mui/joy/styles"
import GlobalStyles from "@mui/joy/GlobalStyles"
import CssBaseline from "@mui/joy/CssBaseline"
import Box from "@mui/joy/Box"
import Button from "@mui/joy/Button"
import FormLabel, {formLabelClasses} from "@mui/joy/FormLabel"
import IconButton from "@mui/joy/IconButton"
import Typography from "@mui/joy/Typography"
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded"
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded"
import customTheme from "../../assets/theme/loginTheme"
import image from '../../assets/images/111.jpg'
import image1 from '../../assets/images/Untitled.png'
import imagebg from '../../assets/images/b2.png'
import image3 from '../../assets/images/b6.png'
import Grid from '@mui/joy/Grid';
import {styled} from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import {useLocation} from 'react-router-dom';
import SignIn from "./SignIn"
import SignUp from "./SignUp"
import VendorSignIn from "./VendorSignIn"
import VendorSignUp from "./VendorSignUp";

const Item = styled(Sheet)(({theme}) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.vars.palette.text.tertiary,
}));

function ColorSchemeToggle({onClick, ...props}) {
    const {mode, setMode} = useColorScheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])
    if (!mounted) {
        return <IconButton size="sm" variant="plain" color="neutral" disabled/>
    }
    return (
        <IconButton
            id="toggle-mode"
            size="sm"
            variant="plain"
            color="neutral"
            {...props}
            onClick={event => {
                if (mode === "light") {
                    setMode("dark")
                } else {
                    setMode("light")
                }
                onClick?.(event)
            }}
        >
            {mode === "light" ? <DarkModeRoundedIcon/> : <LightModeRoundedIcon/>}
        </IconButton>
    )
}

export default function Login() {

    const [signState, setSignState] = React.useState(2)

    let {state} = useLocation()

    function handleSignIn() {
        setSignState(2);
    }

    function handleSignUp() {
        setSignState(3);
    }

    return (
        <CssVarsProvider
            defaultMode="dark"
            disableTransitionOnChange
            theme={customTheme}
        >
            <CssBaseline/>
            <GlobalStyles
                styles={{
                    ":root": {
                        "--Collapsed-breakpoint": "769px",
                        "--Cover-width": "60vw",
                        "--Form-maxWidth": "700px",
                        "--Transition-duration": "0.4s"
                    },
                    "body": {
                        "display": "inline-block",
                    }
                }}
            />
            <Box
                sx={theme => ({
                    width:
                        "clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)",
                    transition: "width var(--Transition-duration)",
                    transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    justifyContent: "flex-start",
                    backdropFilter: "blur(4px)",
                    backgroundImage: `url(${image1})`,
                    backgroundSize: 'auto 150px',
                    backgroundRepeat: 'repeat',
                    [theme.getColorSchemeSelector("dark")]: {
                        backgroundColor: "rgba(19 19 24 / 0.4)",
                        backgroundImage: `url(${imagebg})`
                    }
                })}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        minHeight: "100dvh",
                        width:
                            "clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)",
                        maxWidth: "100%",
                        px: 2
                    }}
                >
                    <Box
                        component="header"
                        sx={{
                            py: 3,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        <Typography
                            fontWeight="lg"
                            startDecorator={
                                <Box
                                    component="span"
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        // background: theme =>
                                        //   `linear-gradient(45deg, ${theme.vars.palette.primary.solidBg}, ${theme.vars.palette.primary.solidBg} 30%, ${theme.vars.palette.primary.softBg})`,
                                        // borderRadius: "50%",
                                        // boxShadow: theme => theme.shadow.md,
                                        // "--joy-shadowChannel": theme =>
                                        //   theme.vars.palette.primary.mainChannel
                                    }}
                                />
                            }
                        >
                        </Typography>
                        <ColorSchemeToggle/>
                    </Box>
                    <Box
                        component="main"
                        sx={{
                            py: 1,
                            pb: 5,
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            width: 400,
                            maxWidth: "100%",
                            mx: "auto",
                            borderRadius: "sm",
                            "& form": {
                                display: "flex",
                                flexDirection: "column",
                                gap: 2
                            },
                            [`& .${formLabelClasses.asterisk}`]: {
                                visibility: "hidden"
                            }
                        }}
                    >
                        <div>
                            <Typography component="h2" fontSize="xl2" fontWeight="lg"   >
                                Dear {state.user === "customer" ? "Customer" : "Vendor"}, {signState === 2 ? "welcome back" : "let's get started"}
                            </Typography>
                            <Typography level="body2" sx={{my: 1, mb: 3}}>
                                {signState === 2 ? "We are so excited to see you again!" : "Sign up and start your journey with us"}
                            </Typography>
                        </div>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Button fullWidth disabled={signState === 2} type="" onClick={handleSignIn}
                                    color={"primary"}>
                                    Sign In
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button fullWidth disabled={signState === 3} type="" onClick={handleSignUp}
                                        color={"primary"}>
                                    Sign Up
                                </Button>
                            </Grid>
                        </Grid>
                        {signState === 2 ? (state.user === "customer" ? <SignIn/> :
                            <VendorSignIn/>) : (state.user === "customer" ? <SignUp/> : <VendorSignUp/>)}
                    </Box>
                    <Box component="footer" sx={{py: 3}}>
                        <Typography level="body3" textAlign="center">
                            © avadoha {new Date().getFullYear()}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={theme => ({
                    height: "100%",
                    position: "fixed",
                    right: 0,
                    top: 0,
                    bottom: 0,
                    left: 'clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))',
                    transition:
                        "background-image var(--Transition-duration), left var(--Transition-duration) !important",
                    transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
                    backgroundColor: "background.level1",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundImage:
                        `url(${image})`,
                    [theme.getColorSchemeSelector("dark")]: {
                        backgroundImage:
                            `url(${image3})`
                    }
                })}
            />
        </CssVarsProvider>
    )
}
