import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Favorite from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from 'axios';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import Chip from '@mui/joy/Chip';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import ModalClose from '@mui/joy/ModalClose';

export default function MultipleInteractionCard(props) {

  const [open, setOpen] = React.useState(false)
  const [count, setCount] = React.useState(1)
  const [dayStat, setDayStat] = React.useState([false, false, false, false, false, false, false])
  const [addingStat, setAddingStat] = React.useState(false)
  const [open2, setOpen2] = React.useState(false);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]


  let a = props.item.price.$numberDecimal
  let b = props.item.discount.$numberDecimal
  let discountedprice = a - (a * b / 100)


  const handleAddToCart = async () => {
    setOpen(false)
    setAddingStat(true)
    let arrayOfdays = []
    for (let i = 0; i < dayStat.length; i++) {
      if (dayStat[i] === true) {
        arrayOfdays.push(days[i])
      }}
    console.log(props)
    try {
      const url = "http://localhost:5000/api/customer/addToCart"
      const details = {product: props.item._id, daily_quantity: count, days: arrayOfdays, startDate: Date.now(), checkStat: false}
      const res = await axios.post(url, details)
      if (res.status === 200) {
        // alert("Added to Cart")
        setOpen2(true)
        setAddingStat(false)
      }

    } catch (error) {
      console.log(error)
      alert("Error adding to cart")
    }
  }

  let src = ""
  let srcSet = ""

  if (props.item.name === "Milk") {
    src="https://thumbs.dreamstime.com/b/milk-juice-beverages-carton-package-blank-white-drink-over-black-background-excellent-vector-illustration-eps-50687533.jpg"
    srcSet="https://thumbs.dreamstime.com/b/milk-juice-beverages-carton-package-blank-white-drink-over-black-background-excellent-vector-illustration-eps-50687533.jpg&dpr=2 2x"
  }
  else if (props.item.name === "Eggs") {
    src = "https://draxe.com/wp-content/uploads/2017/08/Are-Eggs-Dairy_THUMBNAIL.jpg"
  }
  else if (props.item.name === "Paneer") {
    src = "https://cdn.shopify.com/s/files/1/0017/9234/4153/products/paneer1_500x.jpg?v=1593586837"
    srcSet = "https://cdn.shopify.com/s/files/1/0017/9234/4153/products/paneer1_500x.jpg?v=1593586837&dpr=2 2x"}
  else
  {
    src = "https://www.dairyfarm.co.in/theme/images/ourfarm3.webp"
  }

  let textDecoration = "line-through"

  if (props.item.discount.$numberDecimal === "0") {
    textDecoration = "none"
  }
  return (
    <>
      <React.Fragment>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog
            aria-labelledby="basic-modal-dialog-title"
            aria-describedby="basic-modal-dialog-description"
            sx={{ width: 300 }}
          >
            <Typography textAlign={'center'} id="basic-modal-dialog-title" level="h2">
              {props.item.name}
            </Typography>
            <Box justifyContent="center">
              <Box
                justifyContent={'center'}
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
                  onClick={() => setCount((c) => c > 1 ? c - 1 : 1)}
                >
                  <Remove />
                </IconButton>

                <Typography fontWeight="md" textColor="text.secondary">
                  {count}
                </Typography>
                <IconButton
                  size="sm"
                  variant="outlined"
                  onClick={() => setCount((c) => c + 1)}
                >
                  <Add />
                </IconButton>
              </Box>

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
              <Button variant='outlined' fullWidth type="submit" onClick={handleAddToCart} >Add</Button>
            </Box>
          </ModalDialog>
        </Modal>
      </React.Fragment>
      <Card variant="outlined"
        sx={{ width: 240, padding: 2 }}>
        {/*  sx={{ width: 220 }}> */}
        <CardOverflow>
          <AspectRatio ratio="1.5">
            <img
              src={src}
              srcSet={srcSet}
              loading="lazy"
              alt=""
            />
          </AspectRatio>
          <IconButton
            aria-label="Like minimal photography"
            size="md"
            variant="outlined"
            color="primary"
            sx={{
              position: 'absolute',
              zIndex: 2,
              borderRadius: '50%',
              right: '0.2rem',
              bottom: -35,
              transform: 'translateY(50%)',
              marginRight: 0,
            }}
            onClick={() => {setOpen(true)}}
            disabled={addingStat}
          >
            <ShoppingCartIcon />
          </IconButton>
        </CardOverflow>
        <Typography level="h2" sx={{ fontSize: 'md', mt: 2 }}>
          {props.item.name}
        </Typography>

        <Typography level="body2" sx={{ fontSize: 'sm' ,mb:2}}>
          {props.item.description}
        </Typography>

        {/* <CardOverflow
          // variant="soft"
          sx={{
            display: 'flex',
            gap: 1.5,
            paddingBottom: 1.5,
            paddingTop: 0.5
          }}
        >
          <Typography level="body2" sx={{ fontWeight: 'md', color: 'text.secondary', textDecoration: 'line-through' }}>
            ${" "}{props.item.price.$numberDecimal}
          </Typography>
          <Divider orientation="vertical" />
          <Typography level="body2" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
            ${" "}{discountedprice}
          </Typography>
        </CardOverflow> */}

        <Divider inset="context" />
        <CardOverflow
          variant="soft"
          sx={{
            display: 'flex',
            gap: 1.5,
            py: 1.5,
            px: 'var(--Card-padding)',
            bgcolor: 'background.level1',
          }}
        >
          <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary', 
          textDecoration: textDecoration
         }}>
          ₹{" "}{props.item.price.$numberDecimal}
          </Typography>

          {
            (props.item.discount.$numberDecimal !== "0") && (
              <>
          <Divider orientation="vertical" />
              
              <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
              ₹{" "}{discountedprice}
              </Typography>
              </>
            )
          }

          {/* <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
          ${" "}{discountedprice}
          </Typography> */}
        </CardOverflow>
      </Card>
      <Modal
        aria-labelledby="close-modal-title"
        open={open2}
        onClose={(_event, reason) => {
          // alert(`Reason: ${reason}`);
          setOpen2(false);
        }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            minWidth: 300,
            borderRadius: 'md',
            p: 3,
          }}
        >
          <ModalClose variant="outlined" />
          <Typography
            component="h2"
            id="close-modal-title"
            level="h6"
            textColor="inherit"
            fontWeight="sm"
          >
            Added to Cart
          </Typography>
        </Sheet>
      </Modal>
    </>
  );
}
