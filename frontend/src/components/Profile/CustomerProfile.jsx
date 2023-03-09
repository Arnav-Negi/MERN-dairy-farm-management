import {Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import Button from "@mui/material/Button";
import {userAtom} from "../../atoms/user"
import {useState} from "react";
import Typography from "@mui/material/Typography";
import EditCustomer from "./EditCustomer";

export default function CustomerProfile() {
    const [user, setUser] = useRecoilState(userAtom);

    return (
        <div className={'flex-col flex-grow w-full'}>
            <Typography align={'left'} variant={'h4'} sx={{paddingTop: '5%',paddingBottom: '5%'}}>
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
                                        }}>{user[key]}</TableCell>
                                    </TableRow>
                                )
                            }
                        )}
                    </TableBody>
                </Table>
                <EditCustomer />
            </TableContainer>
        </div>
    )
}