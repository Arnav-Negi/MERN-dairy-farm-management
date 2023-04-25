import * as React from 'react';
import axios from 'axios';

import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Box from '@mui/joy/Box';
import Grid from '@mui/joy/Grid';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Divider from '@mui/joy/Divider';
import Sheet from '@mui/joy/Sheet';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator/ListItemDecorator';
import Chip from '@mui/joy/Chip/Chip';
import {useNavigate} from 'react-router-dom';

// Icons import
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded';
import MenuIcon from '@mui/icons-material/Menu';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close';
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';

// custom
import filesTheme from '../../assets/theme/cartTheme';
import Menu from '../Menu';
import Layout from '../Layout';
import Navigation from '../Navigation';
import Cards from './Card';
import ColorSchemeToggle from '../../utils/ColorSchemeToggle';


export default function FilesExample() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [num, setNo_of_items] = React.useState(0);
  const [cartdata, setCartData] = React.useState([]);
  const navigate = useNavigate();

  async function handleCheck(product) {
    console.log(product)
    let a = product.product.price.$numberDecimal
    let b = product.product.discount.$numberDecimal
    let cost = a - (a * b / 100)
    let totalCost = cost * product.daily_quantity * product.days.length
    try {
      const url = "http://localhost:5000/api/customer/updateCart"

      const details = {
        product: product.product._id,
        days: product.days,
        daily_quantity: product.daily_quantity,
        startDate: product.startDate,
        checkStat: !product.checkStat
      }

      const res = await axios.post(url, details)

      if (res.status === 200) {
        // setItems(res.data.products)
        // setIsLoading(false)
      } else {
        alert(res.status)
      }
    } catch (error) {
      console.log(error)
      alert(error.response.data.error);
      window.location.reload();
    }
    setCartData((prev) => {
      return prev.map((item) => {
        if (item.product._id === product.product._id) {
          return {
            ...item,
            checkStat: !item.checkStat
          }
        }
        return item
      })
    })
    setTotalPrice((prev) => {
      if (product.checkStat === true) {
        return prev - totalCost
      }
      else {
        return prev + totalCost
      }
    })
    setNo_of_items((prev) => {
      if (product.checkStat === true) {
        return prev - product.daily_quantity
      }
      else {
        return prev + product.daily_quantity
      }
    })
  }

  const handleCount = (count, id) => {
    setCartData((prev) => {
      return prev.map((item) => {
        if (item.product._id === id) {
          setTotalPrice((prev) => {
            let a = item.product.price.$numberDecimal
            let b = item.product.discount.$numberDecimal
            let cost = a - (a * b / 100)
            let totalCost = cost * count * item.days.length
            if (item.checkStat === true) {
              return prev - cost * item.daily_quantity * item.days.length + totalCost
            }
          else return prev})
            if (item.checkStat === true) {
              setNo_of_items((prev) => {
                return prev - item.daily_quantity + count
              })
            }
          return {
            ...item,
            daily_quantity: count
          }
        }
        return item
      })
    })
  }

  const handleDays = (days, id) => {
    setCartData((prev) => {
      return prev.map((item) => {
        if (item.product._id === id) {
          setTotalPrice((prev) => {
            let a = item.product.price.$numberDecimal
            let b = item.product.discount.$numberDecimal
            let cost = a - (a * b / 100)
            let totalCost = cost * item.daily_quantity * days.length
            if (item.checkStat === true) {
              return prev - cost * item.daily_quantity * item.days.length + totalCost
            }
          else return prev})
          return {
            ...item,
            days: days
          }
        }
        return item
      })
    })
  }

  const handleDelete = (id) => {
    setCartData((prev) => {
      return prev.filter((item) => {
        if (item.product._id === id) {
          setTotalPrice((prev) => {
            let a = item.product.price.$numberDecimal
            let b = item.product.discount.$numberDecimal
            let cost = a - (a * b / 100)
            let totalCost = cost * item.daily_quantity * item.days.length
            if (item.checkStat === true) {
              return prev - totalCost
            }
          else return prev})
          if (item.checkStat === true) {
            setNo_of_items((prev) => {
              return prev - item.daily_quantity
            })
          }
        }
        return item.product._id !== id
      })
    })
  }

  async function handleAddSubscription(){
    try {
      const url = "http://localhost:5000/api/customer/addSub"

      for (let i = 0; i < cartdata.length; i++) {
        if (cartdata[i].checkStat && cartdata[i].days.length > 0){
        const details = {product: cartdata[i].product._id,}
        const res = await axios.post(url, details)
        if (res.status === 200) {
          console.log(res.data)
        }
        else{
          console.log("Error")
        }
      }
      }
  } catch (error) {
      console.log(error)
      alert(error.response.data.error);
  }
  navigate("/customer/my-subscriptions");

  }

  React.useEffect(() => {
    const getData = async () => {
      try {
        const url = "http://localhost:5000/api/customer/getCart"
        const res = await axios.get(url)
        if (res.status === 200) {
          let totalprice = 0;
          let num = 0
          res.data.cart.map((product) => {
            if (product.checkStat === true) {
              totalprice += (product.product.price.$numberDecimal - ((product.product.price.$numberDecimal * product.product.discount.$numberDecimal) / 100)) * product.days.length * product.daily_quantity
              num += product.daily_quantity
            }
          })
          setTotalPrice(totalprice)
          setNo_of_items(num)
          setCartData(res.data.cart)
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



  console.log(cartdata)  

  if (isLoading) { return <div>Loading...</div> }
  return (
    <CssVarsProvider disableTransitionOnChange theme={filesTheme}>
      <CssBaseline />
      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <Navigation />
        </Layout.SideDrawer>
      )}
      <Layout.Root
        sx={{
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'minmax(64px, 200px) minmax(450px, 1fr)',
            md: 'minmax(160px, 40px) minmax(400px, 1fr)',
            lg: 'minmax(200px, 1000px) minmax(340px, 1fr)',
          },
          ...(drawerOpen && {
            height: '100vh',
            overflow: 'hidden',
          }),
        }}
      >
        <Layout.Header>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <IconButton
              variant="outlined"
              size="sm"
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            {/* <IconButton
              size="sm"
              variant="solid"
              sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
            >
              <FindInPageRoundedIcon />
            </IconButton> */}
            <Typography component="h1" fontWeight="xl">
              Shopping Cart
            </Typography>
          </Box>
          <Input
            size="sm"
            placeholder="Search anything…"
            startDecorator={<SearchRoundedIcon color="primary" />}
            endDecorator={
              <IconButton variant="outlined" size="sm" color="neutral">
                <Typography fontWeight="lg" fontSize="sm" textColor="text.tertiary">
                  /
                </Typography>
              </IconButton>
            }
            sx={{
              flexBasis: '400px',
              display: {
                xs: 'none',
                sm: 'flex',
                // marginRight: 100
              },
            }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5 }}>
            <ColorSchemeToggle />
          </Box>
        </Layout.Header>
        <Layout.Main>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1250px))',
              gap: 2,
              justifyContent: 'flex-end',
            }}
          >



            <Grid container sx={{ height: "100%" }} spacing={2}>
              {
                cartdata.map((item, index) => {
                  return (
                    <Grid item sx={{ mb: 2 }} xs={12} sm={6} md={4} lg={12}>
                      <Cards
                        item={item}
                        check={handleCheck}
                        count={handleCount}
                        days={handleDays}
                        delete={handleDelete}
                      />
                    </Grid>
                  )
                })
              }


            </Grid>
          </Box>
        </Layout.Main>
        <Sheet
          // key={index}
          component="li"
          variant="outlined"
          sx={{
            borderRadius: 'sm',
            p: 2,
            listStyle: 'none',
            mr: 2,
            marginTop: 2,
            justifyContent: 'flex-end',
            // height: '100%',
            //autofit height to content
            height: 'fit-content',
          }}
        >
          <Box sx={{ display: 'flex', gap: 2 }}>
            <ShoppingBagIcon
              sx={{ borderRadius: 'lg', marginTop: 1, marginLeft: 1, }}

            />
            <Box>
              <Typography sx={{ marginTop: 1 }}>
                Subtotal ({num} Items) : </Typography>
            </Box>
          </Box>
          <Divider component="div" sx={{ my: 2 }} />
          <List sx={{ '--ListItemDecorator-size': '48px' }}>

            {
              cartdata.map((item, index) => {
                let src = ""
                let srcSet = ""
                if (item.product.name === "Milk") {
                  src="https://thumbs.dreamstime.com/b/milk-juice-beverages-carton-package-blank-white-drink-over-black-background-excellent-vector-illustration-eps-50687533.jpg"
                  srcSet="https://thumbs.dreamstime.com/b/milk-juice-beverages-carton-package-blank-white-drink-over-black-background-excellent-vector-illustration-eps-50687533.jpg&dpr=2 2x"
                }
                else if (item.product.name === "Eggs") {
                  src = "https://draxe.com/wp-content/uploads/2017/08/Are-Eggs-Dairy_THUMBNAIL.jpg"
                }
                else if (item.product.name === "Paneer") {
                  src = "https://cdn.shopify.com/s/files/1/0017/9234/4153/products/paneer1_500x.jpg?v=1593586837"
                  srcSet = "https://cdn.shopify.com/s/files/1/0017/9234/4153/products/paneer1_500x.jpg?v=1593586837&dpr=2 2x"}
                else
                {
                  src = "https://www.dairyfarm.co.in/theme/images/ourfarm3.webp"
                }




                if (item.checkStat === true && item.days.length > 0)
                  return (
                    <ListItem sx={{ alignItems: 'flex-start' }}>
                      <ListItemDecorator>
                        <Avatar
                          size="sm"
                          src={src}
                          sx={{ backgroundColor: 'background.body', marginRight: 2 }}
                        />
                      </ListItemDecorator>
                      <ListItemContent>
                        <Typography fontSize="sm" sx={{ marginTop: 1 }}>{item.product.name}</Typography>
                        {/* <Typography level="body3">Pinterest</Typography> */}
                      </ListItemContent>
                      <Typography level="body2" sx={{ marginTop: 1 }}>₹{(item.product.price.$numberDecimal - ((item.product.price.$numberDecimal * item.product.discount.$numberDecimal) / 100)) * item.days.length * item.daily_quantity}</Typography>
                    </ListItem>
                  )
              })
            }
          </List>
          {/* <Button
                  size="sm"
                  variant="plain"
                  endDecorator={<KeyboardArrowRightRoundedIcon fontSize="small" />}
                  sx={{ px: 1, mt: 1 }}
                >
                  Expand
                </Button> */}

          {/* <Divider component="div" sx={{ my: 2 }} /> */}
          {/* <Typography fontSize="sm">Skills tags:</Typography>

          <Box sx={{ mt: 1.5, display: 'flex', gap: 1 }}>
            <Chip
              variant="outlined"
              color="neutral"
              size="sm"
              sx={{ borderRadius: 'sm' }}
            >
              UI design
            </Chip>
            <Chip
              variant="outlined"
              color="neutral"
              size="sm"
              sx={{ borderRadius: 'sm' }}
            >
              Illustration
            </Chip>
          </Box> */}
          <Divider component="div" sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>

            <Button variant="outlined" endDecorator={<KeyboardArrowRight />} color="success"
              onClick={handleAddSubscription}
            >
              Checkout
            </Button>
            <Typography level="body2" sx={{ marginLeft: 7, marginTop: 1 ,fontWeight:'lg' }}>Total: ₹{totalPrice}</Typography>

          </Box>
        </Sheet>
      </Layout.Root>
    </CssVarsProvider>
  );
}
