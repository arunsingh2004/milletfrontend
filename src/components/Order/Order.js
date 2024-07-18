import List from "@mui/material/List";
// import ListItem from '@mui/material/ListItem';
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MUIList from "@material-ui/core/List";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "./ListItem";
import "./ListItem.css";
import RatingInput from "../RatingInput";
import { TableCell } from "@mui/material";
import { TableRow } from "@material-ui/core";
import { Button } from "@mui/material";
const styles = {
  // list: {
  //     maxWidth: 600,
  //     margin: '0 auto'
  // }
};
const OrderList = ({ list }) => {
  //hook to render list only when panel actually expanded
  const [lists, setLists] = useState(list);
  useEffect(() => {
    if (list) {
      setLists(list);
    }
  }, [list]);

  return (
    <>
      <TableCell>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Image</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Price</TableCell>
        </TableRow>
        {lists?.products?.map((item) => {
          return <ListItem key={item.productId} item={item} />;
        })}
      </TableCell>
      <TableCell>
        <RatingInput />
      </TableCell>
      <TableCell>
        <Button>Add Review</Button>
      </TableCell>
      <TableCell>
        <Button>Reorder</Button>
      </TableCell>
    </>
  );
};

List.propTypes = {
  list: PropTypes.object.isRequired,
  checkedItems: PropTypes.object,
  onCheckItem: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(OrderList);
