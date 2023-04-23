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
import Checkbox from '@mui/joy/Checkbox';

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
    workingDays: "Working Days",
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function VendorProfile() {
    const [user, setUser] = useRecoilState(userAtom);
    const [formData, setFormData] = useState(user);
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        async function updateVendor() {
            try {
                const url = 'http://localhost:5000/api/vendor';
                const res = await axios.patch(url, formData);
                setUser(formData);
                setLoading(false);
                alert("vendor updated.");
            } catch (e) {
                setLoading(false);
                alert(e);
                console.log(e);
            }
        }

        updateVendor().then(() => {
            setEdit(false);
        });

        console.log(formData);
    }

    const addOrRemoveDay = (day, add) => {
        const newWorkingDays = [...formData.workingDays];
        if (add && !newWorkingDays.includes(day))
            newWorkingDays.push(day);
        else if (newWorkingDays.includes(day))
            newWorkingDays.splice(newWorkingDays.indexOf(day), 1);
        setFormData({...formData, workingDays: newWorkingDays});
    }

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
                                if (!Object.keys(keyToLabel).includes(key)) return <></>
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
                                                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 4}}>
                                                    {days.map((day, index) => {
                                                            return (
                                                                <Checkbox
                                                                    disabled={!edit}
                                                                    label={day}
                                                                    checked={formData.workingDays.includes(day)}
                                                                    onChange={(e =>
                                                                        addOrRemoveDay(day, e.target.checked)
                                                                    )}/>
                                                            )
                                                        }
                                                    )
                                                    }
                                                </Box>
                                            </td>
                                        </tr>
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
                            <Button type="" disabled={!edit} loading={loading} color={"primary"}>UPDATE</Button>
                            <input type="submit" hidden/>
                        </Box>
                    </form>
                </Box>
                <Box sx={{minHeight: '80px'}}></Box>
            </Box>
        </Box>
    )
};