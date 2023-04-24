import * as React from 'react';
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
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Icons import
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded';
import MenuIcon from '@mui/icons-material/Menu';
import BookRoundedIcon from '@mui/icons-material/BookRounded';

// custom
import filesTheme from '../../assets/theme/cartTheme';
import Menu from '../../utils/Menu';
import Layout from '../../utils/Layout';
import Navigation from '../../utils/Navigation';
import Item from './Item';
// import FirstSidebar from './components/SideBar';

function ColorSchemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="neutral" />;
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="outlined"
      color="neutral"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

export default function FilesExample() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true)
  const [items, setItems] = React.useState({});
  const vendorDetails = JSON.parse(window.localStorage.getItem('vendorDetails'))

  const { id } = useParams();
  React.useEffect(() => {
    const getData = async () => {
      try {
        const url = "http://localhost:5000/api/general/getProducts"
        const details = {vendor: id}
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
    }
    getData();
  }, [])

  if (isLoading) return (<div>Loading...</div>)
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
            md: 'minmax(160px, 400px) minmax(400px, 1fr)',
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
              flexBasis: '500px',
              display: {
                xs: 'none',
                sm: 'flex',
              },
            }}
          />
            <ColorSchemeToggle />
        </Layout.Header>
        <Sheet
          sx={{
            display: { xs: 'none', sm: 'initial' },
            display: 'initial',
            borderLeft: '1px solid',
            borderColor: 'neutral.outlinedBorder',
          }}
        >
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ flex: 1 }}>{vendorDetails.dairyFarm.name}</Typography>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex' }}>
            <Button
              variant="soft"
              sx={{
                borderRadius: 0,
                borderBottom: '2px solid',
                borderColor: 'primary.solidBg',
                flex: 1,
                py: '1rem',
              }}
            >
              Details
            </Button>
          </Box>
          <AspectRatio ratio="21/9">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=774"
            />
          </AspectRatio>
          <Box
            sx={{
              gap: 2,
              p: 2,
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              '& > *:nth-child(odd)': { color: 'text.secondary' },
            }}
          >
            <Typography level="body2">Vendor Name</Typography>
            <Typography level="body2" textColor="text.primary">
              {vendorDetails.first_name} {vendorDetails.last_name}
            </Typography>

            <Typography level="body2">Email</Typography>
            <Typography level="body2" textColor="text.primary">
              {vendorDetails.emailID}
            </Typography>

            <Typography level="body2">Contact</Typography>
            <Typography level="body2" textColor="text.primary">
              {vendorDetails.phoneNumber}
            </Typography>

            <Typography level="body2">Address</Typography>
            <Typography level="body2" textColor="text.primary">
              {vendorDetails.address}
            </Typography>

            <Typography level="body2">Timings</Typography>
            <Typography level="body2" textColor="text.primary">
              {vendorDetails.dairyFarm.openingHours} - {vendorDetails.dairyFarm.closingHours}
            </Typography>

            <Typography level="body2">Working Days</Typography>
            <Typography level="body2" textColor="text.primary">
              {vendorDetails.workingDays.map((day) => {
                return day + " " + " "
                })}
            </Typography>

            <Typography level="body2">Established Date</Typography>
            <Typography level="body2" textColor="text.primary">
              {vendorDetails.dairyFarm.establishedDate.slice(0, 10)}
            </Typography>
          </Box>
        </Sheet>
        <Layout.Main>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1250px))',
              gap: 2,
            }}
          >
            <Box>
              <Grid container sx={{height:"100%"}} spacing={2}>
                {items.map((product) => {
                  return (
                    <Grid item sx={{mb: 2}} xs={12} sm={6} md={4} lg={4}>
                      <Item item={product} />
                    </Grid>
                  )
                })}
              </Grid>
            </Box>
          </Box>
        </Layout.Main>
      </Layout.Root>
    </CssVarsProvider>
  );
}
