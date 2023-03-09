import * as React from "react"
import Box from "@mui/joy/Box"
import Button from "@mui/joy/Button"
import Checkbox from "@mui/joy/Checkbox"
import FormControl from "@mui/joy/FormControl"
import FormLabel, {formLabelClasses} from "@mui/joy/FormLabel"
import Link from "@mui/joy/Link"
import Input from "@mui/joy/Input"
import {useLocation} from 'react-router-dom';
import axios from 'axios'
import Root from "../../url"
import Grid from "@mui/joy/Grid";
import Typography from "@mui/joy/Typography";

export default function VendorSignUp() {

    let {state} = useLocation();

    const handleSubmit = async (event) => {
        console.log()
        event.preventDefault()
        const data = new FormData(event.currentTarget)

        try {
            const url = "http://localhost:5000/api/vendor/register"
            const details = {
                first_name: data.get('firstname'),
                last_name: data.get('lastname'),
                emailID: data.get('email'),
                phoneNumber: data.get('contact'),
                password: data.get('password'),
                address: data.get('address')
            }
            const res = await axios.post(url, details)
            if (res.status === 200) {
                alert("Vendor created!")
            } else {
                alert("Invalid credentials!")
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                    <Grid item xs={6} md={8}>
                        <FormControl required>
                            <FormLabel>Email</FormLabel>
                            <Input
                                placeholder="Enter your email"
                                type="email"
                                name="email"
                            />
                        </FormControl>
                        <FormControl required>
                            <FormLabel>First Name</FormLabel>
                            <Input
                                placeholder="First Name"
                                name="firstname"
                            />
                        </FormControl>
                        <FormControl required>
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                placeholder="Last Name"
                                name="lastname"
                            />
                        </FormControl>

                        <FormControl required>
                            <FormLabel>Contact No.</FormLabel>
                            <Input
                                placeholder="Enter your Contact"
                                name="contact"
                            />
                        </FormControl>
                        <FormControl required>
                            <FormLabel>Password</FormLabel>
                            <Input placeholder="Password" type="password" name="password"/>
                        </FormControl>
                        <FormControl required>
                            <FormLabel>Address</FormLabel>
                            <Input placeholder={'Address'} type="text" name="address"/>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6} md={8}>
                        <Typography textColor={'black'}>Farm info</Typography>
                        <FormControl required>
                            <FormLabel>Email</FormLabel>
                            <Input
                                placeholder="Enter your email"
                                type="email"
                                name="email"
                            />
                        </FormControl>
                        <FormControl required>
                            <FormLabel>First Name</FormLabel>
                            <Input
                                placeholder="First Name"
                                name="firstname"
                            />
                        </FormControl>
                        <FormControl required>
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                placeholder="Last Name"
                                name="lastname"
                            />
                        </FormControl>

                        <FormControl required>
                            <FormLabel>Contact No.</FormLabel>
                            <Input
                                placeholder="Enter your Contact"
                                name="contact"
                            />
                        </FormControl>
                        <FormControl required>
                            <FormLabel>Password</FormLabel>
                            <Input placeholder="Password" type="password" name="password"/>
                        </FormControl>
                        <FormControl required>
                            <FormLabel>Address</FormLabel>
                            <Input placeholder={'Address'} type="text" name="address"/>
                        </FormControl>
                    </Grid>

                </Grid>
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
                <Button type="submit" fullWidth>
                    Submit
                </Button>
            </form>
        </>
    )
}