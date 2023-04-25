import * as React from 'react';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import Sheet from '@mui/joy/Sheet';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import Avatar from '@mui/joy/Avatar';
import IconButton from '@mui/joy/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function MultipleInteractionCard(props) {

    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];

    const getNextDay = (listDays) => {
        const tom = new Date().getDay();
        let thisDay;
        for (var i = 0; i<7; i++) {
            thisDay = days[(i + tom)%7];
            if (listDays.includes(thisDay))
                return thisDay;
        }
        if (!listDays) return null
        return listDays[0]
    }

    return (
        <Sheet
            component="li"
            variant="outlined"
            sx={{
                borderRadius: 'sm',
                p: 2,
                listStyle: 'none',
            }}
        >
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Avatar
                    src="https://as1.ftcdn.net/v2/jpg/01/77/73/20/1000_F_177732079_wudmALix7bzx6N7lMiuJE9ArqqOnnHWa.jpg?auto=format&fit=crop&w=318"
                    srcSet="https://as1.ftcdn.net/v2/jpg/01/77/73/20/1000_F_177732079_wudmALix7bzx6N7lMiuJE9ArqqOnnHWa.jpg?auto=format&fit=crop&w=318&dpr=2 2x"
                    sx={{ borderRadius: 'sm' }}
                />
                <Typography level="h4">{props.item.product.name}</Typography>
                <IconButton variant="outlined" color="danger" size="sm"
                    sx={{ marginLeft: 'auto' }}
                    onClick={() => { props.delete(props.item._id)}}
                >
                    <DeleteIcon />
                </IconButton>
            </Box>
            <Divider component="div" sx={{ my: 2 }} />
            <List sx={{ '--ListItemDecorator-size': '48px' }}>
                <ListItem sx={{ alignItems: 'flex-start' }}>
                    <ListItemContent>
                        <Typography level="body2">Quantity - {props.item.daily_quantity}</Typography>
                        {/* <Typography level="body3">Dribbble</Typography> */}
                    </ListItemContent>
                    <Typography level="body2">Next Delivery day - {getNextDay(props.item.days)}</Typography>
                </ListItem>
            </List>
            {/* <Button
                size="sm"
                variant="plain"
                endDecorator={<KeyboardArrowRightRoundedIcon fontSize="small" />}
                sx={{ px: 1, mt: 1 }}
            >
                Expand
            </Button> */}
            <Divider component="div" sx={{ my: 2 }} />
            <Typography fontSize="sm">Days:</Typography>

            <Box sx={{ mt: 1.5, display: 'flex', gap: 1 }}>
                {props.item.days.map((day) => {
                    return (
                        <Chip
                            variant="soft"
                            color="neutral"
                            size="sm"
                            sx={{ borderRadius: 'sm' }}
                        >
                            {day}
                        </Chip>
                    );
                })}

            </Box>

        </Sheet>
    );
}
