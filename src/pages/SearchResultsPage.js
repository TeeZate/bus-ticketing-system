import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  Divider, 
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CircularProgress
} from '@mui/material';
import { 
  AccessTime, 
  AirlineSeatReclineNormal, 
  Wifi, 
  PowerSettingsNew, 
  LocalCafe 
} from '@mui/icons-material';

// Mock data for bus search results
const generateMockBuses = (from, to) => {
  const buses = [];
  const operators = ['Express Lines', 'Royal Travels', 'City Link', 'Comfort Coaches', 'Metro Transit'];
  const busTypes = ['Standard', 'Luxury', 'Sleeper', 'Semi-Sleeper', 'Double Decker'];
  
  for (let i = 1; i <= 15; i++) {
    const departureHour = 5 + Math.floor(Math.random() * 15);
    const departureMinutes = Math.floor(Math.random() * 60);
    const durationHours = 1 + Math.floor(Math.random() * 8);
    const durationMinutes = Math.floor(Math.random() * 60);
    
    const arrivalHour = (departureHour + durationHours) % 24;
    const arrivalMinutes = (departureMinutes + durationMinutes) % 60;
    
    const formatTime = (hour, minute) => `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    
    buses.push({
      id: i,
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
      from,
      to
    });
  }
  
  return buses;
};

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { departure, destination, date } = location.state || {};
  
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState('departure');
  const [busTypes, setBusTypes] = useState({
    Standard: false,
    Luxury: false,
    Sleeper: false,
    'Semi-Sleeper': false,
    'Double Decker': false
  });
  const [amenities, setAmenities] = useState({
    wifi: false,
    power: false,
    refreshments: false,
    entertainment: false
  });
  const [departureTime, setDepartureTime] = useState({
    morning: false,
    afternoon: false,
    evening: false,
    night: false
  });

  useEffect(() => {
    if (!departure || !destination) {
      navigate('/');
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      const mockBuses = generateMockBuses(departure, destination);
      setBuses(mockBuses);
      setFilteredBuses(mockBuses);
      setLoading(false);
    }, 1000);
  }, [departure, destination, navigate]);

  useEffect(() => {
    applyFilters();
  }, [priceRange, sortBy, busTypes, amenities, departureTime]);

  const applyFilters = () => {
    let filtered = [...buses];
    
    // Filter by price
    filtered = filtered.filter(bus => bus.price >= priceRange[0] && bus.price <= priceRange[1]);
    
    // Filter by bus type
    const selectedBusTypes = Object.keys(busTypes).filter(type => busTypes[type]);
    if (selectedBusTypes.length > 0) {
      filtered = filtered.filter(bus => selectedBusTypes.includes(bus.busType));
    }
    
    // Filter by amenities
    const selectedAmenities = Object.keys(amenities).filter(amenity => amenities[amenity]);
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter(bus => 
        selectedAmenities.every(amenity => bus.amenities[amenity])
      );
    }
    
    // Filter by departure time
    const selectedTimes = Object.keys(departureTime).filter(time => departureTime[time]);
    if (selectedTimes.length > 0) {
      filtered = filtered.filter(bus => {
        const hour = parseInt(bus.departure.split(':')[0]);
        if (departureTime.morning && hour >= 5 && hour < 12) return true;
        if (departureTime.afternoon && hour >= 12 && hour < 17) return true;
        if (departureTime.evening && hour >= 17 && hour < 21) return true;
        if (departureTime.night && (hour >= 21 || hour < 5)) return true;
        return false;
      });
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'duration':
          return a.duration.localeCompare(b.duration);
        case 'departure':
          return a.departure.localeCompare(b.departure);
        case 'arrival':
          return a.arrival.localeCompare(b.arrival);
        default:
          return 0;
      }
    });
    
    setFilteredBuses(filtered);
  };

  const handleBusTypeChange = (event) => {
    setBusTypes({
      ...busTypes,
      [event.target.name]: event.target.checked
    });
  };

  const handleAmenityChange = (event) => {
    setAmenities({
      ...amenities,
      [event.target.name]: event.target.checked
    });
  };

  const handleDepartureTimeChange = (event) => {
    setDepartureTime({
      ...departureTime,
      [event.target.name]: event.target.checked
    });
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSelectBus = (busId) => {
    navigate(`/bus/${busId}`, { 
      state: { 
        bus: filteredBuses.find(bus => bus.id === busId),
        date
      } 
    });
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
      <Typography variant="h4" gutterBottom>
        Buses from {departure} to {destination}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        {date} • {filteredBuses.length} buses found
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Filters */}
        <Grid item xs={12} md={3}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Filters
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography id="price-range-slider" gutterBottom>
                Price Range
              </Typography>
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={100}
                aria-labelledby="price-range-slider"
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">${priceRange[0]}</Typography>
                <Typography variant="body2">${priceRange[1]}</Typography>
              </Box>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle1" gutterBottom>
              Bus Type
            </Typography>
            <FormGroup>
              {Object.keys(busTypes).map((type) => (
                <FormControlLabel
                  key={type}
                  control={
                    <Checkbox 
                      checked={busTypes[type]} 
                      onChange={handleBusTypeChange} 
                      name={type} 
                    />
                  }
                  label={type}
                />
              ))}
            </FormGroup>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle1" gutterBottom>
              Departure Time
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={departureTime.morning} 
                    onChange={handleDepartureTimeChange} 
                    name="morning" 
                  />
                }
                label="Morning (5:00 - 11:59)"
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={departureTime.afternoon} 
                    onChange={handleDepartureTimeChange} 
                    name="afternoon" 
                  />
                }
                label="Afternoon (12:00 - 16:59)"
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={departureTime.evening} 
                    onChange={handleDepartureTimeChange} 
                    name="evening" 
                  />
                }
                label="Evening (17:00 - 20:59)"
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={departureTime.night} 
                    onChange={handleDepartureTimeChange} 
                    name="night" 
                  />
                }
                label="Night (21:00 - 4:59)"
              />
            </FormGroup>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle1" gutterBottom>
              Amenities
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={amenities.wifi} 
                    onChange={handleAmenityChange} 
                    name="wifi" 
                  />
                }
                label="WiFi"
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={amenities.power} 
                    onChange={handleAmenityChange} 
                    name="power" 
                  />
                }
                label="Power Outlets"
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={amenities.refreshments} 
                    onChange={handleAmenityChange} 
                    name="refreshments" 
                  />
                }
                label="Refreshments"
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={amenities.entertainment} 
                    onChange={handleAmenityChange} 
                    name="entertainment" 
                  />
                }
                label="Entertainment"
              />
            </FormGroup>
          </Paper>
        </Grid>
        
        {/* Results */}
        <Grid item xs={12} md={9}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="sort-select-label">Sort by</InputLabel>
              <Select
                labelId="sort-select-label"
                value={sortBy}
                label="Sort by"
                onChange={handleSortChange}
              >
                <MenuItem value="departure">Departure Time</MenuItem>
                <MenuItem value="price">Price: Low to High</MenuItem>
                <MenuItem value="duration">Duration</MenuItem>
                <MenuItem value="arrival">Arrival Time</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          {filteredBuses.length === 0 ? (
            <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6">
                No buses found matching your criteria
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                Try adjusting your filters to see more results
              </Typography>
            </Paper>
          ) : (
            filteredBuses.map((bus) => (
              <Card key={bus.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                      <Typography variant="subtitle1" color="text.secondary">
                        {bus.operator}
                      </Typography>
                      <Typography variant="body2">
                        {bus.busType}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        {bus.amenities.wifi && <Wifi fontSize="small" color="primary" sx={{ mr: 0.5 }} />}
                        {bus.amenities.power && <PowerSettingsNew fontSize="small" color="primary" sx={{ mr: 0.5 }} />}
                        {bus.amenities.refreshments && <LocalCafe fontSize="small" color="primary" sx={{ mr: 0.5 }} />}
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} sm={3}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h6">{bus.departure}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {departure}
                        </Typography>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} sm={3}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                          <AccessTime fontSize="small" sx={{ mr: 0.5 }} />
                          {bus.duration}
                        </Typography>
                        <Divider sx={{ width: '80%', my: 1 }} />
                        <Typography variant="h6">{bus.arrival}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {destination}
                        </Typography>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} sm={3}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <Typography variant="h5" color="primary" gutterBottom>
                          ${bus.price}
                        </Typography>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                          <AirlineSeatReclineNormal fontSize="small" sx={{ mr: 0.5 }} />
                          {bus.availableSeats} seats left
                        </Typography>
                        <Button 
                          variant="contained" 
                          color="primary"
                          sx={{ mt: 1 }}
                          onClick={() => handleSelectBus(bus.id)}
                        >
                          Select
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default SearchResultsPage;

