import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { utilsData } from '../../utils/utilsData';
import LogoutBtn from '../LogOut';
import { ArrowDown } from '../../icons';

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <span className="flex gap-2 justify-center items-center text-stone-300 capitalize text-2xl">
          {localStorage.getItem('userName')}
          <ArrowDown />
        </span>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        className="mt-1 ml-12"
      >
        <MenuItem onClick={handleClose}>
          <LogoutBtn />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
