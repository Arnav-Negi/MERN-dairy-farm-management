import {Typography} from "@mui/joy";
import {useEffect, useState} from "react";
import Button from "@mui/joy/Button";
import {useRecoilState} from "recoil";
import {userAtom} from "../../atoms/user"
import updateField from "../../utils/updateField";
import {Link} from "react-router-dom";
import * as url from "url";
import axios from "axios";
import Sheet from "@mui/joy/Sheet";
import ColorSchemeToggle from "../Navbar/ColorSchemeToggle.tsx";
import * as React from "react";
import Box from "@mui/joy/Box";
import FormControl from "@mui/joy/FormControl";
import Table from "@mui/joy/Table";
import Input from "@mui/joy/Input";
import FormLabel from "@mui/joy/FormLabel";

const keyToLabel = {
    first_name: "First Name",
    last_name: "Last Name",
    emailID: "Email",
    phoneNumber: "Contact",
    address: "Address",
    accountNumber: "Account no.",
    IFSC: "IFSC",
    accountType: "Account Type",
    bankName: "Bank Name",
    branchName: "Branch Name",
    holderName: "Holder Name",
    closingHours: "Closing Hours",
    establishedDate: "Established Date",
    name: "Farm Name",
    openingHours: "Opening Hours",
}


export default function VendorProfile() {
    const [user, setUser] = useRecoilState(userAtom);
    const [formData, setFormData] = useState(user);
    const [edit, setEdit] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        async function updateCustomer() {
            try {
                const url = 'http://localhost:5000/api/vendor';
                const res = await axios.patch(url, formData);
                setUser(formData);
                alert("vendor updated.");
            } catch (e) {
                alert(e);
                console.log(e);
            }
        }

        updateCustomer().then(() => {
            setEdit(false);
        });

        console.log(formData);
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
                    Hi, {user.first_name}!
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    my: 1,
                    gap: 1,
                    paddingTop: '10px',
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
                <form onSubmit={handleSubmit}>
                    <Table borderAxis="none">
                        <tbody>
                        <Typography level="h3" fontSize="xl2" color={'primary'} paddingTop={5}>
                            Personal Details
                        </Typography>
                        {Object.keys(user).map(key => {
                            if (key !== '_id' && key !== 'dairyFarm' && key !== 'account')
                                if (key !== 'workingDays')
                                    return (
                                        <tr
                                            key={key}
                                            style={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <td>
                                                <Typography fontSize={"lg"}>
                                                    {keyToLabel[key]}
                                                </Typography>
                                            </td>
                                            <td>
                                                {edit ?
                                                    <FormControl>
                                                        <Input
                                                            sx={{
                                                                fontSize: 'large',
                                                                padding: 1,
                                                                border: 1,
                                                                borderColor: 'primary.main'
                                                            }}
                                                            value={formData[key]}
                                                            variant={"outlined"}
                                                            color={"text.primary"}
                                                            onChange={(e) =>
                                                                setFormData({...updateField({...formData}, key, e.target.value)})}/>
                                                    </FormControl>
                                                    :
                                                    <Typography fontSize={'lg'} sx={{
                                                        fontSize: 'large',
                                                        padding: 1,
                                                        border: 1,
                                                        borderColor: 'primary.main'
                                                    }}>
                                                        {user[key]}
                                                    </Typography>}
                                            </td>
                                        </tr>
                                    )
                                else return (
                                    // TODO: working days input
                                    <></>
                                )
                        })}
                        <Typography level="h3" fontSize="xl2" color={'primary'} paddingTop={5}>
                            Dairy Farm Details
                        </Typography>
                        {Object.keys(user.dairyFarm).map(key => {
                            if (key !== '_id')
                                return (
                                    <tr
                                        key={key}
                                        style={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <td>
                                            <Typography fontSize={"lg"}>
                                                {keyToLabel[key]}
                                            </Typography>
                                        </td>
                                        <td>
                                            {edit ?
                                                <FormControl>
                                                    <Input
                                                        sx={{
                                                            fontSize: 'large',
                                                            padding: 1,
                                                            border: 1,
                                                            borderColor: 'primary.main'
                                                        }}
                                                        value={formData.dairyFarm[key]}
                                                        variant={"outlined"}
                                                        color={"text.primary"}
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                dairyFarm: {
                                                                    ...updateField({...formData.dairyFarm}, key, e.target.value)
                                                                }
                                                            })}/>
                                                </FormControl>
                                                :
                                                <Typography fontSize={'lg'} sx={{
                                                    fontSize: 'large',
                                                    padding: 1,
                                                    border: 1,
                                                    borderColor: 'primary.main'
                                                }}>
                                                    {user.dairyFarm[key]}
                                                </Typography>}
                                        </td>
                                    </tr>
                                )
                        })}
                        <Typography level="h3" fontSize="xl2" color={'primary'} paddingTop={5}>
                            Bank Account Details
                        </Typography>
                        {Object.keys(user.account).map(key => {
                            return (
                                <tr
                                    key={key}
                                    style={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <td>
                                        <Typography fontSize={"lg"}>
                                            {keyToLabel[key]}
                                        </Typography>
                                    </td>
                                    <td>
                                        {edit ?
                                            <FormControl>
                                                <Input
                                                    sx={{
                                                        fontSize: 'large',
                                                        padding: 1,
                                                        border: 1,
                                                        borderColor: 'primary.main'
                                                    }}
                                                    value={formData.account[key]}
                                                    variant={"outlined"}
                                                    color={"text.primary"}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            account: {
                                                                ...updateField({...formData.account}, key, e.target.value)
                                                            }
                                                        })}/>
                                            </FormControl>
                                            :
                                            <Typography fontSize={'lg'} sx={{
                                                fontSize: 'large',
                                                padding: 1,
                                                border: 1,
                                                borderColor: 'primary.main',
                                                minHeight: '45px'
                                            }}>
                                                {user.account[key]}
                                            </Typography>}
                                    </td>
                                </tr>
                            )
                        })
                        }
                        </tbody>
                    </Table>
                    <Box sx={{display: 'flex', gap: 2, paddingTop: '50px'}}>
                        {edit ? <Button variant={'outlined'} color="primary" onClick={(e) => {
                                e.preventDefault();
                                setEdit(false);
                                console.log('cancel')
                                setFormData(user);
                            }}>CANCEL</Button> :
                            <Button variant={'outlined'} color="primary" onClick={(e) => {
                                e.preventDefault();
                                console.log('edit')
                                setEdit(true);
                            }}>EDIT</Button>
                        }
                        <Button type="" disabled={!edit} color={"primary"}>UPDATE</Button>
                        <input type="submit" hidden/>
                    </Box>
                </form>
            </Box>
        </Box>
    )
};