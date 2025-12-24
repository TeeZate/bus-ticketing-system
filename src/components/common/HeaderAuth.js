import React, { useState, useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon,
  Badge,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Logout,
  Person,
  DirectionsBus,
  Dashboard,
  Settings,
  Notifications,
  CreditCard
} from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { currentUser, isAdmin, logout } = useContext(AuthContext);
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const menuId = 'primary-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      PaperProps={{
        elevation: 3,
        sx: { width: 220, mt: 1.5 }
      }}
    >
      <Box sx={{ py: 1, px: 2 }}>
        <Typography variant="subtitle1" noWrap>
          {currentUser?.firstName} {currentUser?.lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {currentUser?.email}
        </Typography>
      </Box>
      <Divider />
      <MenuItem onClick={() => { handleMenuClose(); navigate('/profile'); }}>
        <ListItemIcon>
          <Person fontSize="small" />
        </ListItemIcon>
        My Profile
      </MenuItem>
      <MenuItem onClick={() => { handleMenuClose(); navigate('/my-bookings'); }}>
        <ListItemIcon>
          <DirectionsBus fontSize="small" />
        </ListItemIcon>
        My Bookings
      </MenuItem>
      <MenuItem onClick={() => { handleMenuClose(); navigate('/payment-methods'); }}>
        <ListItemIcon>
          <CreditCard fontSize="small" />
        </ListItemIcon>
        Payment Methods
      </MenuItem>
      <MenuItem onClick={() => { handleMenuClose(); navigate('/notifications'); }}>
        <ListItemIcon>
          <Notifications fontSize="small" />
        </ListItemIcon>
        Notifications
      </MenuItem>
      {isAdmin && (
        <MenuItem onClick={() => { handleMenuClose(); navigate('/admin'); }}>
          <ListItemIcon>
            <Dashboard fontSize="small" />
          </ListItemIcon>
          Admin Dashboard
        </MenuItem>
      )}
      <Divider />
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {isMobile && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleMobileMenuToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: isMobile ? 1 : 0
            }}
          >
            BusTickets
          </Typography>
          
          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: 'flex' }}>
              <Button color="inherit" component={RouterLink} to="/">
                Home
              </Button>
              <Button color="inherit" component={RouterLink} to="/about">
                About
              </Button>
              <Button color="inherit" component={RouterLink} to="/contact">
                Contact
              </Button>
              <Button color="inherit" component={RouterLink} to="/faq">
                FAQ
              </Button>
            </Box>
          )}
          
          <Box sx={{ flexGrow: 0 }}>
            {currentUser ? (
              <>
                <IconButton
                  component={RouterLink}
                  to="/notifications"
                  color="inherit"
                  sx={{ mr: 1 }}
                >
                  <Badge badgeContent={3} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Avatar 
                    sx={{ 
                      width: 32, 
                      height: 32,
                      bgcolor: 'secondary.main',
                      fontSize: 14
                    }}
                  >
                    {currentUser.firstName.charAt(0)}{currentUser.lastName.charAt(0)}
                  </Avatar>
                </IconButton>
              </>
            ) : (
              <>
                <Button color="inherit" component={RouterLink} to="/login">
                  Login
                </Button>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  component={RouterLink} 
                  to="/register"
                  sx={{ ml: 1 }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
      
      {/* Mobile menu drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleMobileMenuToggle}
        >
          <List>
            <ListItem button component={RouterLink} to="/">
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={RouterLink} to="/about">
              <ListItemText primary="About" />
            </ListItem>
            <ListItem button component={RouterLink} to="/contact">
              <ListItemText primary="Contact" />
            </ListItem>
            <ListItem button component={RouterLink} to="/faq">
              <ListItemText primary="FAQ" />
            </ListItem>
            <Divider />
            {currentUser ? (
              <>
                <ListItem button component={RouterLink} to="/profile">
                  <ListItemText primary="My Profile" />
                </ListItem>
                <ListItem button component={RouterLink} to="/my-bookings">
                  <ListItemText primary="My Bookings" />
                </ListItem>
                <ListItem button component={RouterLink} to="/payment-methods">
                  <ListItemText primary="Payment Methods" />
                </ListItem>
                <ListItem button component={RouterLink} to="/notifications">
                  <ListItemText primary="Notifications" />
                </ListItem>
                {isAdmin && (
                  <ListItem button component={RouterLink} to="/admin">
                    <ListItemText primary="Admin Dashboard" />
                  </ListItem>
                )}
                <Divider />
                <ListItem button onClick={handleLogout}>
                  <ListItemText primary="Logout" />
                </ListItem>
              </>
            ) : (
              <>
                <ListItem button component={RouterLink} to="/login">
                  <ListItemText primary="Login" />
                </ListItem>
                <ListItem button component={RouterLink} to="/register">
                  <ListItemText primary="Register" />
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
      
      {renderMenu}
    </AppBar>
  );
};

export default Header;

