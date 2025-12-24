import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Link,
  InputAdornment,
  Alert,
  Divider
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Email, ArrowBack } from '@mui/icons-material';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate email
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to send a password reset email
      // For demo purposes, we'll simulate a successful request after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Forgot password error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        {!isSubmitted ? (
          <>
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                Forgot Password
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enter your email address and we'll send you a link to reset your password
              </Typography>
            </Box>
            
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2, py: 1.2 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Reset Link'}
              </Button>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ textAlign: 'center' }}>
                <Button
                  component={RouterLink}
                  to="/login"
                  startIcon={<ArrowBack />}
                  sx={{ textTransform: 'none' }}
                >
                  Back to Login
                </Button>
              </Box>
            </Box>
          </>
        ) : (
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Email sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Check Your Email
            </Typography>
            <Typography variant="body1" paragraph>
              We've sent a password reset link to:
            </Typography>
            <Typography variant="body1" fontWeight="medium" paragraph>
              {email}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph sx={{ mt: 2 }}>
              If you don't see the email, check other places it might be, like your junk, spam, social, or other folders.
            </Typography>
            
            <Divider sx={{ my: 3 }} />
            
            <Box>
              <Typography variant="body2" paragraph>
                Didn't receive the email?
              </Typography>
              <Button 
                variant="outlined" 
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                Resend Email
              </Button>
            </Box>
            
            <Box sx={{ mt: 3 }}>
              <Button
                component={RouterLink}
                to="/login"
                startIcon={<ArrowBack />}
                sx={{ textTransform: 'none' }}
              >
                Back to Login
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default ForgotPasswordPage;
