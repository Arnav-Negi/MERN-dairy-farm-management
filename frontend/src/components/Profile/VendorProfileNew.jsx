import {TableBody, TableCell, TableContainer, TableRow, TextField} from "@mui/material";
import { Sheet } from "@mui/joy";
import {Table} from "@mui/joy";
import {Link} from "react-router-dom";
import {useRecoilState} from "recoil";
import Button from "@mui/joy/Button";
import {userAtom} from "../../atoms/user"
import {useState} from "react";
import Typography from "@mui/joy/Typography";
import axios from "axios";
import updateField from "../../utils/updateField.jsx";
import ColorSchemeToggle from "../Navbar/ColorSchemeToggle.tsx";
import * as React from "react";

export default function VendorProfile() {
    const [user, setUser] = useRecoilState(userAtom);
    const [formData, setFormData] = useState(user);
    const [editUser, setEditUser] = useState(false);
    const [editFarm, setEditFarm] = useState(false);
    const [editAccount, setEditAccount] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        async function updateCustomer() {
            try {
                const url = 'http://localhost:5000/api/vendor';
                const res = await axios.patch(url, formData);
                alert("customer updated.");
            } catch (e) {
                alert(e);
                console.log(e)
            }
        }

        updateCustomer().then(() => setUser(formData)).catch(err => console.log(err));
        setEditUser(false);
        setEditFarm(false);
        setEditAccount(false);
    }

    return (
        <ColorSchemeToggle
            sx={{ ml: 'auto', display: { xs: 'none', md: 'inline-flex' } }}
        />
        // <Sheet className={' w-full'} sx={{paddingTop: '50rem',
        //     paddingBottom: '5rem', width: '100%'}}>
        //     <Typography align={'left'} fontSize={'large'} sx={{paddingTop: '5%'}}>
        //         User info
        //     </Typography>
        //     <TableContainer
        //         variant={"elevation"}
        //         // elevation={3}
        //         component={Sheet}
        //         sx={{
        //             width: "100%"
        //         }}
        //     >
        //         <Table aria-label="simple table">
        //             <TableBody>
        //                 {Object.keys(user).map(key => {
        //                         if (key !== 'dairyFarm' && key !== 'account' && key !== '_id') {
        //                             if (key === 'workingDays')
        //                                 return (
        //                                     <TableRow
        //                                         key={key}
        //                                         sx={{'&:last-child td, &:last-child th': {border: 0}}}
        //                                     >
        //                                         <TableCell component="th" scope="row" align="left" sx={{
        //                                             fontSize: "120%",
        //                                         }}>
        //                                             {key}
        //                                         </TableCell>
        //                                         <TableCell align="right" sx={{
        //                                             fontSize: "120%",
        //                                         }}>
        //                                             <TextField
        //                                                 value={formData[key].join()}
        //                                                 InputProps={{
        //                                                     readOnly: !editUser,
        //                                                 }}
        //                                                 onChange={(e) => setFormData({...updateField({...formData}, key, e.target.value.split(','))})}/>
        //                                         </TableCell>
        //                                     </TableRow>
        //                                 )
        //                             else
        //                                 return (
        //                                     <TableRow
        //                                         key={key}
        //                                         sx={{'&:last-child td, &:last-child th': {border: 0}}}
        //                                     >
        //                                         <TableCell component="th" scope="row" align="left" sx={{
        //                                             fontSize: "120%",
        //                                         }}>
        //                                             {key}
        //                                         </TableCell>
        //                                         <TableCell align="right" sx={{
        //                                             fontSize: "120%",
        //                                         }}>
        //                                             <TextField
        //                                                 value={formData[key]}
        //                                                 InputProps={{
        //                                                     readOnly: !editUser,
        //                                                 }}
        //                                                 onChange={(e) => setFormData({...updateField({...formData}, key, e.target.value)})}/>
        //                                         </TableCell>
        //                                     </TableRow>
        //                                 )
        //                         }
        //                     }
        //                 )}
        //             </TableBody>
        //         </Table>
        //         <div className="flex justify-center">
        //             {editUser? <Button onClick={() => {
        //                     setEditUser(false);
        //                     setFormData(user);
        //                 }}>CANCEL</Button> :
        //                 <Button onClick={() => setEditUser(true)}>EDIT</Button>
        //             }
        //             <Button onClick={handleSubmit} disabled={!editUser}>UPDATE</Button>
        //         </div>
        //     </TableContainer>
        //
        //     <Typography align={'left'} fontSize={'large'} sx={{paddingTop: '5%'}}>
        //         Farm info
        //     </Typography>
        //     <TableContainer
        //         variant={"elevation"}
        //         // elevation={3}
        //         component={Sheet}
        //         sx={{
        //             width: "100%"
        //         }}
        //     >
        //         <Table aria-label="simple table">
        //             <TableBody>
        //                 {Object.keys(user.dairyFarm).map(key => {
        //                         return (
        //                             <TableRow
        //                                 key={key}
        //                                 sx={{'&:last-child td, &:last-child th': {border: 0}}}
        //                             >
        //                                 <TableCell component="th" scope="row" align="left" sx={{
        //                                     fontSize: "120%",
        //                                 }}>
        //                                     {key}
        //                                 </TableCell>
        //                                 <TableCell align="right" sx={{
        //                                     fontSize: "120%",
        //                                 }}>
        //                                     <TextField
        //                                         value={formData.dairyFarm[key]}
        //                                         InputProps={{
        //                                             readOnly: !editFarm,
        //                                         }}
        //                                         onChange={(e) => setFormData({
        //                                             ...formData,
        //                                             dairyFarm: {...updateField({...formData.dairyFarm}, key, e.target.value)}
        //                                         })}/>
        //                                 </TableCell>
        //                             </TableRow>
        //                         )
        //                     }
        //                 )}
        //             </TableBody>
        //         </Table>
        //         <div className="flex justify-center">
        //             {editFarm? <Button onClick={() => {
        //                     setEditFarm(false);
        //                     setFormData(user);
        //                 }}>CANCEL</Button> :
        //                 <Button onClick={() => setEditFarm(true)}>EDIT</Button>
        //             }
        //             <Button onClick={handleSubmit} disabled={!editFarm}>UPDATE</Button>
        //         </div>
        //     </TableContainer>
        //
        //     <Typography align={'left'} fontSize={'large'} sx={{paddingTop: '5%'}}>
        //         Account info
        //     </Typography>
        //     <TableContainer
        //         variant={"elevation"}
        //         // elevation={3}
        //         component={Sheet}
        //         sx={{
        //             width: "100%"
        //         }}
        //     >
        //         <Table aria-label="simple table">
        //             <TableBody>
        //                 {Object.keys(user.account).map(key => {
        //                         return (
        //                             <TableRow
        //                                 key={key}
        //                                 sx={{'&:last-child td, &:last-child th': {border: 0}}}
        //                             >
        //                                 <TableCell component="th" scope="row" align="left" sx={{
        //                                     fontSize: "120%",
        //                                 }}>
        //                                     {key}
        //                                 </TableCell>
        //                                 <TableCell align="right" sx={{
        //                                     fontSize: "120%",
        //                                 }}>
        //                                     <TextField
        //                                         value={formData.account[key]}
        //                                         InputProps={{
        //                                             readOnly: !editAccount,
        //                                         }}
        //                                         onChange={(e) => setFormData({
        //                                             ...formData,
        //                                             account: {...updateField({...formData.account}, key, e.target.value)}
        //                                         })}/>
        //                                 </TableCell>
        //                             </TableRow>
        //                         )
        //                     }
        //                 )}
        //             </TableBody>
        //         </Table>
        //         <div className="flex justify-center">
        //             {editAccount? <Button onClick={() => {
        //                     setEditAccount(false);
        //                     setFormData(user);
        //                 }}>CANCEL</Button> :
        //                 <Button onClick={() => setEditAccount(true)}>EDIT</Button>
        //             }
        //             <Button onClick={handleSubmit} disabled={!editAccount}>UPDATE</Button>
        //         </div>
        //     </TableContainer>
        // </Sheet>
    )
}