import {Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography} from "@mui/material";
import updateField from "../../utils/updateField.jsx";
import Button from "@mui/joy/Button";

export default function AppInfo() {

    const appInfo = {
        'About Us': 'Avadoha SaaS platform to connect dairy farmers to customers, ' +
            'brought to you Dasvande Technologies.',
        'How It Works': 'The SaaS platform has inventory management and order management' +
            ' capabilities. With the help of Avadoha, dairy farmers can manage their' +
            ' products and manage the sale and delivery of these products rigfht at their ' +
            'customer\'s doorsteps',
        'Terms Of Use': 'Terms of use go here',
        'Privacy Policy': 'privacy policy goes here',
        'FAQs': 'FAQs go here',
        'App Version': '0.1.0'

    }

    return (
        <div className={'flex-col flex-grow w-full'}>
            <Typography align={'left'} fontSize={'larger'} >
                App Information
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
                        {Object.keys(appInfo).map(key => {
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
                                            {appInfo[key]}
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}