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
import ListItemDecorator from '@mui/joy/ListItemDecorator/ListItemDecorator';
import Chip from '@mui/joy/Chip/Chip';

// Icons import
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded';
import MenuIcon from '@mui/icons-material/Menu';
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';

// custom
import filesTheme from '../../assets/theme/cartTheme';
import Menu from '../../utils/Menu';
import Layout from '../../utils/Layout';
import Navigation from '../../utils/Navigation';
import Cards from './Card';

function ColorSchemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="primary" />;
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="outlined"
      color="primary"
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
            lg: 'minmax(200px, 1000px) minmax(400px, 1fr)',
          },
          ...(drawerOpen && {
            height: '100vh',
            overflow: 'hidden',
          }),
        }}
      >
        
        <Layout.Main>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1250px))',
              gap: 2,
              justifyContent: 'flex-end',
            }}
          >
              <Grid container sx={{height:"100%"}} spacing={2}>
                <Grid item sx={{mb: 2}} xs={12} sm={6} md={4} lg={12}>
                  <Cards />
                </Grid>
                <Grid item sx={{mb: 2}} xs={12} sm={6} md={4} lg={12}>
                  <Cards />
                </Grid>
                <Grid item sx={{mb: 2}} xs={12} sm={6} md={4} lg={12}>
                  <Cards />
                </Grid>
                <Grid item sx={{mb: 2}} xs={12} sm={6} md={4} lg={12}>
                  <Cards />
                </Grid>
                <Grid item sx={{mb: 2}} xs={12} sm={6} md={4} lg={12}>
                  <Cards />
                </Grid>
                <Grid item sx={{mb: 2}} xs={12} sm={6} md={4} lg={12}>
                  <Cards />
                </Grid>
                <Grid item sx={{mb: 2}} xs={12} sm={6} md={4} lg={12}>
                  <Cards />
                </Grid>
                
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
                  mr: 5,
                  marginTop: 2,
                  justifyContent: 'flex-end',
                  // height: '100%',
                  //autofit height to content
                  height: 'fit-content',
                }}
              >
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {/* <Avatar
                    src="https://i.pravatar.cc/40?img=6"
                    srcSet="https://i.pravatar.cc/80?img=6 2x"
                    sx={{ borderRadius: 'sm' }}
                  /> */}
                  <ShoppingBagIcon 
                    sx={{ borderRadius: 'lg',marginTop: 1,marginLeft: 1, }}

                  />
                  <Box>
                    <Typography>Subtotal (XX Items)</Typography>
                    {/* <Typography level="body3">UI Designer</Typography> */}
                  </Box>
                </Box>
                <Divider component="div" sx={{ my: 2 }} />
                <List sx={{ '--ListItemDecorator-size': '48px' }}>
                  <ListItem sx={{ alignItems: 'flex-start' }}>
                    <ListItemDecorator
                      sx={{
                        '&:before': {
                          content: '""',
                          position: 'absolute',
                          height: '10%',
                          width: '2px',
                          bgcolor: 'divider',
                          left: 'calc(var(--ListItem-paddingLeft) + 15px)',
                          top: '50%',
                        },
                      }}
                    >
                      <Avatar
                        size="sm"
                        src="https://www.vectorlogo.zone/logos/dribbble/dribbble-icon.svg"
                      />
                    </ListItemDecorator>
                    <ListItemContent>
                      <Typography fontSize="sm">Product 1</Typography>
                      {/* <Typography level="body3">Dribbble</Typography> */}
                    </ListItemContent>
                    <Typography level="body2">$XX</Typography>
                  </ListItem>
                  <ListItem sx={{ alignItems: 'flex-start' }}>
                    <ListItemDecorator>
                      <Avatar
                        size="sm"
                        src="https://www.vectorlogo.zone/logos/pinterest/pinterest-icon.svg"
                        sx={{ backgroundColor: 'background.body' }}
                      />
                    </ListItemDecorator>
                    <ListItemContent>
                      <Typography fontSize="sm">Product 2</Typography>
                      {/* <Typography level="body3">Pinterest</Typography> */}
                    </ListItemContent>
                    <Typography level="body2">$XX</Typography>
                  </ListItem>
                </List>
                <Button
                  size="sm"
                  variant="plain"
                  endDecorator={<KeyboardArrowRightRoundedIcon fontSize="small" />}
                  sx={{ px: 1, mt: 1 }}
                >
                  Expand
                </Button>

                {/* <Divider component="div" sx={{ my: 2 }} />
                <Typography fontSize="sm">Skills tags:</Typography>
                
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
      
      <Button variant="soft" endDecorator={<KeyboardArrowRight />} color="success">
        Checkout
      </Button>
      <Typography
      sx={{
        marginLeft: 18
      }}
      >
        $xx
      </Typography>
    </Box>
              </Sheet>
        {/* <Sheet
          sx={{
            // display: { xs: 'none', sm: 'initial' },
            display: 'initial',
            borderLeft: '1px solid',
            borderColor: 'neutral.outlinedBorder',
          }}
        >
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
          </Box> */}

          


          {/* <AspectRatio ratio="21/9">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=774"
            />
          </AspectRatio> */}
          {/* <Box sx={{ p: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
            <Typography level="body2" mr={1}>
              Shared with
            </Typography>
            <AvatarGroup size="sm" sx={{ '--Avatar-size': '24px' }}>
              <Avatar
                src="https://i.pravatar.cc/24?img=6"
                srcSet="https://i.pravatar.cc/48?img=6 2x"
              />
              <Avatar
                src="https://i.pravatar.cc/24?img=7"
                srcSet="https://i.pravatar.cc/48?img=7 2x"
              />
              <Avatar
                src="https://i.pravatar.cc/24?img=8"
                srcSet="https://i.pravatar.cc/48?img=8 2x"
              />
              <Avatar
                src="https://i.pravatar.cc/24?img=9"
                srcSet="https://i.pravatar.cc/48?img=9 2x"
              />
            </AvatarGroup>
          </Box> */}
          {/* <Divider />
          <Box
            sx={{
              gap: 2,
              p: 2,
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              '& > *:nth-child(odd)': { color: 'text.secondary' },
            }}
          >
            <Typography level="body2">Type</Typography>
            <Typography level="body2" textColor="text.primary">
              Image
            </Typography>

            <Typography level="body2">Size</Typography>
            <Typography level="body2" textColor="text.primary">
              3,6 MB (3,258,385 bytes)
            </Typography>

            <Typography level="body2">Storage used</Typography>
            <Typography level="body2" textColor="text.primary">
              3,6 MB (3,258,385 bytes)
            </Typography>

            <Typography level="body2">Location</Typography>
            <Typography level="body2" textColor="text.primary">
              Travel pictures
            </Typography>

            <Typography level="body2">Owner</Typography>
            <Typography level="body2" textColor="text.primary">
              Michael Scott
            </Typography>

            <Typography level="body2">Modified</Typography>
            <Typography level="body2" textColor="text.primary">
              26 October 2016
            </Typography>

            <Typography level="body2">Created</Typography>
            <Typography level="body2" textColor="text.primary">
              5 August 2016
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ py: 2, px: 1 }}>
            <Button variant="plain" size="sm" endDecorator={<EditOutlinedIcon />}>
              Add a description
            </Button>
          </Box>
        </Sheet> */}
      </Layout.Root>
    </CssVarsProvider>
  );
}
