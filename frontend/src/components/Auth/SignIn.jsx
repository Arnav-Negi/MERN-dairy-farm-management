import * as React from "react"
import Box from "@mui/joy/Box"
import Button from "@mui/joy/Button"
import Checkbox from "@mui/joy/Checkbox"
import FormControl from "@mui/joy/FormControl"
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel"
import Link from "@mui/joy/Link"
import Input from "@mui/joy/Input"
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import Root from "../../url"

export default function SignIn() {

  let { state } = useLocation()
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    try {
      const url = Root() + "/login"
      const details = { email: data.get('email'), password: data.get('password'), type: state.user == "customer" ? 2 : 3 }
      const res = await axios.post(url, details)
      if (res.data.status === "OK") {
        console.log(res.data.info)
      }
      else {
        alert(res.data.status)
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
        <Button type="submit" fullWidth>
          Submit
        </Button>
      </form>
    </>
  )
}