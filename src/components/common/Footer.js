import React from 'react';
import { Box, Container, Grid, Typography, Link, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
      component="footer"
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              BusTickets
            </Typography>
            <Typography variant="body2">
              Your reliable partner for bus ticket booking across the country.
              Travel with comfort and convenience.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link component={RouterLink} to="/" color="inherit" display="block" sx={{ mb: 1 }}>
              Home
            </Link>
            <Link component={RouterLink} to="/about" color="inherit" display="block" sx={{ mb: 1 }}>
              About Us
            </Link>
            <Link component={RouterLink} to="/contact" color="inherit" display="block" sx={{ mb: 1 }}>
              Contact
            </Link>
            <Link component={RouterLink} to="/terms" color="inherit" display="block" sx={{ mb: 1 }}>
              Terms & Conditions
            </Link>
            <Link component={RouterLink} to="/privacy-policy" color="inherit" display="block">
              Privacy Policy
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" paragraph>
              123 Bus Terminal Road,<br />
              City Center, Country
            </Typography>
            <Typography variant="body2" paragraph>
              Email: info@bustickets.com<br />
              Phone: +1 234 567 890
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3, bgcolor: 'rgba(255,255,255,0.2)' }} />
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} BusTickets. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
