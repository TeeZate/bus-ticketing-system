import React, { useEffect, useState } from 'react';
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
  CircularProgress
} from '@mui/material';
import { 
  CheckCircle, 
  DirectionsBus, 
  AccessTime, 
  LocationOn, 
  EventSeat, 
  Receipt, 
  Print, 
  Email, 
  Home
} from '@mui/icons-material';

const BookingConfirmationPage = () => {
  const { bookingId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [bookingDetails, setBookingDetails] = useState(null);
  
  useEffect(() => {
    // If we have the booking details from location state, use it
    if (location.state) {
      setBookingDetails(location.state);
      setLoading(false);
    } else {
      // Otherwise, simulate fetching booking details
      setTimeout(() => {
        // In a real app, you would fetch the booking details from the API
        // For now, we'll just redirect to home if we don't have the data
        navigate('/');
      }, 1500);
    }
  }, [location.state, navigate]);

  const handlePrintTicket = () => {
    window.print();
  };

  const handleEmailTicket = () => {
    // In a real app, this would trigger an API call to send the ticket via email
    alert('Ticket has been sent to your email.');
  };

  const handleGoToHome = () => {
    navigate('/');
  };

  const handleViewBookings = () => {
    navigate('/my-bookings');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const { 
    bookingReference, 
    bus, 
    selectedSeats, 
    boardingPoint, 
    droppingPoint, 
    date, 
    totalPrice, 
    paymentMethod 
  } = bookingDetails;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <CheckCircle color="success" sx={{ fontSize: 60 }} />
        <Typography variant="h4" gutterBottom>
          Booking Confirmed!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Your booking reference is: <strong>{bookingReference}</strong>
        </Typography>
        <Typography variant="body1" color="text.secondary">
          A confirmation has been sent to your email.
        </Typography>
      </Box>
      
      <Card elevation={3} sx={{ mb: 4 }} className="print-content">
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              E-Ticket
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Booking Ref: {bookingReference}
            </Typography>
          </Box>
          
          <Divider sx={{ mb: 2 }} />
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom>
                {bus.operator}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {bus.busType}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ textAlign: { sm: 'right' } }}>
              <Typography variant="subtitle1" gutterBottom>
                {date}
              </Typography>
            </Grid>
          </Grid>
          
          <Box sx={{ my: 3 }}>
            <Grid container>
              <Grid item xs={5}>
                <Box>
                  <Typography variant="h6">{boardingPoint.time}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {bus.from}
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
                  <Typography variant="h6">{droppingPoint.time}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {bus.to}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          
          <List sx={{ bgcolor: 'background.paper', borderRadius: 1, mb: 2 }}>
            <ListItem>
              <ListItemIcon>
                <LocationOn />
              </ListItemIcon>
              <ListItemText 
                primary="Boarding Point" 
                secondary={boardingPoint.name} 
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemIcon>
                <LocationOn />
              </ListItemIcon>
              <ListItemText 
                primary="Dropping Point" 
                secondary={droppingPoint.name} 
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemIcon>
                <EventSeat />
              </ListItemIcon>
              <ListItemText 
                primary="Seat Numbers" 
                secondary={selectedSeats.map(seat => seat.number).join(', ')} 
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemIcon>
                <AccessTime />
              </ListItemIcon>
              <ListItemText 
                primary="Journey Duration" 
                secondary={bus.duration} 
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemIcon>
                <Receipt />
              </ListItemIcon>
              <ListItemText 
                primary="Payment Method" 
                secondary={paymentMethod.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} 
              />
            </ListItem>
          </List>
          
          <Box sx={{ 
            bgcolor: 'primary.light', 
            p: 2, 
            borderRadius: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Typography variant="subtitle1">
              Total Amount Paid:
            </Typography>
            <Typography variant="h6" color="primary.dark">
              ${totalPrice + 5}
            </Typography>
          </Box>
          
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Please arrive at the boarding point at least 15 minutes before departure.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Show this e-ticket or provide your booking reference at the time of boarding.
            </Typography>
          </Box>
        </CardContent>
      </Card>
      
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<Print />}
            onClick={handlePrintTicket}
          >
            Print Ticket
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<Email />}
            onClick={handleEmailTicket}
          >
            Email Ticket
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<DirectionsBus />}
            onClick={handleViewBookings}
          >
            My Bookings
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<Home />}
            onClick={handleGoToHome}
          >
            Home
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookingConfirmationPage;
