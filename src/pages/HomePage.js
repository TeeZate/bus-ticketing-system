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
  Autocomplete, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActionArea,
  Alert
} from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Search, DirectionsBus } from '@mui/icons-material';

// Mock data for popular routes and cities
const popularRoutes = [
  { id: 1, from: 'Harare', to: 'Johannesburg', image: 'images/v-hd-johannesburg.jpg', price: '$58' },
  { id: 2, from: 'Lusaka', to: 'Dar es Salaam', image: 'images/daressalaam.jpg', price: '$35' },
  { id: 3, from: 'Dar es Salaam', to: 'Nairobi', image: 'images/nairobi-kenya-73-e1700943843641.webp', price: '$55' },
  { id: 4, from: 'Luanda', to: 'Windhoek', image: 'images/Titelbild-Blogpost-13.jpg', price: '$30' },
];

const cities = [
'Harare',        // Zimbabwe  
'Pretoria',      // South Africa (administrative capital)  
'Maseru',        // Lesotho  
'Maputo',        // Mozambique  
'Gaborone',      // Botswana  
'Windhoek',      // Namibia  
'Lusaka',        // Zambia  
'Lilongwe',      // Malawi  
'Mbabane',       // Eswatini (administrative capital)  
'Antananarivo',  // Madagascar  
'Moroni',        // Comoros  
'Port Louis',    // Mauritius  
'Victoria',      // Seychelles  
'Luanda',        // Angola  
'Juba',          // South Sudan  
'Brazzaville' // Congo
];

const HomePage = () => {
  const navigate = useNavigate();
  const [departure, setDeparture] = useState(null);
  const [destination, setDestination] = useState(null);
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (!departure || !destination) {
      setError('Please select both departure and destination cities');
      return;
    }
    
    if (departure === destination) {
      setError('Departure and destination cannot be the same');
      return;
    }
    
    setError('');
    navigate('/search', { 
      state: {
        departure,
        destination,
        date: date.toISOString().split('T')[0]
      } 
    });
  };

  const handlePopularRouteClick = (route) => {
    setDeparture(route.from);
    setDestination(route.to);
    navigate('/search', { 
      state: {
        departure: route.from,
        destination: route.to,
        date: date.toISOString().split('T')[0]
      } 
    });
  };

  return (
    <Box>
      {/* Hero Section with Search Form */}
      <Box 
        sx={{ 
          backgroundImage: 'url(images/BUS1.jpg)', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          py: 10,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h3" component="h1" color="white" gutterBottom>
            Book Your Bus Tickets Online
          </Typography>
          <Typography variant="h6" color="white" paragraph>
            Safe, secure, and convenient bus travel across the country
          </Typography>
          
          <Paper elevation={3} sx={{ p: 3, mt: 4, maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h5" gutterBottom>
              Search for Bus Tickets
            </Typography>
            
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  options={cities}
                  value={departure}
                  onChange={(event, newValue) => setDeparture(newValue)}
                  renderInput={(params) => <TextField {...params} label="From" fullWidth required />}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  options={cities}
                  value={destination}
                  onChange={(event, newValue) => setDestination(newValue)}
                  renderInput={(params) => <TextField {...params} label="To" fullWidth required />}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  minDate={new Date()}
                  customInput={<TextField fullWidth label="Date" />}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  size="large" 
                  startIcon={<Search />}
                  onClick={handleSearch}
                  sx={{ height: '100%' }}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>

      {/* Popular Routes Section */}
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Popular Routes
        </Typography>
        <Grid container spacing={3}>
          {popularRoutes.map((route) => (
            <Grid item xs={12} sm={6} md={3} key={route.id}>
              <Card elevation={2}>
                <CardActionArea onClick={() => handlePopularRouteClick(route)}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={route.image}
                    alt={`${route.from} to ${route.to}`}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {route.from} to {route.to}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Starting from {route.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Why Choose Us Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Why Choose BusTickets
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <DirectionsBus sx={{ fontSize: 60, color: 'primary.main' }} />
                <Typography variant="h6" gutterBottom>
                  Extensive Network
                </Typography>
                <Typography variant="body1">
                  Access to thousands of bus routes across the country with multiple operators.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <DirectionsBus sx={{ fontSize: 60, color: 'primary.main' }} />
                <Typography variant="h6" gutterBottom>
                  Secure Booking
                </Typography>
                <Typography variant="body1">
                  Safe and secure payment options with instant confirmation.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <DirectionsBus sx={{ fontSize: 60, color: 'primary.main' }} />
                <Typography variant="h6" gutterBottom>
                  Customer Support
                </Typography>
                <Typography variant="body1">
                  24/7 customer service to assist you with your booking needs.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Promotions Section */}
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Special Offers
        </Typography>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            bgcolor: 'primary.light', 
            color: 'primary.contrastText',
            borderRadius: 2
          }}
        >
          <Typography variant="h5" gutterBottom>
            Summer Travel Sale!
          </Typography>
          <Typography variant="body1" paragraph>
            Get 15% off on all bus tickets booked for travel between June and August.
            Use code SUMMER15 at checkout.
          </Typography>
          <Button variant="contained" color="secondary">
            Book Now
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default HomePage;
