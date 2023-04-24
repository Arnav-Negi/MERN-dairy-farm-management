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
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton"
import Typography from "@mui/joy/Typography"
import {useRecoilState} from "recoil";
import {productsAtom} from "../../atoms/products";
import CloseRounded from '@mui/icons-material/CloseRounded';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

import axios from "axios"
import Fuse from 'fuse.js';


import {useNavigate} from "react-router-dom"

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
const searchOptions = {keys: ['first_name', 'last_name','dairyFarm'], threshold: 0.2, limit: 9999}
const searchOptions2 = {keys: ['status'], threshold: 0.2, limit: 9999}
const searchOptions3 = {keys: ['address'], threshold: 0.2, limit: 9999}

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

export default function OrderTable() {
  const [order, setOrder] = React.useState("desc")
  const [selected, setSelected] = React.useState([])
  const [open, setOpen] = React.useState(false)
  const [vendorlist, setVendorlist] = React.useState([])
  const [value, setValue] = React.useState("o");
  const action = React.useRef(null);

  const [rows, setRows] = useRecoilState(productsAtom);

    let fuse = new Fuse([...rows], searchOptions);
    let fuse2 = new Fuse([...rows], searchOptions2);
    let fuse3 = new Fuse([...rows], searchOptions3);

    const [search, setSearch] = React.useState("");
    const [search3, setSearch3] = React.useState("");

    const [displayList, setDisplayList] = React.useState(rows);
    const [isLoading, setIsLoading] = React.useState(true)


  const navigate = useNavigate()

  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Status</FormLabel>

<Select
      action={action}
      value={value}
      placeholder="Filter by status…"
      onChange={(e, newValue) => setValue(newValue)}
      {...(value && {
        // display the button and remove select indicator
        // when user has selected a value
        endDecorator: (
          <IconButton
            size="sm"
            variant="plain"
            color="neutral"
            onMouseDown={(event) => {
              // don't open the popup when clicking on this button
              event.stopPropagation();
            }}
            onClick={() => {
              setValue(null);
              action.current?.focusVisible();
            }}
          >
           <CloseRounded 
            onClick={() => {
              setValue(null)
              action.current?.focusVisible();
              setDisplayList(rows)

            }}
            />
          </IconButton>
        ),
        indicator: null,
      })}
      sx={{ minWidth: 160 }}
    >
      <Option value="open">open</Option>
      <Option value="close">close</Option>
    </Select>
      </FormControl>
    </React.Fragment>
  )

  React.useEffect(() => {
    const getData = async () => {
      let things = []
      try {
        const url = "http://localhost:5000/api/customer/getVendors"
        const res = await axios.get(url)
        if (res.status === 200) {
          for (let i = 0; i < res.data.vendors.length; i++) {
            things[i] = {...res.data.vendors[i], status: res.data.statuses[i]}
          }
          setVendorlist(things)
          setRows(things)
          console.log(res.data.statuses)
          setIsLoading(false)
        } else {
            alert(res.status)
        }
    } catch (error) {
        console.log(error)
        alert(error.response.data.error);
    }
    }
    getData();
  }, [])

  React.useEffect(() => {
    fuse.setCollection([...rows]);
    setDisplayList([...rows]);
}, [rows]);

console.log(rows)

React.useEffect(() => {
    const result = fuse.search(search);
    if (search !== "")
        setDisplayList(result.map(res => res.item));
    else
        setDisplayList([...rows])
}, [search]);

