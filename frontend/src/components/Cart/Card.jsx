import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import Checkbox from '@mui/joy/Checkbox';
import Avatar from '@mui/joy/Avatar';
import ChipDelete from '@mui/joy/ChipDelete';
import DeleteForever from '@mui/icons-material/DeleteForever';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Badge from '@mui/joy/Badge';
import Box from '@mui/joy/Box';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import { Alert } from '@mui/joy';
import axios from 'axios';

export default function InteractiveCard(props) {
  const [count, setCount] = React.useState(props.item.daily_quantity);
  const [checkStat, setCheckStat] = React.useState(props.item.checkStat);
  const [showZero, setShowZero] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [editting, setEditting] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [selectedcart, setSelectedcart] = React.useState([]);
  const [dayStat, setDayStat] = React.useState([false, false, false, false, false, false, false])
  // const [changing, setChanging] = React.useState(false)
  const [addingStat, setAddingStat] = React.useState(false)

  console.log(props.item.product.name)

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  async function handleCountAdd(){
    setEditting(true)
        try {
          const url = "http://localhost:5000/api/customer/updateCart"
          const details = {product: props.item.product._id,
             days: props.item.days,
             daily_quantity: count + 1,
             startDate : props.item.startDate,
             checkStat : props.item.checkStat
            }
          const res = await axios.post(url, details)
          if (res.status === 200) {
            setItems(res.data.products)
            setIsLoading(false)
    setCount(count + 1)
          } else {
              alert(res.status)
          }
      } catch (error) {
          console.log(error)
          alert(error.response.data.error);
          window.location.reload()
      }
    setEditting(false) 
    props.count(count + 1, props.item.product._id)
  }
  async function handleCountSubtract(){

    if(count === 1) return
    
    setEditting(true)
      

        try {
          const url = "http://localhost:5000/api/customer/updateCart"

          const details = {product: props.item.product._id,
             days: props.item.days,
             daily_quantity: count - 1,
             startDate : props.item.startDate,
             checkStat : props.item.checkStat
            }

          const res = await axios.post(url, details)

          if (res.status === 200) {
            setItems(res.data.products)
            setIsLoading(false)
    setCount(count - 1)

          } else {
              alert(res.status)
          }
      } catch (error) {
          console.log(error)
          alert(error.response.data.error);
      }
    
    setEditting(false) 
    // setTimeout(() => setEditting(false), 100)

    props.count(count - 1, props.item.product._id)
  }

  async function handleRemoveProduct(){
    setOpen(false)
    setEditting(true)
      
    try {
      const url = "http://localhost:5000/api/customer/removeFromCart"

      const details = {product: props.item.product._id
        }

      const res = await axios.post(url, details)

      if (res.status === 200) {
        setItems(res.data.products)
        setIsLoading(false)
      } else {
          alert(res.status)
      }
  } catch (error) {
      console.log(error)
      alert(error.response.data.error);
  }

setEditting(false) 
// window.location.reload()
props.delete(props.item.product._id)
    
  }

  async function handleDelete(){
    setOpen(true)
   
  }

  let src = ""
  let srcSet = ""

  // props.item.product.name

  if (props.item.product.name === "Milk") {
    src="https://thumbs.dreamstime.com/b/milk-juice-beverages-carton-package-blank-white-drink-over-black-background-excellent-vector-illustration-eps-50687533.jpg"
    srcSet="https://thumbs.dreamstime.com/b/milk-juice-beverages-carton-package-blank-white-drink-over-black-background-excellent-vector-illustration-eps-50687533.jpg&dpr=2 2x"
  }
  else if (props.item.product.name === "Eggs") {
    src = "https://draxe.com/wp-content/uploads/2017/08/Are-Eggs-Dairy_THUMBNAIL.jpg"
  }
  else if (props.item.product.name === "Paneer") {
    src = "https://cdn.shopify.com/s/files/1/0017/9234/4153/products/paneer1_500x.jpg?v=1593586837"
    srcSet = "https://cdn.shopify.com/s/files/1/0017/9234/4153/products/paneer1_500x.jpg?v=1593586837&dpr=2 2x"}
  else
  {
    src = "https://www.dairyfarm.co.in/theme/images/ourfarm3.webp"
  }

  let a = props.item.product.price.$numberDecimal
  let b = props.item.product.discount.$numberDecimal
  let discountedprice = a - (a * b / 100)


  const handleAddToCart = async () => {
    setOpen(false)
    setAddingStat(true)
    let arrayOfdays = []
    for (let i = 0; i < dayStat.length; i++) {
      if (dayStat[i] === true) {
        arrayOfdays.push(days[i])
      }}

      setOpen2(false)

    try {
      const url = "http://localhost:5000/api/customer/updateCart"
      const details = {product: props.item.product._id, 
        daily_quantity: props.item.daily_quantity,
        startDate: props.item.startDate,
        checkStat: props.item.checkStat,
         days: arrayOfdays}
      const res = await axios.post(url, details)
      if (res.status === 200) {
        setAddingStat(false)
      }

    } catch (error) {
      console.log(error)
      alert("Please try again later")
    }

    props.days(arrayOfdays, props.item.product._id)
    
  }

  const updateCheckStat = async (item) => {
    // setChanging(true)
    const check = await props.check(item)
    
    setCheckStat(check)

    // setChanging(false)
  }

  return (
    
    <Card
      variant="outlined"
      orientation="horizontal"
      // disabled={editting}

      sx={{
        width: 750,
        height: 235,
        gap: 2,
        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
        // opacity: editting ? 0.5 : 1, // Set opacity to 0.5 when editing is true
        // transition: editting ? 'opacity 0s' : 'none', // Add a CSS transition when editing is true
      }}
    >
        <Checkbox 
        defaultChecked={checkStat}
        onClick = {() => {updateCheckStat(props.item)}}
        />
      <AspectRatio ratio="1" sx={{ width: 200 }}>
        <img
          src = {src}
          srcSet={srcSet}
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <div>
        <Typography level="h2" fontSize="lg" id="card-description" mb={0.5}>
          {props.item.product.name}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, py: 0.5 }}>  
        <Typography level="body3" sx={{ fontWeight: 'lg', color: 'text.secondary' }}>
        ₹{discountedprice} 
        </Typography>
       
        {
          (props.item.product.discount.$numberDecimal !== '0') && (
            <>
                   <Divider orientation="vertical" />
        <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary',textDecoration: 'line-through' }}>
        ₹ {props.item.product.price.$numberDecimal}
        </Typography>
            </>
          )
            
        }
          </Box>
        <Divider inset="context" />     
        <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          pt: 3,
          borderTop: '1px solid',
          borderColor: 'background.level1',
        }}
      >
        <IconButton
          size="sm"
          variant="outlined"
          onClick={handleCountSubtract}
          disabled={editting}
        >
          <Remove variant = "outlined"/>
        </IconButton>
        <Typography fontWeight="md" textColor="text.secondary">
          {count}
        </Typography>
        <IconButton
          size="sm"
          variant="outlined"
          onClick={handleCountAdd}
          disabled={editting}
        >
          <Add />
        </IconButton>
        <Divider orientation="vertical" />
        <Modal open={open} onClose={() => setOpen(false)} color="danger">
        
        <ModalDialog
          variant="outlined"
          role="alertdialog"
          aria-labelledby="alert-dialog-modal-title"
          aria-describedby="alert-dialog-modal-description"
          color = "danger"
        >
          <Typography
            id="alert-dialog-modal-title"
            component="h2"
            startDecorator={<WarningRoundedIcon />}
          >
            Confirmation
          </Typography>
          <Divider />
          <Typography id="alert-dialog-modal-description" textColor="text.tertiary">
            Are you sure you want to Remove this item?
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
            <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
              Cancel 
            </Button>
            <Button variant="outlined" color="danger" onClick={handleRemoveProduct}>
              Remove
            </Button>
          </Box>
        </ModalDialog>
      </Modal>

        <Chip
        variant="outlined"
        color="danger"
        onClick={handleDelete}
        disabled={editting}

        endDecorator={
          <ChipDelete
            color="danger"
            variant="plain"
          >
            <DeleteForever />
          </ChipDelete>
        }
      >
        Remove
      </Chip>
      <Divider orientation="vertical" />


        </Box>
      
       
      <br/>
      

        <Box sx={{ display: 'flex', gap: 5, py: 0 ,alignItems: 'center'}}>
        <Typography level="h5" fontSize="sm" id="card-description" mb={0}>
          Subscription Type
        </Typography>
        <Divider orientation="vertical" />

        <Button
                variant="outlined"
                color="primary"
                size = "sm"
                startDecorator={< EditIcon/>}
                onClick={() => {setOpen2(true)}}
                disabled={addingStat}
              >
                Edit
              </Button>
              {/* <Button variant="soft">Soft</Button> */}
        
        </Box>

        

        <Divider inset="context" />

       

     
      <Box sx={{ display: 'flex', gap: 2, py: 1 }}>
          {
            props.item.days.map((day,index) => {
              return(
                <>
                <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
          {day.slice(0,3)}
        </Typography>
        <Divider orientation="vertical" />
                </>    )})}
          </Box>
        <br/>
        <br/>

<Modal open={open2} onClose={() => setOpen2(false)}>
          <ModalDialog
            aria-labelledby="basic-modal-dialog-title"
            aria-describedby="basic-modal-dialog-description"
            sx={{ width: 300 }}
          >
            <Typography textAlign={'center'} id="basic-modal-dialog-title" level="h2">
              {props.item.name}
            </Typography>
            <Box justifyContent="center">
              <Box sx={{ mt: 1.5, mb: 1.5, display: 'flex', gap: 0.5 }}>
                {days.map((day, index) => {
                  return (

                    <Chip
                      variant={dayStat[index] ? "outlined" : "filled"}
                      color={dayStat[index] ? "primary" : "neutral"}
                      checked={dayStat[index]}
                      onClick={() => {
                        const newDayStat = [...dayStat];
                        newDayStat[index] = !newDayStat[index];
                        setDayStat(newDayStat);
                      }}
                    >
                      {day[0]}
                    </Chip>
                  );
                })}
              </Box>
              <Button fullWidth type="submit" onClick={handleAddToCart} variant='outlined'>Edit Subscription Dates</Button>
            </Box>
          </ModalDialog>
        </Modal>
      </div>
    </Card>
  );
}