import * as React from "react"
import JoyMenu from "@mui/joy/Menu"
import MenuItem from "@mui/joy/MenuItem"

function Menu({ control, menus, id }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const isOpen = Boolean(anchorEl)
  const buttonRef = React.useRef(null)
  const menuActions = React.useRef(null)

  const handleButtonClick = event => {
    if (isOpen) {
      setAnchorEl(null)
    } else {
      setAnchorEl(event.currentTarget)
    }
  }

  const handleButtonKeyDown = event => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault()
      setAnchorEl(event.currentTarget)
      if (event.key === "ArrowUp") {
        menuActions.current?.highlightLastItem()
      }
    }
  }

  const close = () => {
    setAnchorEl(null)
    buttonRef.current.focus()
  }

  return (
    <React.Fragment>
      {React.cloneElement(control, {
        type: "button",
        onClick: handleButtonClick,
        onKeyDown: handleButtonKeyDown,
        ref: buttonRef,
        "aria-controls": isOpen ? id : undefined,
        "aria-expanded": isOpen || undefined,
        "aria-haspopup": "menu"
      })}
      <JoyMenu
        id={id}
        placement="bottom-end"
        actions={menuActions}
        open={isOpen}
        onClose={close}
        anchorEl={anchorEl}
        sx={{ minWidth: 120 }}
      >
        {menus.map(({ label, active, ...item }) => {
          const menuItem = (
            <MenuItem
              selected={active}
              variant={active ? "soft" : "plain"}
              onClick={close}
              {...item}
            >
              {label}
            </MenuItem>
          )
          if (item.href) {
            return (
              <li key={label} role="none">
                {React.cloneElement(menuItem, { component: "a" })}
              </li>
            )
          }
          return React.cloneElement(menuItem, { key: label })
        })}
      </JoyMenu>
    </React.Fragment>
  )
}

export default Menu
