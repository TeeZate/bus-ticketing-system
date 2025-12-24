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
  Chip,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  CircularProgress
} from '@mui/material';
import { 
  AccessTime, 
  AirlineSeatReclineNormal, 
  Wifi, 
  PowerSettingsNew, 
  LocalCafe, 
  Movie,
  ArrowBack,
  EventSeat,
  CheckCircle,
  DirectionsBus
} from '@mui/icons-material';

// Mock data for a single bus if needed
const getMockBusDetails = (id) => {
  const operators = ['Express Lines', 'Royal Travels', 'City Link', 'Comfort Coaches', 'Metro Transit'];
  const busTypes = ['Standard', 'Luxury', 'Sleeper', 'Semi-Sleeper', 'Double Decker'];
  
  const departureHour = 5 + Math.floor(Math.random() * 15);
  const departureMinutes = Math.floor(Math.random() * 60);
  const durationHours = 1 + Math.floor(Math.random() * 8);
  const durationMinutes = Math.floor(Math.random() * 60);
  
  const arrivalHour = (departureHour + durationHours) % 24;
  const arrivalMinutes = (departureMinutes + durationMinutes) % 60;
  
  const formatTime = (hour, minute) => `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  
  return {
    id: parseInt(id),
    operator: operators[Math.floor(Math.random() * operators.length)],
    busType: busTypes[Math.floor(Math.random() * busTypes.length)],
    departure: formatTime(departureHour, departureMinutes),
    arrival: formatTime(arrivalHour, arrivalMinutes),
    duration: `${durationHours}h ${durationMinutes}m`,
    price: 20 + Math.floor(Math.random() * 80),
    availableSeats: 5 + Math.floor(Math.random() * 40),
    totalSeats: 45,
    amenities: {
      wifi: Math.random() > 0.3,
      power: Math.random() > 0.4,
      refreshments: Math.random() > 0.6,
      entertainment: Math.random() > 0.7,
    },
    from: 'New York',
    to: 'Boston',
    boardingPoints: [
      { id: 1, name: 'Central Bus Terminal', time: formatTime(departureHour, departureMinutes) },
      { id: 2, name: 'North Station', time: formatTime(departureHour, departureMinutes + 15) },
      { id: 3, name: 'South Terminal', time: formatTime(departureHour, departureMinutes + 30) }
    ],
    droppingPoints: [
      { id: 1, name: 'Main Bus Station', time: formatTime(arrivalHour, arrivalMinutes) },
      { id: 2, name: 'Downtown Terminal', time: formatTime(arrivalHour, arrivalMinutes + 15) },
      { id: 3, name: 'University Stop', time: formatTime(arrivalHour, arrivalMinutes + 30) }
    ],
    policies: {
      cancellation: 'Free cancellation up to 24 hours before departure. 50% refund if cancelled within 24 hours.',
      baggage: 'One luggage up to 20kg and one carry-on bag allowed per passenger.',
      children: 'Children under 2 years travel free when not occupying a seat.'
    }
  };
};

// Generate a layout of seats for the bus
const generateSeatsLayout = (totalSeats, unavailableSeats = []) => {
  const rows = Math.ceil(totalSeats / 4);
  const layout = [];
  
  for (let row = 1; row <= rows; row++) {
    const rowSeats = [];
    
    // Left side (2 seats)
    for (let i = 0; i < 2; i++) {
      const seatNumber = (row - 1) * 4 + i + 1;
      if (seatNumber <= totalSeats) {
        rowSeats.push({
          id: seatNumber,
          number: seatNumber,
          available: !unavailableSeats.includes(seatNumber),
          position: i === 0 ? 'window' : 'aisle'
        });
      }
    }
    
    // Aisle
    rowSeats.push(null);
    
    // Right side (2 seats)
    for (let i = 0; i < 2; i++) {
      const seatNumber = (row - 1) * 4 + i + 3;
      if (seatNumber <= totalSeats) {
        rowSeats.push({
          id: seatNumber,
          number: seatNumber,
          available: !unavailableSeats.includes(seatNumber),
          position: i === 0 ? 'aisle' : 'window'
        });
      }
    }
    
    layout.push(rowSeats);
  }
  
  return layout;
};

const BusDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { bus: locationBus, date } = location.state || {};
  
  const [bus, setBus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedBoardingPoint, setSelectedBoardingPoint] = useState(null);
  const [selectedDroppingPoint, setSelectedDroppingPoint] = useState(null);
  const [seatsLayout, setSeatsLayout] = useState([]);
  const [error, setError] = useState('');
  
  useEffect(() => {
    // If we have the bus data from location state, use it
    // Otherwise fetch it based on the ID
    if (locationBus) {
      setBus(locationBus);
      // Generate random unavailable seats
      const unavailableSeats = Array.from({ length: 15 }, () => 
        Math.floor(Math.random() * locationBus.totalSeats) + 1
      );
      setSeatsLayout(generateSeatsLayout(locationBus.totalSeats, unavailableSeats));
      setLoading(false);
    } else {
      // Simulate API call to get bus details
      setTimeout(() => {
        const busDetails = getMockBusDetails(id);
        setBus(busDetails);
        // Generate random unavailable seats
        const unavailableSeats = Array.from({ length: 15 }, () => 
          Math.floor(Math.random() * busDetails.totalSeats) + 1
        );
        setSeatsLayout(generateSeatsLayout(busDetails.totalSeats, unavailableSeats));
        setLoading(false);
      }, 1000);
    }
  }, [id, locationBus]);

  const handleSeatClick = (seat) => {
    if (!seat.available) return;
    
    if (selectedSeats.some(s => s.id === seat.id)) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleBoardingPointChange = (point) => {
    setSelectedBoardingPoint(point);
  };

  const handleDroppingPointChange = (point) => {
    setSelectedDroppingPoint(point);
  };

  const handleProceedToCheckout = () => {
    if (selectedSeats.length === 0) {
      setError('Please select at least one seat');
      return;
    }
    
    if (!selectedBoardingPoint) {
      setError('Please select a boarding point');
      return;
    }
    
    if (!selectedDroppingPoint) {
      setError('Please select a dropping point');
      return;
    }
    
    setError('');
    navigate('/checkout', {
      state: {
        bus,
        selectedSeats,
        boardingPoint: selectedBoardingPoint,
        droppingPoint: selectedDroppingPoint,
        date,
        totalPrice: selectedSeats.length * bus.price
      }
    });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button 
        startIcon={<ArrowBack />} 
        onClick={handleGoBack}
        sx={{ mb: 2 }}
      >
        Back to search results
      </Button>
      
      <Typography variant="h4" gutterBottom>
        Select Seats
      </Typography>
      
      <Grid container spacing={3}>
        {/* Bus Details */}
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {bus.operator}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {bus.busType} • {date}
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
                <Box>
                  <Typography variant="h5">{bus.departure}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {bus.from}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTime fontSize="small" sx={{ mx: 0.5 }} />
                    {bus.duration}
                  </Typography>
                  <Divider sx={{ width: '100%', my: 0.5 }} />
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="h5">{bus.arrival}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {bus.to}
                  </Typography>
                </Box>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle1" gutterBottom>
                Amenities
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {bus.amenities.wifi && (
                  <Chip icon={<Wifi />} label="WiFi" size="small" color="primary" variant="outlined" />
                )}
                {bus.amenities.power && (
                  <Chip icon={<PowerSettingsNew />} label="Power Outlets" size="small" color="primary" variant="outlined" />
                )}
                {bus.amenities.refreshments && (
                  <Chip icon={<LocalCafe />} label="Refreshments" size="small" color="primary" variant="outlined" />
                )}
                {bus.amenities.entertainment && (
                  <Chip icon={<Movie />} label="Entertainment" size="small" color="primary" variant="outlined" />
                )}
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle1" gutterBottom>
                Policies
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Cancellation:</strong> {bus.policies.cancellation}
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Baggage:</strong> {bus.policies.baggage}
              </Typography>
              <Typography variant="body2">
                <strong>Children:</strong> {bus.policies.children}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Seat Selection */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Select Your Seats
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
                <Box sx={{ 
                  width: 24, 
                  height: 24, 
                  bgcolor: 'grey.300', 
                  borderRadius: 1, 
                  mr: 1 
                }} />
                <Typography variant="body2">Available</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
                <Box sx={{ 
                  width: 24, 
                  height: 24, 
                  bgcolor: 'error.light', 
                  borderRadius: 1,
                  mr: 1 
                }} />
                <Typography variant="body2">Unavailable</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ 
                  width: 24, 
                  height: 24, 
                  bgcolor: 'primary.main', 
                  borderRadius: 1,
                  mr: 1 
                }} />
                <Typography variant="body2">Selected</Typography>
              </Box>
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
              p: 2,
              mb: 3
            }}>
              {/* Driver's cabin */}
              <Box sx={{ 
                width: '80%', 
                height: 50, 
                bgcolor: 'grey.200', 
                borderRadius: '16px 16px 0 0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mb: 3
              }}>
                <DirectionsBus />
                <Typography variant="body2" sx={{ ml: 1 }}>Driver</Typography>
              </Box>
              
              {/* Seats layout */}
              <Box sx={{ width: '100%' }}>
                {seatsLayout.map((row, rowIndex) => (
                  <Box 
                    key={rowIndex} 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'center',
                      mb: 1
                    }}
                  >
                    {row.map((seat, seatIndex) => (
                      seat === null ? (
                        // Aisle
                        <Box 
                          key={`aisle-${rowIndex}-${seatIndex}`} 
                          sx={{ width: 20 }} 
                        />
                      ) : (
                        // Seat
                        <Box 
                          key={`seat-${seat.id}`}
                          sx={{ 
                            width: 40, 
                            height: 40, 
                            m: 0.5,
                            bgcolor: !seat.available 
                              ? 'error.light' 
                              : selectedSeats.some(s => s.id === seat.id)
                                ? 'primary.main'
                                : 'grey.300',
                            color: !seat.available || selectedSeats.some(s => s.id === seat.id)
                              ? 'white'
                              : 'text.primary',
                            borderRadius: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: seat.available ? 'pointer' : 'not-allowed',
                            '&:hover': {
                              bgcolor: seat.available && !selectedSeats.some(s => s.id === seat.id)
                                ? 'primary.light'
                                : undefined
                            }
                          }}
                          onClick={() => handleSeatClick(seat)}
                        >
                          {seat.number}
                        </Box>
                      )
                    ))}
                  </Box>
                ))}
              </Box>
            </Box>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Boarding Point
                </Typography>
                <List>
                  {bus.boardingPoints.map((point) => (
                    <ListItem 
                      key={point.id}
                      button
                      selected={selectedBoardingPoint?.id === point.id}
                      onClick={() => handleBoardingPointChange(point)}
                      sx={{ 
                        border: '1px solid',
                        borderColor: 'grey.300',
                        borderRadius: 1,
                        mb: 1,
                        '&.Mui-selected': {
                          bgcolor: 'primary.light',
                          '&:hover': {
                            bgcolor: 'primary.light',
                          }
                        }
                      }}
                    >
                      <ListItemIcon>
                        {selectedBoardingPoint?.id === point.id ? (
                          <CheckCircle color="primary" />
                        ) : (
                          <EventSeat />
                        )}
                      </ListItemIcon>
                      <ListItemText 
                        primary={point.name} 
                        secondary={`Departure: ${point.time}`} 
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Dropping Point
                </Typography>
                <List>
                  {bus.droppingPoints.map((point) => (
                    <ListItem 
                      key={point.id}
                      button
                      selected={selectedDroppingPoint?.id === point.id}
                      onClick={() => handleDroppingPointChange(point)}
                      sx={{ 
                        border: '1px solid',
                        borderColor: 'grey.300',
                        borderRadius: 1,
                        mb: 1,
                        '&.Mui-selected': {
                          bgcolor: 'primary.light',
                          '&:hover': {
                            bgcolor: 'primary.light',
                          }
                        }
                      }}
                    >
                      <ListItemIcon>
                        {selectedDroppingPoint?.id === point.id ? (
                          <CheckCircle color="primary" />
                        ) : (
                          <EventSeat />
                        )}
                      </ListItemIcon>
                      <ListItemText 
                        primary={point.name} 
                        secondary={`Arrival: ${point.time}`} 
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
            
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mt: 3 
            }}>
              <Box>
                <Typography variant="body1">
                  Selected Seats: {selectedSeats.map(seat => seat.number).join(', ') || 'None'}
                </Typography>
                <Typography variant="h6" color="primary">
                  Total: ${selectedSeats.length * bus.price}
                </Typography>
              </Box>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                onClick={handleProceedToCheckout}
                disabled={selectedSeats.length === 0 || !selectedBoardingPoint || !selectedDroppingPoint}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BusDetailsPage;

