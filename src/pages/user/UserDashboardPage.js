import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Tabs,
  Tab,
  Chip,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
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
  ArrowForward
} from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';

// Generate mock bookings data
const generateMockBookings = () => {
  const bookings = [];
  const operators = ['Express Lines', 'Royal Travels', 'City Link', 'Comfort Coaches', 'Metro Transit'];
  const busTypes = ['Standard', 'Luxury', 'Sleeper', 'Semi-Sleeper', 'Double Decker'];
  const fromCities = ['New York', 'Boston', 'Chicago', 'Washington', 'Philadelphia'];
  const toCities = ['Los Angeles', 'San Francisco', 'Seattle', 'Miami', 'Denver'];
  
  // Generate upcoming bookings
  for (let i = 1; i <= 5; i++) {
    const fromCity = fromCities[Math.floor(Math.random() * fromCities.length)];
    const toCity = toCities[Math.floor(Math.random() * toCities.length)];
    const departureDate = new Date();
    departureDate.setDate(departureDate.getDate() + Math.floor(Math.random() * 30) + 1);
    
    const departureHour = 5 + Math.floor(Math.random() * 15);
    const departureMinutes = Math.floor(Math.random() * 60);
    const durationHours = 1 + Math.floor(Math.random() * 8);
    const durationMinutes = Math.floor(Math.random() * 60);
    
    const arrivalHour = (departureHour + durationHours) % 24;
    const arrivalMinutes = (departureMinutes + durationMinutes) % 60;
    
    const formatTime = (hour, minute) => `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    
    bookings.push({
      id: `BK${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      operator: operators[Math.floor(Math.random() * operators.length)],
      busType: busTypes[Math.floor(Math.random() * busTypes.length)],
      from: fromCity,
      to: toCity,
      departureDate: departureDate.toISOString().split('T')[0],
      departureTime: formatTime(departureHour, departureMinutes),
      arrivalTime: formatTime(arrivalHour, arrivalMinutes),
      duration: `${durationHours}h ${durationMinutes}m`,
      boardingPoint: `${fromCity} Central Bus Terminal`,
      droppingPoint: `${toCity} Main Bus Station`,
      seatNumbers: Array.from({ length: 1 + Math.floor(Math.random() * 4) }, () => 
        Math.floor(Math.random() * 45) + 1
      ),
      totalAmount: 20 + Math.floor(Math.random() * 80) * (1 + Math.floor(Math.random() * 4)),
      paymentMethod: ['credit_card', 'paypal', 'bank_transfer', 'mobile_money'][Math.floor(Math.random() * 4)],
      status: 'confirmed',
      bookingDate: new Date(new Date().getTime() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });
  }
  
  // Generate past bookings
  for (let i = 1; i <= 8; i++) {
    const fromCity = fromCities[Math.floor(Math.random() * fromCities.length)];
    const toCity = toCities[Math.floor(Math.random() * toCities.length)];
    const departureDate = new Date();
    departureDate.setDate(departureDate.getDate() - Math.floor(Math.random() * 60) - 1);
    
    const departureHour = 5 + Math.floor(Math.random() * 15);
    const departureMinutes = Math.floor(Math.random() * 60);
    const durationHours = 1 + Math.floor(Math.random() * 8);
    const durationMinutes = Math.floor(Math.random() * 60);
    
    const arrivalHour = (departureHour + durationHours) % 24;
    const arrivalMinutes = (departureMinutes + durationMinutes) % 60;
    
    const formatTime = (hour, minute) => `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    
    const status = Math.random() > 0.8 ? 'cancelled' : 'completed';
    
    bookings.push({
      id: `BK${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      operator: operators[Math.floor(Math.random() * operators.length)],
      busType: busTypes[Math.floor(Math.random() * busTypes.length)],
      from: fromCity,
      to: toCity,
      departureDate: departureDate.toISOString().split('T')[0],
      departureTime: formatTime(departureHour, departureMinutes),
      arrivalTime: formatTime(arrivalHour, arrivalMinutes),
      duration: `${durationHours}h ${durationMinutes}m`,
      boardingPoint: `${fromCity} Central Bus Terminal`,
      droppingPoint: `${toCity} Main Bus Station`,
      seatNumbers: Array.from({ length: 1 + Math.floor(Math.random() * 4) }, () => 
        Math.floor(Math.random() * 45) + 1
      ),
      totalAmount: 20 + Math.floor(Math.random() * 80) * (1 + Math.floor(Math.random() * 4)),
      paymentMethod: ['credit_card', 'paypal', 'bank_transfer', 'mobile_money'][Math.floor(Math.random() * 4)],
      status: status,
      bookingDate: new Date(new Date(departureDate).getTime() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });
  }
  
  return bookings;
};

const UserDashboardPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [cancelProcessing, setCancelProcessing] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    if (!currentUser) {
      navigate('/login', { state: { from: '/my-bookings' } });
      return;
    }
    
    // Simulate API call to fetch bookings
    setTimeout(() => {
      const mockBookings = generateMockBookings();
      setBookings(mockBookings);
      setLoading(false);
    }, 1000);
  }, [currentUser, navigate]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handlePrintTicket = (booking) => {
    window.print();
  };

  const handleEmailTicket = (booking) => {
    // In a real app, this would trigger an API call to send the ticket via email
    alert(`Ticket for booking ${booking.id} has been sent to your email.`);
  };

  const handleViewBookingDetails = (booking) => {
    // In a real app, this would navigate to a detailed view of the booking
    navigate(`/booking-details/${booking.id}`, { state: { booking } });
  };

  const handleOpenCancelDialog = (booking) => {
    setBookingToCancel(booking);
    setCancelDialogOpen(true);
  };

  const handleCloseCancelDialog = () => {
    setCancelDialogOpen(false);
    setBookingToCancel(null);
  };

  const handleCancelBooking = async () => {
    if (!bookingToCancel) return;
    
    setCancelProcessing(true);
    
    try {
      // Simulate API call to cancel booking
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update the booking status in our state
      setBookings(bookings.map(booking => 
        booking.id === bookingToCancel.id 
          ? { ...booking, status: 'cancelled' } 
          : booking
      ));
      
      setCancelProcessing(false);
      setCancelDialogOpen(false);
      setBookingToCancel(null);
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

  const upcomingBookings = bookings.filter(booking => 
    new Date(booking.departureDate) >= new Date() && booking.status !== 'cancelled'
  );
  
  const pastBookings = bookings.filter(booking => 
    new Date(booking.departureDate) < new Date() || booking.status === 'cancelled'
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Bookings
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="booking tabs">
          <Tab label={`Upcoming (${upcomingBookings.length})`} />
          <Tab label={`Past (${pastBookings.length})`} />
        </Tabs>
      </Box>
      
      {tabValue === 0 && (
        <>
          {upcomingBookings.length === 0 ? (
            <Alert severity="info">
              You don't have any upcoming bookings. <Button color="primary" onClick={() => navigate('/')}>Book a trip now</Button>
            </Alert>
          ) : (
            <Grid container spacing={3}>
              {upcomingBookings.map((booking) => (
                <Grid item xs={12} key={booking.id}>
                  <Card elevation={2}>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Box>
                              <Typography variant="h6">
                                {booking.operator}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                {booking.busType} • Booking ID: {booking.id}
                              </Typography>
                            </Box>
                            <Box>
                              {getStatusChip(booking.status)}
                            </Box>
                          </Box>
                          
                          <Box sx={{ my: 2 }}>
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
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center'
                                }}>
                                  <ArrowForward color="action" />
                                  <Typography variant="caption" color="text.secondary">
                                    {booking.duration}
                                  </Typography>
                                </Box>
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
                          
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <EventSeat fontSize="small" sx={{ mr: 0.5 }} />
                              <Typography variant="body2">
                                Seats: {booking.seatNumbers.join(', ')}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Receipt fontSize="small" sx={{ mr: 0.5 }} />
                              <Typography variant="body2">
                                ${booking.totalAmount}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                        
                        <Grid item xs={12} sm={4}>
                          <Box sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            height: '100%', 
                            justifyContent: 'space-between' 
                          }}>
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="body2" color="text.secondary">
                                Booked on: {booking.bookingDate}
                              </Typography>
                            </Box>
                            
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                              <Button
                                variant="outlined"
                                size="small"
                                startIcon={<Print />}
                                onClick={() => handlePrintTicket(booking)}
                              >
                                Print Ticket
                              </Button>
                              <Button
                                variant="outlined"
                                size="small"
                                startIcon={<Email />}
                                onClick={() => handleEmailTicket(booking)}
                              >
                                Email Ticket
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                onClick={() => handleViewBookingDetails(booking)}
                              >
                                View Details
                              </Button>
                              <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                startIcon={<Cancel />}
                                onClick={() => handleOpenCancelDialog(booking)}
                              >
                                Cancel Booking
                              </Button>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
      
      {tabValue === 1 && (
        <>
          {pastBookings.length === 0 ? (
            <Alert severity="info">
              You don't have any past bookings.
            </Alert>
          ) : (
            <Grid container spacing={3}>
              {pastBookings.map((booking) => (
                <Grid item xs={12} key={booking.id}>
                  <Card elevation={2}>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Box>
                              <Typography variant="h6">
                                {booking.operator}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                {booking.busType} • Booking ID: {booking.id}
                              </Typography>
                            </Box>
                            <Box>
                              {getStatusChip(booking.status)}
                            </Box>
                          </Box>
                          
                          <Box sx={{ my: 2 }}>
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
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center'
                                }}>
                                  <ArrowForward color="action" />
                                  <Typography variant="caption" color="text.secondary">
                                    {booking.duration}
                                  </Typography>
                                </Box>
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
                          
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <EventSeat fontSize="small" sx={{ mr: 0.5 }} />
                              <Typography variant="body2">
                                Seats: {booking.seatNumbers.join(', ')}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Receipt fontSize="small" sx={{ mr: 0.5 }} />
                              <Typography variant="body2">
                                ${booking.totalAmount}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                        
                        <Grid item xs={12} sm={4}>
                          <Box sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            height: '100%', 
                            justifyContent: 'space-between' 
                          }}>
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="body2" color="text.secondary">
                                Booked on: {booking.bookingDate}
                              </Typography>
                            </Box>
                            
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                              {booking.status !== 'cancelled' && (
                                <>
                                  <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<Print />}
                                    onClick={() => handlePrintTicket(booking)}
                                  >
                                    Print Ticket
                                  </Button>
                                  <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<Email />}
                                    onClick={() => handleEmailTicket(booking)}
                                  >
                                    Email Ticket
                                  </Button>
                                </>
                              )}
                              <Button
                                variant="contained"
                                size="small"
                                onClick={() => handleViewBookingDetails(booking)}
                              >
                                View Details
                              </Button>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
      
      {/* Cancel Booking Dialog */}
      <Dialog
        open={cancelDialogOpen}
        onClose={handleCloseCancelDialog}
        aria-labelledby="cancel-dialog-title"
        aria-describedby="cancel-dialog-description"
      >
        <DialogTitle id="cancel-dialog-title">
          Cancel Booking
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="cancel-dialog-description">
            Are you sure you want to cancel your booking from {bookingToCancel?.from} to {bookingToCancel?.to} on {bookingToCancel?.departureDate}?
            {bookingToCancel && (
              <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                Cancellation policy: You will receive a refund of 80% of the total amount if cancelled more than 24 hours before departure.
              </Typography>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
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
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserDashboardPage;

