import * as React from "react"
import Box from "@mui/joy/Box"
import Button from "@mui/joy/Button"
import Checkbox from "@mui/joy/Checkbox"
import FormControl from "@mui/joy/FormControl"
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel"
import Link from "@mui/joy/Link"
import Input from "@mui/joy/Input"
import { useLocation } from 'react-router-dom';
import { Typography } from "@mui/joy"
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import axios from 'axios'
import Root from "../../url"

export default function SignUp() {

    const [email, setEmail] = React.useState('')
    const [passError, setpassError] = React.useState(false);
    const [emailError, setEmailError] = React.useState(false);
    const [RegDisable, setRegDisable] = React.useState(true);
    const [password, setPassword] = React.useState("");
    const [isValid, setIsValid] = React.useState(false);
    const [lstate, setlstate] = React.useState(false)


    const [contact, setContact] = React.useState("");
    const [con_isValid, setCon_IsValid] = React.useState(false);
    const [conError, setConError] = React.useState(false);

    const [open2, setOpen2] = React.useState('');
    const [open3, setOpen3] = React.useState('');


    function handleload() {
        setlstate(true)
    }


    let { state } = useLocation()

    const handleEmailChange = (event) => {
        const emailValue = event.target.value;
        setEmail(emailValue);
        setEmailError(!validateEmail(emailValue));
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handlepassChange = (event) => {
        setPassword(event.target.value);
        setIsValid(event.target.value.length > 6);
        setpassError(!isValid);
    };

    const handleContactChange = (event) => {
        setContact(event.target.value);
        setCon_IsValid(event.target.value.length === 9);
        setConError(!con_isValid);
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)

        if (validateEmail(email)) {
            // email is valid, do something here
            console.log("Valid email:", email);
        } else {
            // email is invalid, show error message
            setEmailError(true);
            console.log("Invalid email:", email);
        }

        if (isValid) {
            console.log("Password is valid!");
            // add code to submit password to server or store in state
        } else {
            setpassError(true)
            console.log("Password is invalid. Please enter a password with more than 6 characters.");
            // add code to display error message to user
        }


        if (con_isValid) {
            console.log("Contact is valid!");
            // add code to submit password to server or store in state
        } else {
            setConError(true)
            console.log("Contact is invalid. Please enter a password with 10 characters.");
            // add code to display error message to user
        }

        handleload()

        try {
            const url ="http://localhost:5000/api/customer/register"
            const details = {
                first_name: data.get('firstname'),
                last_name: data.get('lastname'),
                emailID: data.get('email'),
                phoneNumber: data.get('contact'),
                password: data.get('password'),
                address: data.get('address')
            }
            const res = await axios.post(url, details);
            setOpen2('center');
            window.location.reload()
        } catch (error) {
            console.log(error)
            setOpen3('center')
        }
    }


    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <FormControl required>
                    <FormLabel>Email</FormLabel>
                    <Input
                        placeholder="Enter your email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        error={emailError}
                    />
                </FormControl>

                <FormControl required>
                    <FormLabel>First Name</FormLabel>
                    <Input
                        placeholder="Enter your First Name"
                        name="firstname"
                    />
                </FormControl>

                <FormControl required>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                        placeholder="Enter your Last Name"
                        name="lastname"
                    />
                </FormControl>

                <FormControl required>
                    <FormLabel>Contact No.</FormLabel>
                    <Input
                        placeholder="Enter your Contact"
                        name="contact"
                        type="number"
                        defaultValue={0}
                        value={contact}
                        onChange={handleContactChange}
                        error={conError}
                    />
                </FormControl>

                <FormControl required>
                    <FormLabel>Address</FormLabel>
                    <Input
                        placeholder="Enter your Address"
                        name="address"
                    />
                </FormControl>

                <FormControl required>
                    <FormLabel>Password</FormLabel>
                    <Input
                        placeholder="••••••••"
                        type="password"
                        name="password"
                        value={password}
                        onChange={handlepassChange}
                        error={passError} />
                </FormControl>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    {/* <Checkbox
                  size="sm"
                  label="Remember for 30 days"
                  name="persistent"
                /> */}
                    <Link fontSize="sm" href="#replace-with-a-link" fontWeight="lg">
                        Forgot password
                    </Link>
                </Box>
                <Button
                    loading={lstate}
                    type="" fullWidth>
                    Submit
                </Button>
            </form>

            <Modal open={!!open3} onClose={() => {
                setOpen3('')
                setlstate(false)
            }}>
                <ModalDialog
                    aria-labelledby="layout-modal-title"
                    aria-describedby="layout-modal-description"
                    layout={open3 || undefined}
                >
                    <ModalClose />
                    <Typography id="layout-modal-title" component="h2">
                        Email already exists
                    </Typography>
                    <Typography id="layout-modal-description" textColor="text.tertiary">
                        Please login to that account or create an account with a different email
                    </Typography>
                </ModalDialog>
            </Modal>

            <Modal open={!!open2} onClose={() => {
                setOpen2('')
                window.location.reload()
            }}>
                <ModalDialog
                    aria-labelledby="layout-modal-title"
                    aria-describedby="layout-modal-description"
                    layout={open2 || undefined}
                >
                    <ModalClose />
                    <Typography id="layout-modal-title" component="h2">
                        Account Created Successfully
                    </Typography>
                    <Typography id="layout-modal-description" textColor="text.tertiary">
                        Please verify your account to continue
                    </Typography>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    )
}