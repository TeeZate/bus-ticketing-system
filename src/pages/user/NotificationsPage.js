import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Button, 
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Divider,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Snackbar,
  IconButton,
  Tabs,
  Tab
} from '@mui/material';
import { 
  Notifications, 
  Email, 
  Sms, 
  Campaign, 
  ArrowBack,
  NotificationsActive,
  NotificationsOff,
  Delete,
  CheckCircle,
  Info,
  Warning,
  DirectionsBus,
  Payment,
  LocalOffer
} from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';

// Generate mock notifications
const generateMockNotifications = () => {
  return [
    {
      id: 'notif_1',
      type: 'booking_confirmation',
      title: 'Booking Confirmed',
      message: 'Your booking from New York to Boston on June 15, 2023 has been confirmed.',
      date: '2023-06-10T14:30:00Z',
      read: true,
      icon: <CheckCircle color="success" />
    },
    {
      id: 'notif_2',
      type: 'payment',
      title: 'Payment Successful',
      message: 'Your payment of $45.99 for booking #BK78945 was successful.',
      date: '2023-06-10T14:29:00Z',
      read: true,
      icon: <Payment color="primary" />
    },
    {
      id: 'notif_3',
      type: 'reminder',
      title: 'Trip Reminder',
      message: 'Your trip from New York to Boston is tomorrow. Don\'t forget to arrive at the boarding point 15 minutes early.',
      date: '2023-06-14T09:00:00Z',
      read: false,
      icon: <Info color="primary" />
    },
    {
      id: 'notif_4',
      type: 'promotion',
      title: 'Summer Sale!',
      message: 'Enjoy 20% off on all bookings made this weekend. Use code SUMMER20.',
      date: '2023-06-08T10:15:00Z',
      read: false,
      icon: <LocalOffer color="secondary" />
    },
    {
      id: 'notif_5',
      type: 'schedule_change',
      title: 'Schedule Change',
      message: 'The departure time for your booking #BK78945 has been changed from 10:00 AM to 10:30 AM.',
      date: '2023-06-13T16:45:00Z',
      read: false,
      icon: <Warning color="warning" />
    }
  ];
};

const NotificationsPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [notificationPreferences, setNotificationPreferences] = useState({
    email_booking: true,
    email_promotions: true,
    email_reminders: true,
    sms_booking: false,
    sms_reminders: true,
    push_booking: true,
    push_promotions: false,
    push_reminders: true
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  useEffect(() => {
    // Check if user is logged in
    if (!currentUser) {
      navigate('/login', { state: { from: '/notifications' } });
      return;
    }
    
    // Simulate API call to fetch notifications
    setTimeout(() => {
      const mockNotifications = generateMockNotifications();
      setNotifications(mockNotifications);
      setLoading(false);
    }, 800);
  }, [currentUser, navigate]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleToggleNotificationPreference = (preference) => {
    setNotificationPreferences({
      ...notificationPreferences,
      [preference]: !notificationPreferences[preference]
    });
    
    // Show success message
    setSnackbarMessage('Notification preferences updated');
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true } 
        : notification
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    setSnackbarMessage('All notifications marked as read');
    setSnackbarOpen(true);
  };

  const handleDeleteNotification = (notificationId) => {
    setNotifications(notifications.filter(notification => notification.id !== notificationId));
    setSnackbarMessage('Notification deleted');
    setSnackbarOpen(true);
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
    setSnackbarMessage('All notifications cleared');
    setSnackbarOpen(true);
  };

  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      // Today - show time
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays === 1) {
      // Yesterday
      return 'Yesterday';
    } else if (diffDays < 7) {
      // Within a week
      return date.toLocaleDateString([], { weekday: 'long' });
    } else {
      // More than a week ago
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const getUnreadCount = () => {
    return notifications.filter(notification => !notification.read).length;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button 
        startIcon={<ArrowBack />} 
        onClick={handleGoBack}
        sx={{ mb: 2 }}
      >
        Back to Profile
      </Button>
      
      <Typography variant="h4" gutterBottom>
        Notifications
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="notification tabs">
          <Tab label={`All Notifications (${notifications.length})`} />
          <Tab label="Notification Settings" />
        </Tabs>
      </Box>
      
      {tabValue === 0 && (
        <Box>
          {notifications.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <NotificationsOff sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                No Notifications
              </Typography>
              <Typography variant="body2" color="text.secondary">
                You don't have any notifications at the moment.
              </Typography>
            </Paper>
          ) : (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="subtitle1">
                  {getUnreadCount()} unread notifications
                </Typography>
                <Box>
                  <Button 
                    size="small" 
                    onClick={handleMarkAllAsRead}
                    disabled={getUnreadCount() === 0}
                  >
                    Mark all as read
                  </Button>
                  <Button 
                    size="small" 
                    color="error" 
                    onClick={handleClearAllNotifications}
                    sx={{ ml: 1 }}
                  >
                    Clear all
                  </Button>
                </Box>
              </Box>
              
              <List sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
                {notifications.map((notification, index) => (
                  <React.Fragment key={notification.id}>
                    <ListItem 
                      alignItems="flex-start"
                      sx={{ 
                        bgcolor: notification.read ? 'transparent' : 'action.hover',
                        py: 2
                      }}
                    >
                      <ListItemIcon>
                        {notification.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography 
                              variant="subtitle1" 
                              component="span"
                              sx={{ fontWeight: notification.read ? 'normal' : 'bold' }}
                            >
                              {notification.title}
                            </Typography>
                            <Typography 
                              variant="caption" 
                              color="text.secondary"
                            >
                              {getFormattedDate(notification.date)}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Typography
                            variant="body2"
                            color="text.primary"
                            sx={{ mt: 1 }}
                          >
                            {notification.message}
                          </Typography>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          {!notification.read && (
                            <IconButton 
                              edge="end" 
                              aria-label="mark as read"
                              onClick={() => handleMarkAsRead(notification.id)}
                              size="small"
                            >
                              <CheckCircle fontSize="small" />
                            </IconButton>
                          )}
                          <IconButton 
                            edge="end" 
                            aria-label="delete"
                            onClick={() => handleDeleteNotification(notification.id)}
                            size="small"
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      </ListItemSecondaryAction>
                    </ListItem>
                    {index < notifications.length - 1 && <Divider component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </>
          )}
        </Box>
      )}
      
      {tabValue === 1 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Notification Preferences
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Manage how you receive notifications about your bookings, promotions, and account activity.
          </Typography>
          
          <Card elevation={2} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Email Notifications
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <DirectionsBus />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Booking Confirmations & Updates" 
                    secondary="Receive booking confirmations, changes, and reminders via email" 
                  />
                  <Switch
                    edge="end"
                    checked={notificationPreferences.email_booking}
                    onChange={() => handleToggleNotificationPreference('email_booking')}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemIcon>
                    <LocalOffer />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Promotions & Offers" 
                    secondary="Receive special offers, discounts, and promotional content" 
                  />
                  <Switch
                    edge="end"
                    checked={notificationPreferences.email_promotions}
                    onChange={() => handleToggleNotificationPreference('email_promotions')}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemIcon>
                    <Info />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Trip Reminders" 
                    secondary="Receive reminders about your upcoming trips" 
                  />
                  <Switch
                    edge="end"
                    checked={notificationPreferences.email_reminders}
                    onChange={() => handleToggleNotificationPreference('email_reminders')}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
          
          <Card elevation={2} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                SMS Notifications
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <DirectionsBus />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Booking Confirmations & Updates" 
                    secondary="Receive booking confirmations and changes via SMS" 
                  />
                  <Switch
                    edge="end"
                    checked={notificationPreferences.sms_booking}
                    onChange={() => handleToggleNotificationPreference('sms_booking')}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemIcon>
                    <Info />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Trip Reminders" 
                    secondary="Receive SMS reminders about your upcoming trips" 
                  />
                  <Switch
                    edge="end"
                    checked={notificationPreferences.sms_reminders}
                    onChange={() => handleToggleNotificationPreference('sms_reminders')}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
          
          <Card elevation={2}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Push Notifications
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <DirectionsBus />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Booking Confirmations & Updates" 
                    secondary="Receive push notifications for booking confirmations and changes" 
                  />
                  <Switch
                    edge="end"
                    checked={notificationPreferences.push_booking}
                    onChange={() => handleToggleNotificationPreference('push_booking')}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemIcon>
                    <LocalOffer />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Promotions & Offers" 
                    secondary="Receive push notifications for special offers and promotions" 
                  />
                  <Switch
                    edge="end"
                    checked={notificationPreferences.push_promotions}
                    onChange={() => handleToggleNotificationPreference('push_promotions')}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemIcon>
                    <Info />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Trip Reminders" 
                    secondary="Receive push notifications for trip reminders" 
                  />
                  <Switch
                    edge="end"
                    checked={notificationPreferences.push_reminders}
                    onChange={() => handleToggleNotificationPreference('push_reminders')}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>
      )}
      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            <Delete fontSize="small" />
          </IconButton>
        }
      />
    </Container>
  );
};

export default NotificationsPage;

