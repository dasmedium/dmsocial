import React from "react";
import { MenuItem, ListItemText } from "@material-ui/core/index";
import { Link } from "react-router-dom";

export default props => {
  const { primary, to } = props;
  return (
    <div>
      <MenuItem button component={Link} to={to}>
        <ListItemText primary={primary} />
      </MenuItem>
    </div>
  );
};
