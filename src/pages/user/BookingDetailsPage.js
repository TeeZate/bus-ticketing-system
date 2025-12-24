import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Button, 
  Divider, 
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert
} from '@mui/material';
import { 
  DirectionsBus, 
  AccessTime, 
  EventSeat, 
  Receipt, 
  Print, 
  Email, 
  Cancel,
  CheckCircle,
  ArrowBack,
  LocationOn,
  Person,
  Payment,
  Phone,
  Home
} from '@mui/icons-material';

const BookingDetailsPage = () => {
  const { bookingId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [cancelProcessing, setCancelProcessing] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState(false);
  
  useEffect(() => {
    // If we have the booking details from location state, use it
    if (location.state?.booking) {
      setBooking(location.state.booking);
      setLoading(false);
    } else {
      // Otherwise, simulate fetching booking details
      setTimeout(() => {
        // In a real app, you would fetch the booking details from the API
        // For now, we'll just redirect to my-bookings if we don't have the data
        navigate('/my-bookings');
      }, 1500);
    }
  }, [location.state, navigate, bookingId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handlePrintTicket = () => {
    window.print();
  };

  const handleEmailTicket = () => {
    // In a real app, this would trigger an API call to send the ticket via email
    alert(`Ticket for booking ${booking.id} has been sent to your email.`);
  };

  const handleOpenCancelDialog = () => {
    setCancelDialogOpen(true);
  };

  const handleCloseCancelDialog = () => {
    setCancelDialogOpen(false);
    if (cancelSuccess) {
      navigate('/my-bookings');
    }
  };

  const handleCancelBooking = async () => {
    setCancelProcessing(true);
    
    try {
      // Simulate API call to cancel booking
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update the booking status in our state
      setBooking({
        ...booking,
        status: 'cancelled'
      });
      
      setCancelProcessing(false);
      setCancelSuccess(true);
    } catch (error) {
      console.error('Error cancelling booking:', error);
      setCancelProcessing(false);
    }
  };

  const getStatusChip = (status) => {
    switch (status) {
      case 'confirmed':
        return <Chip label="Confirmed" color="success" size="small" icon={<CheckCircle />} />;
      case 'completed':
        return <Chip label="Completed" color="primary" size="small" />;
      case 'cancelled':
        return <Chip label="Cancelled" color="error" size="small" icon={<Cancel />} />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  const getJourneyStatus = () => {
    const today = new Date();
    const departureDate = new Date(booking.departureDate);
    
    if (booking.status === 'cancelled') {
      return 'cancelled';
    } else if (departureDate < today) {
      return 'completed';
    } else {
      // Calculate days until departure
      const diffTime = Math.abs(departureDate - today);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) {
        return 'today';
      } else if (diffDays === 1) {
        return 'tomorrow';
      } else {
        return `in ${diffDays} days`;
      }
    }
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
        Back to My Bookings
      </Button>
      
      <Typography variant="h4" gutterBottom>
        Booking Details
      </Typography>
      
      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Booking ID: {booking.id}
            </Typography>
            {getStatusChip(booking.status)}
          </Box>
          
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  {booking.operator} - {booking.busType}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Journey {getJourneyStatus()}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Grid container>
                  <Grid item xs={5}>
                    <Box>
                      <Typography variant="h6">{booking.departureTime}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {booking.from}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {booking.departureDate}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ 
                      width: '100%', 
                      height: '2px', 
                      bgcolor: 'grey.300', 
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        width: '8px',
                        height: '8px',
                        bgcolor: 'grey.500',
                        borderRadius: '50%',
                        top: '-3px',
                        left: 0
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: '8px',
                        height: '8px',
                        bgcolor: 'grey.500',
                        borderRadius: '50%',
                        top: '-3px',
                        right: 0
                      }
                    }} />
                  </Grid>
                  <Grid item xs={5} sx={{ textAlign: 'right' }}>
                    <Box>
                      <Typography variant="h6">{booking.arrivalTime}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {booking.to}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {booking.departureDate}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              
              <List sx={{ bgcolor: 'background.paper', borderRadius: 1, mb: 3 }}>
                <ListItem>
                  <ListItemIcon>
                    <LocationOn />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Boarding Point" 
                    secondary={booking.boardingPoint} 
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemIcon>
                    <LocationOn />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Dropping Point" 
                    secondary={booking.droppingPoint} 
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemIcon>
                    <EventSeat />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Seat Numbers" 
                    secondary={booking.seatNumbers.join(', ')} 
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemIcon>
                    <AccessTime />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Journey Duration" 
                    secondary={booking.duration} 
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemIcon>
                    <Payment />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Payment Method" 
                    secondary={booking.paymentMethod.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} 
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemIcon>
                    <Receipt />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Amount Paid" 
                    secondary={`$${booking.totalAmount}`} 
                  />
                </ListItem>
              </List>
              
              {booking.status === 'confirmed' && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Journey Timeline
                  </Typography>
                  <Stepper orientation="vertical">
                    <Step active={true} completed={true}>
                      <StepLabel>Booking Confirmed</StepLabel>
                      <StepContent>
                        <Typography variant="body2">
                          Your booking was confirmed on {booking.bookingDate}
                        </Typography>
                      </StepContent>
                    </Step>
                    <Step active={false}>
                      <StepLabel>Boarding</StepLabel>
                      <StepContent>
                        <Typography variant="body2">
                          Please arrive at the boarding point 15 minutes before departure
                        </Typography>
                      </StepContent>
                    </Step>
                    <Step active={false}>
                      <StepLabel>Journey Completed</StepLabel>
                    </Step>
                  </Stepper>
                </Box>
              )}
              
              {booking.status === 'completed' && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Journey Timeline
                  </Typography>
                  <Stepper orientation="vertical">
                    <Step active={true} completed={true}>
                      <StepLabel>Booking Confirmed</StepLabel>
                      <StepContent>
                        <Typography variant="body2">
                          Your booking was confirmed on {booking.bookingDate}
                        </Typography>
                      </StepContent>
                    </Step>
                    <Step active={true} completed={true}>
                      <StepLabel>Boarding</StepLabel>
                      <StepContent>
                        <Typography variant="body2">
                          Boarded at {booking.departureTime}
                        </Typography>
                      </StepContent>
                    </Step>
                    <Step active={true} completed={true}>
                      <StepLabel>Journey Completed</StepLabel>
                      <StepContent>
                        <Typography variant="body2">
                          Arrived at destination at {booking.arrivalTime}
                        </Typography>
                      </StepContent>
                    </Step>
                  </Stepper>
                </Box>
              )}
              
              {booking.status === 'cancelled' && (
                <Alert severity="info" sx={{ mb: 3 }}>
                  This booking was cancelled. If you're eligible for a refund, it will be processed within 5-7 business days.
                </Alert>
              )}
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Actions
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {booking.status !== 'cancelled' && (
                    <>
                      <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<Print />}
                        onClick={handlePrintTicket}
                      >
                        Print Ticket
                      </Button>
                      <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<Email />}
                        onClick={handleEmailTicket}
                      >
                        Email Ticket
                      </Button>
                    </>
                  )}
                  
                  {booking.status === 'confirmed' && (
                    <Button
                      variant="outlined"
                      color="error"
                      fullWidth
                      startIcon={<Cancel />}
                      onClick={handleOpenCancelDialog}
                    >
                      Cancel Booking
                    </Button>
                  )}
                  
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<Home />}
                    onClick={() => navigate('/')}
                  >
                    Book Another Trip
                  </Button>
                </Box>
              </Paper>
              
              <Paper elevation={1} sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Need Help?
                </Typography>
                <Typography variant="body2" paragraph>
                  If you have any questions or need assistance with your booking, please contact our customer support.
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Phone fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    +1 (800) 123-4567
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Email fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    support@bustickets.com
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      {/* Cancel Booking Dialog */}
      <Dialog
        open={cancelDialogOpen}
        onClose={handleCloseCancelDialog}
        aria-labelledby="cancel-dialog-title"
        aria-describedby="cancel-dialog-description"
      >
        <DialogTitle id="cancel-dialog-title">
          {cancelSuccess ? 'Booking Cancelled' : 'Cancel Booking'}
        </DialogTitle>
        <DialogContent>
          {cancelSuccess ? (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <CheckCircle color="success" sx={{ fontSize: 60, mb: 2 }} />
              <DialogContentText id="cancel-success-description">
                Your booking has been successfully cancelled. If you're eligible for a refund, it will be processed within 5-7 business days.
              </DialogContentText>
            </Box>
          ) : (
            <DialogContentText id="cancel-dialog-description">
              Are you sure you want to cancel your booking from {booking.from} to {booking.to} on {booking.departureDate}?
              <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                Cancellation policy: You will receive a refund of 80% of the total amount if cancelled more than 24 hours before departure.
              </Typography>
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          {cancelSuccess ? (
            <Button onClick={handleCloseCancelDialog} autoFocus>
              Back to My Bookings
            </Button>
          ) : (
            <>
              <Button onClick={handleCloseCancelDialog} disabled={cancelProcessing}>
                No, Keep Booking
              </Button>
              <Button 
                onClick={handleCancelBooking} 
                color="error" 
                disabled={cancelProcessing}
                startIcon={cancelProcessing ? <CircularProgress size={20} /> : <Cancel />}
              >
                {cancelProcessing ? 'Processing...' : 'Yes, Cancel Booking'}
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BookingDetailsPage;
