import React from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  Paper,
  Grid
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { SentimentVeryDissatisfied, Home, Search, ArrowBack } from '@mui/icons-material';

const NotFoundPage = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="md">
        <Paper 
          elevation={3} 
          sx={{ 
            p: { xs: 3, md: 5 }, 
            borderRadius: 2,
            textAlign: 'center'
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h1" 
              component="h1" 
              sx={{ 
                fontSize: { xs: '6rem', md: '8rem' },
                fontWeight: 'bold',
                color: 'primary.main',
                lineHeight: 1
              }}
            >
              404
            </Typography>
            
            <SentimentVeryDissatisfied 
              sx={{ 
                fontSize: { xs: 60, md: 80 },
                color: 'text.secondary',
                my: 2
              }} 
            />
            
            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom
              sx={{ fontWeight: 'medium' }}
            >
              Page Not Found
            </Typography>
            
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ maxWidth: 500, mx: 'auto', mb: 4 }}
            >
              Oops! The page you are looking for might have been removed, had its name changed, 
              or is temporarily unavailable.
            </Typography>
          </Box>
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="body1" paragraph>
              Here are some helpful links instead:
            </Typography>
            
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={4}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  component={RouterLink}
                  to="/"
                  startIcon={<Home />}
                  sx={{ py: 1.5 }}
                >
                  Go to Home
                </Button>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  component={RouterLink}
                  to="/search"
                  startIcon={<Search />}
                  sx={{ py: 1.5 }}
                >
                  Search Buses
                </Button>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  onClick={() => window.history.back()}
                  startIcon={<ArrowBack />}
                  sx={{ py: 1.5 }}
                >
                  Go Back
                </Button>
              </Grid>
            </Grid>
          </Box>
          
          <Box sx={{ mt: 6, pt: 4, borderTop: 1, borderColor: 'divider' }}>
            <Typography variant="body2" color="text.secondary">
              If you believe this is an error, please{' '}
              <RouterLink to="/contact" style={{ color: 'inherit', fontWeight: 'bold' }}>
                contact our support team
              </RouterLink>
              .
            </Typography>
          </Box>
        </Paper>
        
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Error Code: 404 | Page Not Found
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
