import {Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import Button from "@mui/material/Button";
import {user} from "../../atoms/user"

export default function Profile() {
    const [user, setUser] = useRecoilState(user);

    return (
        <TableContainer
            variant={"elevation"}
            elevation={3}
            component={Paper}
            sx={{
                width: "40%"
            }}
        >
            <Table aria-label="simple table">
                <TableBody>
                    {user.keys.map( key => {
                            return(
                                <TableRow
                                    key={'firstname'}
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
            <Button component={Link} to={'/profile/edit'}>Edit user info</Button>
        </TableContainer>
    )
}