// import * as React from 'react';
// import Box from '@mui/joy/Box';
// import Card from '@mui/joy/Card';
// import CardCover from '@mui/joy/CardCover';
// import CardContent from '@mui/joy/CardContent';
// import Typography from '@mui/joy/Typography';
// import IconButton from '@mui/joy/IconButton';

// // Icons import

// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';



// export default function Cards(){
//                return(
//                <Card
//                     sx={{
//                       '--Card-radius': (theme) => theme.vars.radius.sm,
//                       boxShadow: 'none',
//                       width: "100%",
//                       height: "100%",
//                     }}
//                   >
//                     <CardCover>
//                       <img
//                         alt=""
//                         src="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=774"
//                       />
//                     </CardCover>
//                     <CardCover
//                       sx={{
//                         background:
//                           'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.12))',
//                       }}
//                     />
//                     <CardContent
//                       sx={{
//                         mt: 'auto',
//                         flexGrow: 0,
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                       }}
//                     >
//                       <Box sx={{ flex: 1 }}>
//                         <Typography textColor="#fff">torres-del-paine.png</Typography>
//                         <Typography
//                           level="body3"
//                           mt={0.5}
//                           textColor="rgba(255,255,255,0.72)"
//                         >
//                           Added 5 Aug 2016
//                         </Typography>
//                       </Box>
//                       <IconButton variant="plain" color="neutral" sx={{ color: '#fff' }}>
//                         <EditOutlinedIcon />
//                       </IconButton>
//                     </CardContent>
//                   </Card>
//                )
// }

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

import Badge from '@mui/joy/Badge';
import Box from '@mui/joy/Box';
// import IconButton from '@mui/joy/IconButton';
// import Typography from '@mui/joy/Typography';
// import Checkbox from '@mui/joy/Checkbox';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';


import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import Favorite from '@mui/icons-material/Favorite';

export default function InteractiveCard() {
  const [count, setCount] = React.useState(0);
  const [showZero, setShowZero] = React.useState(false);
  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        width: 750,
        height: 235,
        gap: 2,
        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
        ml: 7
      }}
    >
      <Checkbox />

      <AspectRatio ratio="1" sx={{ width: 200 }}>
        <img
          src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
          srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <div>
        <Typography level="h2" fontSize="lg" id="card-description" mb={0.5}>
          Product Name
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, py: 0.5 }}>

<Typography level="body3" sx={{ fontWeight: 'lg', color: 'text.secondary' }}>
          $xx
        </Typography>
        <Divider orientation="vertical" />
        <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary',textDecoration: 'line-through' }}>
          $ xxx
        </Typography>
          </Box>

       
        {/* <Typography fontSize="sm" aria-describedby="card-description" mb={1}>
          <Link
            overlay
            underline="none"
            href="#interactive-card"
            sx={{ color: 'text.tertiary' }}
          >
            California, USA
          </Link>
        </Typography> */}
        
    
        {/* <Chip
          variant="outlined"
          color="primary"
          size="sm"
          sx={{ pointerEvents: 'none' }}
        >
          Cool weather all day long
        </Chip> */}
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
          onClick={() => setCount((c) => c - 1)}
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
        <Divider orientation="vertical" />
        <Chip
        variant="outlined"
        color="danger"
        onClick={() => alert('You clicked the chip!')}
        endDecorator={
          <ChipDelete
            color="danger"
            variant="plain"
            onClick={() => alert('You clicked the delete button!')}
          >
            <DeleteForever />
          </ChipDelete>
        }
      >
        Clear
      </Chip>
      <Divider orientation="vertical" />

      



        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
      
      {/* <Avatar size="sm" >M</Avatar>
      <Avatar size="sm" >Tu</Avatar>
      <Avatar size="sm" >W</Avatar>
      <Avatar size="sm" >Thur</Avatar>
      <Avatar size="sm" >F</Avatar>
      <Avatar size="sm" >Sat</Avatar>
      <Avatar size="sm" >Sun</Avatar> */}
    </Box>
       
      <br/>
        <Typography level="h5" fontSize="sm" id="card-description" mb={0.5}>
          Subscription Type
        </Typography>
        <Divider inset="context" />

        <Box sx={{ display: 'flex', gap: 2, py: 1 }}>

<Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
          Monthly
        </Typography>
        <Divider orientation="vertical" />
        <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
          Weekly
        </Typography>
        <Divider orientation="vertical" />
        <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
          Choose days in week
        </Typography>
          </Box>

        <br/>
        <br/>


      {/* <CardOverflow
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
          Discounted Price
        </Typography>
        <Divider orientation="vertical" />
        <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' , textDecoration: 'line-through'}}>
          Actual price
        </Typography>
      </CardOverflow> */}
      </div>
    </Card>
  );
}