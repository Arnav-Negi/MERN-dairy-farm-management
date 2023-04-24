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
    _id: 'ID',
    first_name: "First Name",
    last_name: "Last Name",
    emailID: "Email",
    phoneNumber: "Contact",
    address: "Address"
}


export default function CustomerProfile() {
    const [user, setUser] = useRecoilState(userAtom);
    const [formData, setFormData] = useState(user);
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        async function updateCustomer() {
            try {
                const url = 'http://localhost:5000/api/customer';
                const res = await axios.patch(url, formData);
                setLoading(false);
                alert("customer updated.");
            } catch (e) {
                setLoading(false);
                alert(e);
                console.log(e)
            }
        }

        updateCustomer().then(() => {
            setUser(formData);
            setEdit(false);
        }).catch(err => console.log(err));

        console.log(formData);
    }

    return (
        <Box sx={{display: 'flex', minHeight: '100dvh'}}>
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
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <ColorSchemeToggle
                        sx={{ml: 'auto', display: {xs: 'none', md: 'inline-flex'},}}
                    />
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '75%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}>
                    <Typography level="h1" fontSize="xl4" color={'primary'}>
                        Hi, {user.first_name}!
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '75%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        <Table borderAxis="none">
                            <tbody>
                            {Object.keys(user).map(key => {
                                if (Object.keys(keyToLabel).includes(key))
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
                                                {(edit && key !== '_id' && key !== 'emailID') ?
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
            </Box>
        </Box>
    )
};