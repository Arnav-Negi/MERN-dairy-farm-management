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

export default function MultipleInteractionCard() {
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
                    src="https://i.pravatar.cc/40?img=6"
                    srcSet="https://i.pravatar.cc/80?img=6 2x"
                    sx={{ borderRadius: 'sm' }}
                />
                <Box>
                    <Typography>Andrew Smith</Typography>
                    <Typography level="body3">UI Designer</Typography>
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
                                height: '100%',
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
                        <Typography fontSize="sm">Senior designer</Typography>
                        <Typography level="body3">Dribbble</Typography>
                    </ListItemContent>
                    <Typography level="body2">2015-now</Typography>
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
                        <Typography fontSize="sm">Designer</Typography>
                        <Typography level="body3">Pinterest</Typography>
                    </ListItemContent>
                    <Typography level="body2">2012-2015</Typography>
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
            <Divider component="div" sx={{ my: 2 }} />
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
            </Box>
        </Sheet>
    );
}
