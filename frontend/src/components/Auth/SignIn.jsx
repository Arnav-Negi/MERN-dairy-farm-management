import * as React from "react"
import Box from "@mui/joy/Box"
import Button from "@mui/joy/Button"
import Checkbox from "@mui/joy/Checkbox"
import FormControl from "@mui/joy/FormControl"
import FormLabel, {formLabelClasses} from "@mui/joy/FormLabel"
import Link from "@mui/joy/Link"
import Input from "@mui/joy/Input"
import {useLocation, useNavigate} from 'react-router-dom';
import {Typography} from "@mui/joy"
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import axios from 'axios'
import {useRecoilState} from "recoil";
import {userAtom} from "../../atoms/user.jsx";

export default function SignIn() {
    const [user, setUser] = useRecoilState(userAtom)
    const [lstate, setlstate] = React.useState(false)

    const [RegDisable, setRegDisable] = React.useState(true);

    const [open2, setOpen2] = React.useState('');
    const [open3, setOpen3] = React.useState('');

    let {state} = useLocation()

    const navigate = useNavigate()

    function handleload() {
        setlstate(true)
    }


    const handleSubmit = async (event) => {
        event.preventDefault()
        handleload()
        const data = new FormData(event.currentTarget)
        try {
            const url = "http://localhost:5000/api/customer/login"
            const details = {
                emailID: data.get('email'),
                password: data.get('password')
            }
            const res = await axios.post(url, details)
            if (res.status === 200) {
                setUser(res.data.customer);
                localStorage.setItem("token", res.data.token);
                navigate('/customer/vendors-list');
            } else {
                alert(res.status)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <React.Fragment >
            <form onSubmit={handleSubmit}>
                <FormControl required>
                    <FormLabel>Email</FormLabel>
                    <Input
                        placeholder="Enter your email"
                        type="email"
                        name="email"
                    />
                </FormControl>
                <FormControl required>
                    <FormLabel>Password</FormLabel>
                    <Input placeholder="•••••••" type="password" name="password"/>
                </FormControl>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <Link fontSize="sm" href="#replace-with-a-link" fontWeight="lg">
                        Forgot password
                    </Link>
                </Box>
                <Button
                    loading={lstate}
                    type=""
                    fullWidth>
                    Submit
                </Button>
            </form>

            <Modal open={!!open2} onClose={() => {
                setOpen2('')
                setlstate(false)
            }}>
                <ModalDialog
                    aria-labelledby="layout-modal-title"
                    aria-describedby="layout-modal-description"
                    layout={open2 || undefined}
                    color="danger"
                >
                    <ModalClose/>
                    <Typography id="layout-modal-title" component="h2">
                        Invalid credentials!
                    </Typography>
                    <Typography id="layout-modal-description" textColor="text.tertiary">
                        Sorry, we can't find an account with this email address. Please try again or create a new
                        account.
                    </Typography>
                </ModalDialog>
            </Modal>

        </React.Fragment>
    )
}
