import * as React from "react"
import Box from "@mui/joy/Box"
import Button from "@mui/joy/Button"
import FormControl from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import Input from "@mui/joy/Input"
import Table from "@mui/joy/Table"
import Sheet from "@mui/joy/Sheet"
import Typography from "@mui/joy/Typography"
import {useNavigate} from "react-router-dom"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {useRecoilState} from "recoil";
import {userAtom} from "../../atoms/user.jsx";

const rows = [
    {
        id: "INV-1234",
        product: {name: 'Milk 1L'},
        customer: {
            first_name: "John",
            last_name: "Doe",
        },
        daily_quantity: 100,
        startDate: Date.now(),
        days: [
            'Monday',
            'Tuesday',
            'Sunday'
        ],
    }
]

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) {
            return order
        }
        return a[1] - b[1]
    })
    return stabilizedThis.map(el => el[0])
}

export default function VendorSubscriptionsTable() {

    const [order, setOrder] = React.useState("desc");

    const [user, setUser] = useRecoilState(userAtom);
    // const [products, setProducts] = useRecoilState(productsAtom);


    return (
        <React.Fragment>
            <Sheet
                className="SearchAndFilters-mobile"
                sx={{
                    display: {
                        xs: "flex",
                        sm: "none"
                    },
                    my: 1,
                    gap: 1
                }}
            >
            </Sheet>
            <Box
                className="SearchAndFilters-tabletUp"
                sx={{
                    borderRadius: "sm",
                    py: 2,
                    display: {
                        xs: "none",
                        sm: "flex",
                        lg: 'flex'
                    },
                    flexWrap: "wrap",
                    gap: 1.5,
                    "& > *": {
                        minWidth: {
                            xs: "120px",
                            md: "160px"
                        }
                    }
                }}
            >
                <FormControl sx={{flex: 1}} size="sm">
                    <FormLabel>Search for product</FormLabel>
                    <Input
                        placeholder="Search"
                        startDecorator={<SearchOutlinedIcon/>}
                        sx={{width: '70%'}}
                    />
                </FormControl>

            </Box>
            <Sheet
                className="OrderTableContainer"
                variant="outlined"
                sx={{
                    width: "100%",
                    borderRadius: "md",
                    flex: 1,
                    overflow: "auto",
                    minHeight: 0
                }}
            >
                <Table
                    aria-labelledby="tableTitle"
                    stickyHeader
                    borderAxis={'x'}
                    hoverRow
                    sx={{
                        "--TableCell-headBackground": theme =>
                            theme.vars.palette.background.level1,
                        "--Table-headerUnderlineThickness": "1px",
                        "--TableRow-hoverBackground": theme =>
                            theme.vars.palette.background.level1
                    }}
                >
                    <thead style={{marginLeft: 50}}>
                    <tr>
                        <th style={{width: 100, padding: 12, paddingLeft: 65}}>Sr No.</th>
                        <th style={{width: 150, padding: 12, paddingLeft: 10}}>Product Name</th>

                        <th style={{width: 150, padding: 12}}>Customer</th>
                        <th style={{width: 150, padding: 12}}>Quantity (Daily)</th>

                        <th style={{width: 150, padding: 12}}>
                            Start Date
                        </th>

                        <th style={{width: 250, padding: 12}}>Days</th>

                    </tr>
                    </thead>
                    <tbody>
                    {stableSort(rows, getComparator(order, "id")).map((row, index) => (
                        <tr key={row.id}>
                            <td style={{padding: 12}}>
                                <Box sx={{display: "flex", gap: 2, alignItems: "center", paddingLeft: 7}}>
                                    <Typography fontSize={'md'}
                                                fontWeight="lg"
                                                level="body3"
                                                textColor="text.primary"
                                    >
                                        {index + 1}
                                    </Typography>
                                </Box>
                            </td>

                            <td style={{padding: 12}}>
                                <Typography fontSize={'md'} fontWeight="md">
                                    {row.product.name}
                                </Typography>
                            </td>

                            <td style={{padding: 12}}>
                                <Typography fontSize={'md'} fontWeight="md">
                                    {row.customer.first_name + " " + row.customer.last_name}
                                </Typography>
                            </td>

                            <td style={{padding: 12}}>
                                <Typography fontSize={'md'} fontWeight="md">
                                    {row.daily_quantity}
                                </Typography>
                            </td>

                            <td style={{padding: 12}}>
                                <Typography fontSize={'md'} fontWeight="md">
                                    {(new Date(row.startDate)).toLocaleDateString()}
                                </Typography>
                            </td>

                            <td style={{padding: 12}}>
                                <Typography fontSize={'md'} fontWeight="md">
                                    {row.days.join(', ')}
                                </Typography>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Sheet>
        </React.Fragment>
    )
}
