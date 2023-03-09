import * as React from "react"
import Box from "@mui/joy/Box"
import Button from "@mui/joy/Button"
import Checkbox from "@mui/joy/Checkbox"
import FormControl from "@mui/joy/FormControl"
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel"
import Link from "@mui/joy/Link"
import Input from "@mui/joy/Input"
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography } from "@mui/joy"
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import axios from 'axios'
import Root from "../../url"

export default function SignIn() {

  const [lstate, setlstate] = React.useState(false)

  const [RegDisable, setRegDisable] = React.useState(true);

  const [open2, setOpen2] = React.useState('');
  const [open3, setOpen3] = React.useState('');

  let { state } = useLocation()

  const navigate = useNavigate()

  function handleload() {
    setlstate(true)
  }


  const handleSubmit = async (event) => {
    event.preventDefault()
    handleload()
    const data = new FormData(event.currentTarget)
    try {
      const url = Root() + "/auth/login"
      const details = { email: data.get('email'), password: data.get('password'), type: state.user == "customer" ? 2 : 3 }
      const res = await axios.post(url, details)
      console.log(res.data)
      if (res.data.status === "OK") {
        console.log(res.data.info)
        navigate("/" + state.user)
      }
      else {
        setOpen2('center')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormControl required>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter your email"
            type="email"
            name="email"
          />
        </FormControl>
        <FormControl required>
          <FormLabel>Password</FormLabel>
          <Input placeholder="•••••••" type="password" name="password" />
        </FormControl>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          {/* <Checkbox
                  size="sm"
                  label="Remember for 30 days"
                  name="persistent"
                /> */}
          <Link fontSize="sm" href="#replace-with-a-link" fontWeight="lg">
            Forgot password
          </Link>
        </Box>
        <Button
          loading={lstate}
          type="submit"
          fullWidth>
          Submit
        </Button>
      </form>

      <Modal open={!!open2} onClose={() => {
        setOpen2('')
        setlstate(false)}}>
        <ModalDialog
          aria-labelledby="layout-modal-title"
          aria-describedby="layout-modal-description"
          layout={open2 || undefined}
          color="danger"
        >
          <ModalClose />
          <Typography id="layout-modal-title" component="h2">
            Invalid credentials!
          </Typography>
          <Typography id="layout-modal-description" textColor="text.tertiary">
            Sorry, we can't find an account with this email address. Please try again or create a new account.
          </Typography>
        </ModalDialog>
      </Modal>

    </>
  )
}