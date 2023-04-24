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

export default function MultipleInteractionCard() {
  return (
    <Card variant="outlined" 
    sx={{ width: 240 ,padding: 2.5 }}>
    
    {/*  sx={{ width: 220 }}> */}
      <CardOverflow>
        <AspectRatio ratio="1.5">
          <img
            src="https://as1.ftcdn.net/v2/jpg/01/77/73/20/1000_F_177732079_wudmALix7bzx6N7lMiuJE9ArqqOnnHWa.jpg?auto=format&fit=crop&w=318"
            srcSet="https://as1.ftcdn.net/v2/jpg/01/77/73/20/1000_F_177732079_wudmALix7bzx6N7lMiuJE9ArqqOnnHWa.jpg?auto=format&fit=crop&w=318&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
        <IconButton
          aria-label="Like minimal photography"
          size="md"
          variant="solid"
          color="primary"
          sx={{
            position: 'absolute',
            zIndex: 2,
            borderRadius: '50%',
            right: '1rem',
            bottom: -35,
            transform: 'translateY(50%)',
          }}
        >
          <ShoppingCartIcon />
        </IconButton>
      </CardOverflow>
      <Typography level="h2" sx={{ fontSize: 'md', mt: 2 }}>
        <Link href="#multiple-actions" overlay underline="none">
         Product Name
        </Link>
      </Typography>
      {/* <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
        <Link href="#multiple-actions"> $ Price</Link>
        <span sx={{ mx: 50 }}> | </span>
  <Typography component="span">Price 2</Typography>

      </Typography> */}

      <CardOverflow
        // variant="soft"
        sx={{
          display: 'flex',
          gap: 1.5,
          paddingBottom: 1.5,
          paddingTop:0.5

          
        }}
      >
        <Typography level="body2" sx={{ fontWeight: 'md', color: 'text.secondary', textDecoration: 'line-through' }}>
          price
        </Typography>
        <Divider orientation="vertical" />
        <Typography level="body2" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
          $price2
        </Typography>
      </CardOverflow>

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
        <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
          6.3k views
        </Typography>
        <Divider orientation="vertical" />
        <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' , textDecoration: 'line-through'}}>
          1 hour ago
        </Typography>
      </CardOverflow>
    </Card>
  );
}
