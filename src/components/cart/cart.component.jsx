import React from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";

import { toggleCartHidden } from "../../redux/cart/cart.actions";

import {
  selectCartItemsCount,
  selectCartItems,
} from "../../redux/cart/cart.selectors";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

const Cart = ({ toggleCartHidden, history, cartItems, itemCount }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton
        aria-describedby={id}
        aria-label="show 4 new mails"
        color="inherit"
        variant="contained"
        onClick={handleClick}
      >
        <Badge badgeContent={itemCount} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      {/*
      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        <ShoppingCartIcon />
      </Button>
    */}
      <Popover
        // style={{ height: "340px" }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div style={{ height: "340px", display: "flex", overflow: "scroll" }}>
          <List className={classes.root} style={{}}>
            {cartItems.length ? (
              cartItems.map((cartItem) => {
                console.log("cartItem");
                console.log(cartItem);
                return (
                  <React.Fragment key={cartItem.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt="Cindy Baker" src={cartItem.imageUrl} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={cartItem.name}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              className={classes.inline}
                              color="textPrimary"
                            >
                              {" "}
                            </Typography>
                            {cartItem.quantity} x ${cartItem.price}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                );
              })
            ) : (
              <ListItem key="0x" alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Your cart is empty"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        'Your cart is empty'
                      </Typography>
                      {"."}
                    </React.Fragment>
                  }
                />
              </ListItem>
            )}
          </List>
        </div>
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              history.push("/checkout");
              // dispatch(toggleCartHidden());
            }}
          >
            Go to checkout
          </Button>
        </div>
      </Popover>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  itemCount: selectCartItemsCount,
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));