React.useEffect(() => {
  const result = fuse3.search(search3);
  if (search3 !== "")
      setDisplayList(result.map(res => res.item));
  else
      setDisplayList([...rows])
}, [search3]);


  React.useEffect(() => {
    if (value !== null)
    {
      const result = fuse2.search(value);
    if (value !== "")
        setDisplayList(result.map(res => res.item));
    else
        setDisplayList([...rows])
    }
    
}, [value]); 


  function handleVendorClick(vendor){

    window.localStorage.setItem("vendorDetails", JSON.stringify(vendor))
    navigate("/customer/vendors-list/" + vendor._id)

  }

  if (isLoading) {return <div>Loading...</div>}
  return (
    <React.Fragment>
  
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: "sm",
          py: 2,
          display: {
            xs: "none",
            sm: "flex"
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
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search for vendor</FormLabel>
          <Input
            placeholder="Search"
            startDecorator={<i data-feather="search" />}
          value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </FormControl>

        {renderFilters()}

        <FormControl sx={{ flex: 0.5 }} size="sm">
          <FormLabel>Search By address</FormLabel>
          <Input
            placeholder="Search"
            startDecorator={<i data-feather="search" />}
            value={search3}
            onChange={(e) => setSearch3(e.target.value)}
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
          hoverRow
          sx={{
            "--TableCell-headBackground": theme =>
              theme.vars.palette.background.level1,
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground": theme =>
              theme.vars.palette.background.level1
          }}
        >
          <thead>
            <tr>
              {/* <th style={{ width: 48, textAlign: "center", padding: 12 }}>
                
              </th> */}
              <th style={{ width: 250, textAlign: "center", padding: 12 }}>Vendor</th>

              <th style={{ width: 120, padding: 12 }}>Farm Name</th>
              <th style={{ width: 120, padding: 12 }}>Address</th>
              <th style={{ width: 120, padding: 12 }}>Phone Number</th>

              
              <th style={{ width: 120, padding: 12 }}>Working Days</th>
              <th style={{ width: 160, padding: 12 }}>Timings</th>
              <th style={{ width: 120, padding: 12 }}>Status</th>

              {/* <th style={{ width: 140, padding: 12 }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                  fontWeight="lg"
                  endDecorator={<i data-feather="arrow-down" />}
                  sx={{
                    "& svg": {
                      transition: "0.2s",
                      transform:
                        order === "desc" ? "rotate(0deg)" : "rotate(180deg)"
                    }
                  }}
                >
                  Invoice
                </Link>
              </th> */}
              
            </tr>
          </thead>
          <tbody>
            {displayList && stableSort(displayList, getComparator(order, "id")).map(vendor => {

              let days = ""
              return (
              
                <tr key={vendor.id} onClick={() => handleVendorClick(vendor)} >
                  
                  {/* <td style={{ textAlign: "center" }}>
                    
                  </td> */}
                  <td >
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" ,paddingLeft: 3}}>
                      <Avatar size="sm" >{vendor.first_name[0]}</Avatar>
                      <div>
                        <Typography
                          fontWeight="lg"
                          level="body3"
                          textColor="text.primary"
                        >
                          {vendor.first_name} {vendor.last_name}
                        </Typography>
                        <Typography level="body3">
                          {vendor.emailID}
                        </Typography>
                      </div>
                    </Box>
                  </td>
                  <td>{vendor.dairyFarm.name}</td>
                  
                  <td>{vendor.address}</td>
                  <td>{vendor.phoneNumber}</td>
                  <td>
                  {vendor.workingDays.map((day, index) => {
                        day =  day.slice(0,3)
                        days = days + day + ", "
                        })}
                    <Typography fontWeight="md"> 
                      
                    {days}
                    </Typography>
                  </td>
                  
                  <td>
                  <Chip
                      variant="soft"
                      size="sm"
                    >
                      {vendor.dairyFarm.openingHours} -- {vendor.dairyFarm.closingHours}
                    </Chip>
                  </td>
  
                  <td>
                    <Chip
                      variant="soft"
                      size="sm"
                      startDecorator={
                        {
                          open: <DoneIcon/>,
                          close: <CloseIcon/>
                        }[vendor.status]
                      }
                      color={
                        {
                          open: "success",
                          close: "danger"
                        }[vendor.status]
                      }
                    >
                      {vendor.status}
                    </Chip>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Sheet>
      <Box
        className="Pagination-mobile"
        sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
      >
        <IconButton
          aria-label="previous page"
          variant="outlined"
          color="neutral"
          size="sm"
        >
          <i data-feather="arrow-left" />
        </IconButton>
        <Typography level="body2" mx="auto">
          Page 1 of 10
        </Typography>
        <IconButton
          aria-label="next page"
          variant="outlined"
          color="neutral"
          size="sm"
        >
          <i data-feather="arrow-right" />
        </IconButton>
      </Box>
      <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 4,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
          display: {
            xs: "none",
            md: "flex"
          }
        }}
      >
      </Box>
    </React.Fragment>
  )
}
