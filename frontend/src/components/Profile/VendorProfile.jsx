import {Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import Button from "@mui/material/Button";
import {userAtom} from "../../atoms/user"
import {useState} from "react";
import Typography from "@mui/material/Typography";

export default function VendorProfile() {
    const [user, setUser] = useRecoilState(user);
    // const [user, setUser] = useState({
    //     first_name: 'arnav',
    //     last_name: 'negi',
    //     phoneNumber: '910191019',
    //     emailID: 'arnavnegi14@gmail.com',
    //     address: "your mom's house",
    //     dairyFarm: {
    //         name: 'your mom is a cow',
    //         establishedDate: '29/03/2007',
    //         openingHours: '10 AM',
    //         closingHours: '11 PM',
    //     },
    //     workingDays: ['Monday', 'Tuesday', 'Wednesday'],
    //     account: {
    //         holderName: 'Goudhara farms',
    //         bankName: 'ISBC',
    //         branchName: 'Gachibowli',
    //         IFSC: '1901ASJD',
    //         accountNumber: '9910-1992-1912',
    //         accountType: 'savings',
    //     },
    // });

    return (
        <div className={'flex-col flex-grow w-full pt-10'}>
            <Typography align={'left'} variant={'h4'} sx={{paddingTop: '5%'}}>
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
                <Table aria-label="simple table">
                    <TableBody>
                        {Object.keys(user).map(key => {
                                if (key !== 'dairyFarm' && key !== 'account') {
                                    if (key === 'workingDays')
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
                                                }}>{user[key].join()}</TableCell>
                                            </TableRow>
                                        )
                                    else
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
                            }
                        )}
                    </TableBody>
                </Table>
                <Button component={Link} to={'/profile/edit'}>Edit user info</Button>
            </TableContainer>

            <Typography align={'left'} variant={'h4'} sx={{paddingTop: '5%'}}>
                Farm info
            </Typography>
            <TableContainer
                variant={"elevation"}
                elevation={3}
                component={Paper}
                sx={{
                    width: "100%"
                }}
            >
                <Table aria-label="simple table">
                    <TableBody>
                        {Object.keys(user.dairyFarm).map(key => {
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
                                        }}>{user.dairyFarm[key]}</TableCell>
                                    </TableRow>
                                )
                            }
                        )}
                    </TableBody>
                </Table>
                <Button component={Link} to={'/profile/edit'}>Edit user info</Button>
            </TableContainer>

            <Typography align={'left'} variant={'h4'} sx={{paddingTop: '5%'}}>
                Account info
            </Typography>
            <TableContainer
                variant={"elevation"}
                elevation={3}
                component={Paper}
                sx={{
                    width: "100%"
                }}
            >
                <Table aria-label="simple table">
                    <TableBody>
                        {Object.keys(user.account).map(key => {
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
                                        }}>{user.account[key]}</TableCell>
                                    </TableRow>
                                )
                            }
                        )}
                    </TableBody>
                </Table>
                <Button component={Link} to={'/profile/edit'}>Edit user info</Button>
            </TableContainer>
        </div>
    )
}