import {
    Dialog,
    List,
    ListItem,
    ListItemButton,
    ListItemText, Paper, Table, TableBody, TableCell,
    TableContainer, TableRow,
    TextField,
    Typography
} from "@mui/material";

import {useEffect, useState} from "react";
import Button from "@mui/joy/Button";
import {useRecoilState} from "recoil";
import {userAtom} from "../../atoms/user"
import updateField from "../../utils/updateField";
import {Link} from "react-router-dom";
import * as url from "url";
import axios from "axios";


export default function EditCustomer() {
    const [user, setUser] = useRecoilState(userAtom);
    const [formData, setFormData] = useState(user);
    const [edit, setEdit] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        async function updateCustomer() {
            try {
                const url = 'http://localhost:5000/api/customer';
                const res = await axios.patch(url, formData);
                alert("customer updated.");
            } catch (e) {
                alert(e);
                console.log(e)
            }
        }
        updateCustomer().then(() => setUser(formData)).catch(err => console.log(err));
    }

    return (
        <div className={'flex-col flex-grow w-full'}>
            <Typography align={'left'} fontSize={'larger'} sx={{paddingTop: '5%', paddingBottom: '5%'}}>
                User info
            </Typography>
            <TableContainer
                variant={"elevation"}
                elevation={3}
                component={Paper}
                sx={{
                    width: "100%"
                }}
            >
                <Table aria-label="simple table" sx={{padding: "5%"}}>
                    <TableBody>
                        {Object.keys(user).map(key => {
                                if (key !== '_id')
                                    return (
                                        <TableRow
                                            key={key}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell component="th" scope="row" align="left" sx={{
                                                fontSize: "120%",
                                            }}>
                                                {key}
                                            </TableCell>
                                            <TableCell align="right" sx={{
                                                fontSize: "120%",
                                            }}>
                                                <TextField
                                                    value={formData[key]}
                                                    InputProps={{
                                                        readOnly: !edit,
                                                    }}
                                                    onChange={(e) => setFormData({...updateField({...formData}, key, e.target.value)})}/>
                                            </TableCell>
                                        </TableRow>
                                    )
                            }
                        )}
                    </TableBody>
                </Table>
                <div className="flex justify-center">
                    {edit? <Button onClick={() => {
                            setEdit(false);
                            setFormData(user);
                        }}>CANCEL</Button> :
                    <Button onClick={() => setEdit(true)}>EDIT</Button>
                    }
                    <Button onClick={handleSubmit} disabled={!edit}>UPDATE</Button>
                </div>
            </TableContainer>
        </div>
    )
};