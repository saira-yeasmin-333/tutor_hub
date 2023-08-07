import React from 'react';
import { Checkbox, Menu, MenuItem, FormControlLabel } from '@mui/material';

const CheckboxMenu = ({ options, selectedItems, setSelectedItems }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event, value) => {
    if (selectedItems.includes(value)) {
        setSelectedItems(selectedItems.filter((item) => item !== value));
      } else {
        setSelectedItems([...selectedItems, value]);
      }
  };

  return (
    <div>
      {options.map((option) => (
          <MenuItem key={option} onClick={(event) => handleMenuItemClick(event, option)}>
            <Checkbox checked={selectedItems.includes(option)} />
            {option}
          </MenuItem>
        ))}
    </div>
  );
};

export default CheckboxMenu;
