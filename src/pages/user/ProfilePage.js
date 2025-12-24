import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Button, 
  TextField, 
  Avatar, 
  Divider, 
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Badge
} from '@mui/material';
import { 
  Person, 
  Email, 
  Phone, 
  LocationOn, 
  Edit, 
  Save, 
  Lock, 
  Visibility, 
  VisibilityOff, 
  CreditCard, 
  DirectionsBus, 
  History, 
  PhotoCamera,
  Notifications,
  Settings,
  Delete
} from '@mui/icons-material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// Profile information validation schema
const profileSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  address: Yup.string(),
  city: Yup.string(),
  country: Yup.string()
});

// Password change validation schema
const passwordSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required')
});

const ProfilePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState('');
  const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState(false);
  const [passwordUpdateError, setPasswordUpdateError] = useState('');
  const [deleteAccountDialogOpen, setDeleteAccountDialogOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setUpdateSuccess(false);
    setUpdateError('');
  };

  const handleUpdateProfile = async (values, { setSubmitting }) => {
    setUpdateSuccess(false);
    setUpdateError('');
    
    try {
      // Simulate API call to update profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUpdateSuccess(true);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setUpdateError('Failed to update profile. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePasswordChange = async (values, { setSubmitting, resetForm }) => {
    setPasswordUpdateSuccess(false);
    setPasswordUpdateError('');
    
    try {
      // Simulate API call to change password
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPasswordUpdateSuccess(true);
      resetForm();
    } catch (error) {
      console.error('Error changing password:', error);
      setPasswordUpdateError('Failed to change password. Please ensure your current password is correct.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // Simulate API call to delete account
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to home page
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const toggleShowPassword = (field) => {
    switch (field) {
      case 'current':
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case 'new':
        setShowNewPassword(!showNewPassword);
        break;
      case 'confirm':
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Profile
      </Typography>
      
      <Grid container spacing={3}>
        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ mb: 3 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <IconButton 
                      size="small" 
                      sx={{ 
                        bgcolor: 'primary.main', 
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'primary.dark'
                        }
                      }}
                    >
                      <PhotoCamera fontSize="small" />
                    </IconButton>
                  }
                >
                  <Avatar 
                    sx={{ 
                      width: 100, 
                      height: 100, 
                      mb: 2,
                      mx: 'auto',
                      bgcolor: 'primary.main',
                      fontSize: 40
                    }}
                  >
                    JD
                  </Avatar>
                </Badge>
              </Box>
              <Typography variant="h6">
                John Doe
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                john.doe@example.com
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Member since {new Date().getFullYear()}
              </Typography>
            </CardContent>
          </Card>
          
          <Card elevation={2}>
            <List component="nav">
              <ListItem 
                button 
                selected={tabValue === 0}
                onClick={() => setTabValue(0)}
              >
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Personal Information" />
              </ListItem>
              <ListItem 
                button 
                selected={tabValue === 1}
                onClick={() => setTabValue(1)}
              >
                <ListItemIcon>
                  <Lock />
                </ListItemIcon>
                <ListItemText primary="Security" />
              </ListItem>
              <ListItem 
                button 
                selected={tabValue === 2}
                onClick={() => setTabValue(2)}
              >
                <ListItemIcon>
                  <DirectionsBus />
                </ListItemIcon>
                <ListItemText primary="My Bookings" />
              </ListItem>
              <ListItem 
                button 
                selected={tabValue === 3}
                onClick={() => setTabValue(3)}
              >
                <ListItemIcon>
                  <CreditCard />
                </ListItemIcon>
                <ListItemText primary="Payment Methods" />
              </ListItem>
              <ListItem 
                button 
                selected={tabValue === 4}
                onClick={() => setTabValue(4)}
              >
                <ListItemIcon>
                  <Notifications />
                </ListItemIcon>
                <ListItemText primary="Notifications" />
              </ListItem>
              <Divider />
              <ListItem 
                button 
                onClick={() => setDeleteAccountDialogOpen(true)}
                sx={{ color: 'error.main' }}
              >
                <ListItemIcon sx={{ color: 'error.main' }}>
                  <Delete />
                </ListItemIcon>
                <ListItemText primary="Delete Account" />
              </ListItem>
            </List>
          </Card>
        </Grid>
        
        {/* Main content */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3 }}>
            {tabValue === 0 && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6">
                    Personal Information
                  </Typography>
                  <Button 
                    startIcon={editMode ? <Save /> : <Edit />}
                    onClick={toggleEditMode}
                    variant={editMode ? "contained" : "outlined"}
                  >
                    {editMode ? 'Save Changes' : 'Edit Profile'}
                  </Button>
                </Box>
                
                {updateSuccess && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    Profile updated successfully!
                  </Alert>
                )}
                
                {updateError && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {updateError}
                  </Alert>
                )}
                
                <Formik
                  initialValues={{
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@example.com',
                    phone: '+1234567890',
                    address: '123 Main St',
                    city: 'New York',
                    country: 'USA'
                  }}
                  validationSchema={profileSchema}
                  onSubmit={handleUpdateProfile}
                  enableReinitialize
                >
                  {({ errors, touched, isSubmitting, handleSubmit }) => (
                    <Form>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Field
                            as={TextField}
                            name="firstName"
                            label="First Name"
                            fullWidth
                            disabled={!editMode}
                            error={touched.firstName && Boolean(errors.firstName)}
                            helperText={touched.firstName && errors.firstName}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field
                            as={TextField}
                            name="lastName"
                            label="Last Name"
                            fullWidth
                            disabled={!editMode}
                            error={touched.lastName && Boolean(errors.lastName)}
                            helperText={touched.lastName && errors.lastName}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            name="email"
                            label="Email"
                            fullWidth
                            disabled={!editMode}
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            name="phone"
                            label="Phone Number"
                            fullWidth
                            disabled={!editMode}
                            error={touched.phone && Boolean(errors.phone)}
                            helperText={touched.phone && errors.phone}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            name="address"
                            label="Address"
                            fullWidth
                            disabled={!editMode}
                            error={touched.address && Boolean(errors.address)}
                            helperText={touched.address && errors.address}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field
                            as={TextField}
                            name="city"
                            label="City"
                            fullWidth
                            disabled={!editMode}
                            error={touched.city && Boolean(errors.city)}
                            helperText={touched.city && errors.city}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field
                            as={TextField}
                            name="country"
                            label="Country"
                            fullWidth
                            disabled={!editMode}
                            error={touched.country && Boolean(errors.country)}
                            helperText={touched.country && errors.country}
                          />
                        </Grid>
                        {editMode && (
                          <Grid item xs={12}>
                            <Button
                              type="submit"
                              variant="contained"
                              color="primary"
                              fullWidth
                              disabled={isSubmitting}
                              startIcon={isSubmitting ? <CircularProgress size={20} /> : <Save />}
                            >
                              {isSubmitting ? 'Saving...' : 'Save Changes'}
                            </Button>
                          </Grid>
                        )}
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Box>
            )}
            
            {tabValue === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Security
                </Typography>
                
                <Typography variant="subtitle1" gutterBottom>
                  Change Password
                </Typography>
                
                {passwordUpdateSuccess && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    Password updated successfully!
                  </Alert>
                )}
                
                {passwordUpdateError && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {passwordUpdateError}
                  </Alert>
                )}
                
                <Formik
                  initialValues={{
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                  }}
                  validationSchema={passwordSchema}
                  onSubmit={handlePasswordChange}
                >
                  {({ errors, touched, isSubmitting, handleSubmit }) => (
                    <Form>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            name="currentPassword"
                            label="Current Password"
                            type={showCurrentPassword ? 'text' : 'password'}
                            fullWidth
                            error={touched.currentPassword && Boolean(errors.currentPassword)}
                            helperText={touched.currentPassword && errors.currentPassword}
                            InputProps={{
                              endAdornment: (
                                <IconButton
                                  onClick={() => toggleShowPassword('current')}
                                  edge="end"
                                >
                                  {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              )
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            name="newPassword"
                            label="New Password"
                            type={showNewPassword ? 'text' : 'password'}
                            fullWidth
                            error={touched.newPassword && Boolean(errors.newPassword)}
                            helperText={touched.newPassword && errors.newPassword}
                            InputProps={{
                              endAdornment: (
                                <IconButton
                                  onClick={() => toggleShowPassword('new')}
                                  edge="end"
                                >
                                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              )
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            name="confirmPassword"
                            label="Confirm New Password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            fullWidth
                            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                            helperText={touched.confirmPassword && errors.confirmPassword}
                            InputProps={{
                              endAdornment: (
                                <IconButton
                                  onClick={() => toggleShowPassword('confirm')}
                                  edge="end"
                                >
                                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              )
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            startIcon={isSubmitting ? <CircularProgress size={20} /> : <Lock />}
                          >
                            {isSubmitting ? 'Updating...' : 'Update Password'}
                          </Button>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
                
                <Divider sx={{ my: 3 }} />
                
                <Typography variant="subtitle1" gutterBottom>
                  Two-Factor Authentication
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Add an extra layer of security to your account by enabling two-factor authentication.
                </Typography>
                <Button variant="outlined" color="primary">
                  Enable Two-Factor Authentication
                </Button>
              </Box>
            )}
            
            {tabValue === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  My Bookings
                </Typography>
                <Typography variant="body2" paragraph>
                  View and manage your bus bookings.
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => navigate('/my-bookings')}
                  startIcon={<DirectionsBus />}
                >
                  Go to My Bookings
                </Button>
              </Box>
            )}
            
            {tabValue === 3 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Payment Methods
                </Typography>
                <Typography variant="body2" paragraph>
                  Manage your saved payment methods.
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => navigate('/payment-methods')}
                  startIcon={<CreditCard />}
                >
                  Manage Payment Methods
                </Button>
              </Box>
            )}
            
            {tabValue === 4 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Notification Preferences
                </Typography>
                <Typography variant="body2" paragraph>
                  Manage your notification settings.
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="Email Notifications" 
                      secondary="Receive booking confirmations, updates, and promotional offers via email" 
                    />
                    <Button variant="outlined" size="small">
                      Enabled
                    </Button>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText 
                      primary="SMS Notifications" 
                      secondary="Receive booking confirmations and updates via SMS" 
                    />
                    <Button variant="outlined" size="small">
                      Disabled
                    </Button>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText 
                      primary="Promotional Emails" 
                      secondary="Receive special offers, discounts, and promotional content" 
                    />
                    <Button variant="outlined" size="small">
                      Enabled
                    </Button>
                  </ListItem>
                </List>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
      
      {/* Delete Account Dialog */}
      <Dialog
        open={deleteAccountDialogOpen}
        onClose={() => setDeleteAccountDialogOpen(false)}
        aria-labelledby="delete-account-dialog-title"
        aria-describedby="delete-account-dialog-description"
      >
        <DialogTitle id="delete-account-dialog-title">
          Delete Account
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-account-dialog-description">
            Are you sure you want to delete your account? This action cannot be undone and all your data, including booking history, will be permanently removed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteAccountDialogOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteAccount} 
            color="error"
          >
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProfilePage;