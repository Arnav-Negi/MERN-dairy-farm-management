import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import IconButton from '@mui/joy/IconButton';
import Chip from '@mui/joy/Chip';
import Box from '@mui/joy/Box';

export default function BasicModalDialog() {
  const [open, setOpen] = React.useState(true);
  const [count, setCount] = React.useState(1)
  const [dayStat, setDayStat] = React.useState([false, false, false, false, false, false, false])
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  return (
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

              <Box sx={{ mt: 1.5, mb: 0.5, display: 'flex', gap: 0.5 }}>
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
              <Button fullWidth type="submit" onClick={handleAddToCart} >Add</Button>
            </Box>
          </ModalDialog>
        </Modal>
      </React.Fragment>
  );
}
