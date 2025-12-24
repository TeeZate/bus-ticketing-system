import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Button, 
  Card,
  CardContent,
  Divider,
  Chip,
  CircularProgress,
  Tabs,
  Tab,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  InputAdornment,
  Pagination,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  DirectionsBus, 
  AccessTime, 
  LocationOn, 
  CalendarToday, 
  Person, 
  Receipt, 
  Search,
  ArrowForward,
  Cancel,
  CheckCircle,
  PendingActions,
  EventSeat,
  Print,
  Download,
  Star,
  StarBorder,
  FilterList,
  Sort
} from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';

// Generate mock bookings
const generateMockBookings = () => {
  const statuses = ['confirmed', 'completed', 'cancelled'];
  const cities = [
    'New York', 'Boston', 'Washington DC', 'Philadelphia', 'Chicago', 
    'Miami', 'Atlanta', 'Los Angeles', 'San Francisco', 'Seattle'
  ];
  
  return Array.from({ length: 12 }, (_, i) => {
    const departureDate = new Date();
    departureDate.setDate(departureDate.getDate() + Math.floor(Math.random() * 30) - 15);
    
    const fromCity = cities[Math.floor(Math.random() * cities.length)];
    let toCity;
    do {
      toCity = cities[Math.floor(Math.random() * cities.length)];
    } while (toCity === fromCity);
    
    const departureTime = `${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`;
    const arrivalTime = `${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`;
    
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      id: `BK${String(10000 + i).padStart(5, '0')}`,
      busId: `BUS${String(1000 + Math.floor(Math.random() * 1000)).padStart(4, '0')}`,
      busName: `${['Express', 'Deluxe', 'Premium', 'Standard'][Math.floor(Math.random() * 4)]} Bus`,
      from: fromCity,
      to: toCity,
      departureDate: departureDate.toISOString(),
      departureTime,
      arrivalTime,
      passengers: Math.floor(Math.random() * 3) + 1,
      seatNumbers: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => 
        `${String.fromCharCode(65 + Math.floor(Math.random() * 6))}${Math.floor(Math.random() * 30) + 1}`
      ),
      totalAmount: (Math.floor(Math.random() * 50) + 20) * (Math.floor(Math.random() * 3) + 1),
      status,
      paymentMethod: Math.random() > 0.5 ? 'Credit Card' : 'PayPal',
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
      rated: status === 'completed' && Math.random() > 0.5
    };
  });
};

const MyBookingsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [cancelProcessing, setCancelProcessing] = useState(false);
  const [rateDialogOpen, setRateDialogOpen] = useState(false);
  const [bookingToRate, setBookingToRate] = useState(null);
  const [rating, setRating] = useState(0);
  const [ratingComment, setRatingComment] = useState('');
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(5);
  
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
      setFilteredBookings(mockBookings);
      setLoading(false);
    }, 800);
  }, [currentUser, navigate]);

  useEffect(() => {
    // Filter bookings based on tab and search query
    let filtered = [...bookings];
    
    // Filter by tab
    if (tabValue === 1) {
      filtered = filtered.filter(booking => booking.status === 'confirmed');
    } else if (tabValue === 2) {
      filtered = filtered.filter(booking => booking.status === 'completed');
    } else if (tabValue === 3) {
      filtered = filtered.filter(booking => booking.status === 'cancelled');
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(booking => 
        booking.id.toLowerCase().includes(query) ||
        booking.from.toLowerCase().includes(query) ||
        booking.to.toLowerCase().includes(query) ||
        booking.busName.toLowerCase().includes(query)
      );
    }
    
    setFilteredBookings(filtered);
    setPage(1); // Reset to first page when filters change
  }, [bookings, tabValue, searchQuery]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update booking status in state
      const updatedBookings = bookings.map(booking => 
        booking.id === bookingToCancel.id 
          ? { ...booking, status: 'cancelled' } 
          : booking
      );
      
      setBookings(updatedBookings);
      
      setCancelProcessing(false);
      setCancelDialogOpen(false);
      setBookingToCancel(null);
    } catch (error) {
      console.error('Error cancelling booking:', error);
      setCancelProcessing(false);
    }
  };

  const handleOpenRateDialog = (booking) => {
    setBookingToRate(booking);
    setRating(0);
    setRatingComment('');
    setRateDialogOpen(true);
  };

  const handleCloseRateDialog = () => {
    setRateDialogOpen(false);
    setBookingToRate(null);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleRatingCommentChange = (event) => {
    setRatingComment(event.target.value);
  };

  const handleSubmitRating = async () => {
    if (!bookingToRate || rating === 0) return;
    
    try {
      // Simulate API call to submit rating
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update booking in state
      const updatedBookings = bookings.map(booking => 
        booking.id === bookingToRate.id 
          ? { ...booking, rated: true } 
          : booking
      );
      
      setBookings(updatedBookings);
      
      setRateDialogOpen(false);
      setBookingToRate(null);
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  const getStatusChip = (status) => {
    switch (status) {
      case 'confirmed':
        return <Chip label="Confirmed" color="primary" size="small" icon={<CheckCircle />} />;
      case 'completed':
        return <Chip label="Completed" color="success" size="small" icon={<CheckCircle />} />;
      case 'cancelled':
        return <Chip label="Cancelled" color="error" size="small" icon={<Cancel />} />;
      case 'pending':
        return <Chip label="Pending" color="warning" size="small" icon={<PendingActions />} />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate pagination
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);
  const pageCount = Math.ceil(filteredBookings.length / itemsPerPage);

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
      
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search bookings by ID, destination, or bus name"
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                )
              }}
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
            <Button 
              startIcon={<FilterList />} 
              sx={{ mr: 1 }}
              variant="outlined"
            >
              Filter
            </Button>
            <Button 
              startIcon={<Sort />}
              variant="outlined"
            >
              Sort
            </Button>
          </Grid>
        </Grid>
      </Box>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="booking tabs"
          variant={isMobile ? "scrollable" : "standard"}
          scrollButtons={isMobile ? "auto" : false}
        >
          <Tab label="All Bookings" />
          <Tab label="Upcoming" />
          <Tab label="Completed" />
          <Tab label="Cancelled" />
        </Tabs>
      </Box>
      
      {filteredBookings.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <DirectionsBus sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No Bookings Found
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {searchQuery 
              ? "No bookings match your search criteria. Try a different search term."
              : "You don't have any bookings yet."}
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            component={RouterLink}
            to="/"
          >
            Book a Trip
          </Button>
        </Paper>
      ) : (
        <>
          {currentItems.map((booking) => (
            <Card key={booking.id} sx={{ mb: 3, position: 'relative' }}>
            <Box
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                zIndex: 1
              }}
            >
              {getStatusChip(booking.status)}
            </Box>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" component="div">
                      Booking #{booking.id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <CalendarToday fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                      {formatDate(booking.departureDate)}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={8}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ textAlign: 'center', minWidth: '100px' }}>
                      <Typography variant="body1" fontWeight="bold">
                        {booking.departureTime}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {booking.from}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ 
                      flex: 1, 
                      mx: 2, 
                      display: 'flex', 
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}>
                      <Divider sx={{ width: '100%' }} />
                      <DirectionsBus 
                        sx={{ 
                          position: 'absolute',
                          bgcolor: 'background.paper',
                          padding: '0 8px'
                        }} 
                      />
                    </Box>
                    
                    <Box sx={{ textAlign: 'center', minWidth: '100px' }}>
                      <Typography variant="body1" fontWeight="bold">
                        {booking.arrivalTime}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {booking.to}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Bus
                      </Typography>
                      <Typography variant="body2">
                        {booking.busName} ({booking.busId})
                      </Typography>
                    </Box>
                    
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Passengers
                      </Typography>
                      <Typography variant="body2">
                        {booking.passengers} {booking.passengers === 1 ? 'person' : 'people'}
                      </Typography>
                    </Box>
                    
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Seats
                      </Typography>
                      <Typography variant="body2">
                        {booking.seatNumbers.join(', ')}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={4}>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    height: '100%',
                    justifyContent: 'space-between',
                    borderLeft: { xs: 'none', sm: '1px solid' },
                    borderColor: 'divider',
                    pl: { xs: 0, sm: 2 },
                    pt: { xs: 2, sm: 0 }
                  }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Total Amount
                      </Typography>
                      <Typography variant="h6" color="primary" gutterBottom>
                        ${booking.totalAmount.toFixed(2)}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary">
                        Payment Method
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {booking.paymentMethod}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
                      <Button 
                        variant="contained" 
                        color="primary"
                        size="small"
                        component={RouterLink}
                        to={`/booking-details/${booking.id}`}
                        fullWidth
                      >
                        View Details
                      </Button>
                      
                      {booking.status === 'confirmed' && (
                        <Button 
                          variant="outlined" 
                          color="error"
                          size="small"
                          onClick={() => handleOpenCancelDialog(booking)}
                          fullWidth
                        >
                          Cancel Booking
                        </Button>
                      )}
                      
                      {booking.status === 'completed' && !booking.rated && (
                        <Button 
                          variant="outlined" 
                          color="primary"
                          size="small"
                          startIcon={<Star />}
                          onClick={() => handleOpenRateDialog(booking)}
                          fullWidth
                        >
                          Rate Trip
                        </Button>
                      )}
                      
                      {booking.status !== 'cancelled' && (
                        <Button 
                          variant="text" 
                          size="small"
                          startIcon={<Download />}
                          fullWidth
                        >
                          Download Ticket
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
        
        {/* Pagination */}
        {pageCount > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination 
              count={pageCount} 
              page={page} 
              onChange={handlePageChange} 
              color="primary" 
              showFirstButton 
              showLastButton
            />
          </Box>
        )}
      </>
    )}
    
    {/* Cancel Booking Dialog */}
    <Dialog
      open={cancelDialogOpen}
      onClose={handleCloseCancelDialog}
      aria-labelledby="cancel-booking-dialog-title"
      aria-describedby="cancel-booking-dialog-description"
    >
      <DialogTitle id="cancel-booking-dialog-title">
        Cancel Booking
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="cancel-booking-dialog-description">
          Are you sure you want to cancel this booking? This action cannot be undone.
          {bookingToCancel && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" gutterBottom>
                <strong>Booking ID:</strong> {bookingToCancel.id}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Trip:</strong> {bookingToCancel.from} to {bookingToCancel.to}
              </Typography>
              <Typography variant="body2">
                <strong>Date:</strong> {formatDate(bookingToCancel.departureDate)}
              </Typography>
            </Box>
          )}
        </DialogContentText>
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          Note: Cancellation fees may apply based on our cancellation policy.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseCancelDialog} disabled={cancelProcessing}>
          Keep Booking
        </Button>
        <Button 
          onClick={handleCancelBooking} 
          color="error" 
          disabled={cancelProcessing}
          startIcon={cancelProcessing ? <CircularProgress size={20} /> : <Cancel />}
        >
          {cancelProcessing ? 'Cancelling...' : 'Cancel Booking'}
        </Button>
      </DialogActions>
    </Dialog>
    
    {/* Rate Trip Dialog */}
    <Dialog
      open={rateDialogOpen}
      onClose={handleCloseRateDialog}
      aria-labelledby="rate-trip-dialog-title"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="rate-trip-dialog-title">
        Rate Your Trip
      </DialogTitle>
      <DialogContent>
        {bookingToRate && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" gutterBottom>
              <strong>Trip:</strong> {bookingToRate.from} to {bookingToRate.to}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Date:</strong> {formatDate(bookingToRate.departureDate)}
            </Typography>
            <Typography variant="body2">
              <strong>Bus:</strong> {bookingToRate.busName}
            </Typography>
          </Box>
        )}
        
        <Typography variant="body1" gutterBottom>
          How would you rate your trip?
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          {[1, 2, 3, 4, 5].map((value) => (
            <IconButton
              key={value}
              onClick={() => handleRatingChange(value)}
              color={value <= rating ? 'primary' : 'default'}
              sx={{ p: 1 }}
            >
              {value <= rating ? <Star fontSize="large" /> : <StarBorder fontSize="large" />}
            </IconButton>
          ))}
        </Box>
        
        <TextField
          label="Comments (optional)"
          multiline
          rows={4}
          fullWidth
          value={ratingComment}
          onChange={handleRatingCommentChange}
          placeholder="Tell us about your experience..."
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseRateDialog}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmitRating} 
          color="primary" 
          variant="contained"
          disabled={rating === 0}
        >
          Submit Rating
        </Button>
      </DialogActions>
    </Dialog>
  </Container>
);
};

export default MyBookingsPage;
