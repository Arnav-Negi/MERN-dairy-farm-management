import * as React from "react"
import Avatar from "@mui/joy/Avatar"
import Box from "@mui/joy/Box"
import Button from "@mui/joy/Button"
import Chip from "@mui/joy/Chip"
import Divider from "@mui/joy/Divider"
import FormControl from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import Link from "@mui/joy/Link"
import Input from "@mui/joy/Input"
import Modal from "@mui/joy/Modal"
import ModalDialog from "@mui/joy/ModalDialog"
import ModalClose from "@mui/joy/ModalClose"
import Select from "@mui/joy/Select"
import Option from "@mui/joy/Option"
import Table from "@mui/joy/Table"
import Sheet from "@mui/joy/Sheet"
import Checkbox from "@mui/joy/Checkbox"
import IconButton, {iconButtonClasses} from "@mui/joy/IconButton"
import Typography from "@mui/joy/Typography"
import {useNavigate} from "react-router-dom"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import {useRecoilState} from "recoil";
import {userAtom} from "../../atoms/user.jsx";
import AddProduct from "./AddProduct.jsx";

const rows = [
    {
        id: "INV-1234",
        name: "Milk 1L",
        description: '1 litre pack of delicious milk',
        weeklyQuantity: 100,
        usedQuantity: 20,
        price: 40,
        discount: 0.1,
    }, {
        id: "INV-1235",
        name: "Ghee 200gms",
        description: '200 gms of delicious ghee',
        weeklyQuantity: 100,
        usedQuantity: 20,
        price: 40,
        discount: 0.1,
    }, {
        id: "INV-1236",
        name: "cheese 100gm",
        description: 'mmmmm cheeselicious',
        weeklyQuantity: 100,
        usedQuantity: 20,
        price: 40,
        discount: 0.1,
    },{
        id: "INV-1236",
        name: "cheese 100gm",
        description: 'mmmmm cheeselicious',
        weeklyQuantity: 100,
        usedQuantity: 20,
        price: 40,
        discount: 0.1,
    },{
        id: "INV-1236",
        name: "cheese 100gm",
        description: 'mmmmm cheeselicious',
        weeklyQuantity: 100,
        usedQuantity: 20,
        price: 40,
        discount: 0.1,
    },{
        id: "INV-1236",
        name: "cheese 100gm",
        description: 'mmmmm cheeselicious',
        weeklyQuantity: 100,
        usedQuantity: 20,
        price: 40,
        discount: 0.1,
    },{
        id: "INV-1236",
        name: "cheese 100gm",
        description: 'mmmmm cheeselicious',
        weeklyQuantity: 100,
        usedQuantity: 20,
        price: 40,
        discount: 0.1,
    },{
        id: "INV-1236",
        name: "cheese 100gm",
        description: 'mmmmm cheeselicious',
        weeklyQuantity: 100,
        usedQuantity: 20,
        price: 40,
        discount: 0.1,
    },
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

export default function InventoryTable() {

    const navigate = useNavigate()

    const [order, setOrder] = React.useState("desc");
    const [selected, setSelected] = React.useState([]);
    const [openAddProduct, setOpenAddProduct] = React.useState(false);
    const [openEditProduct, setOpenEditProduct] = React.useState(false);
    const [openEditRow, setOpenEditRow] = React.useState(null);

    const [user, setUser] = useRecoilState(userAtom);

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
                        startDecorator={<SearchOutlinedIcon />}
                        sx={{width: '100%'}}
                    />
                </FormControl>

                <FormControl sx={{flex: 1, right: 0}} size="sm">
                    <FormLabel>Add new product</FormLabel>
                    <Button
                        type={""}
                        variant="solid"
                        size="sm"
                        placeholder="Search"
                        startDecorator={<AddCircleOutlinedIcon />}
                        sx={{height: '75%'}}
                        onClick={(e) => setOpenAddProduct(true)}
                    >
                        Add Product
                    </Button>
                </FormControl>
            </Box>
            <AddProduct open={openAddProduct} setOpen={setOpenAddProduct}/>
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
                            <th style={{width: 230, padding: 12, paddingLeft: 65}}>Product Name</th>

                            <th style={{width: 300, padding: 12}}>Description</th>
                            <th style={{width: 100, padding: 12}}>Price</th>

                            <th style={{width: 100, padding: 12}}>
                                Discount
                            </th>

                            <th style={{width: 100, padding: 12}}>Quantity</th>
                            <th style={{width: 100, padding: 12}}>Available</th>
                            <th style={{width: 80, padding: 12,}}></th>
                            <th style={{width: 80, padding: 12,}}></th>

                    </tr>
                    </thead>
                    <tbody>
                    {stableSort(rows, getComparator(order, "id")).map(row => (
                        <tr key={row.id}>
                            <td style={{padding: 12}}>
                                <Box sx={{display: "flex", gap: 2, alignItems: "center", paddingLeft: 7}}>
                                    <Typography fontSize={'md'}
                                        fontWeight="lg"
                                        level="body3"
                                        textColor="text.primary"
                                    >
                                        {row.name}
                                    </Typography>
                                </Box>
                            </td>

                            <td style={{padding: 12}}>
                                <Typography fontSize={'md'} fontWeight="md">
                                    {row.description}
                                </Typography>
                            </td>

                            <td style={{padding: 12}}>
                                <Typography fontSize={'md'} fontWeight="md">
                                    {row.price}
                                </Typography>
                            </td>

                            <td style={{padding: 12}}>
                                <Typography fontSize={'md'} fontWeight="md">
                                    {row.discount}
                                </Typography>
                            </td>

                            <td style={{padding: 12}}>
                                <Typography fontSize={'md'} fontWeight="md">
                                    {row.weeklyQuantity}
                                </Typography>
                            </td>

                            <td style={{padding: 12}}>
                                <Typography fontSize={'md'} fontWeight="md">
                                    {row.weeklyQuantity - row.usedQuantity}
                                </Typography>
                            </td>

                            <td style={{padding: 12}}>
                                <Button fontSize={'sm'} type="" color={'primary'}
                                        sx={{marginBottom: 1, marginRight: 1, width: 80}}
                                        startDecorator={<EditOutlinedIcon/>}
                                // onClick={}
                                >
                                    Edit
                                </Button>
                            </td>

                            <td style={{padding: 12}}>
                                <Button fontSize={'sm'} type="" color={'danger'}
                                        sx={{marginBottom: 1, marginRight: 1, width: 90}}
                                        startDecorator={<RemoveOutlinedIcon/>}
                                // onClick={}
                                >
                                    Remove
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Sheet>
        </React.Fragment>
    )
}
