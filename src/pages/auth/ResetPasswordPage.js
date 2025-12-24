import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  InputAdornment,
  IconButton,
  Alert,
  Link,
  CircularProgress
} from '@mui/material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { Visibility, VisibilityOff, Lock, CheckCircle } from '@mui/icons-material';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // In a real app, you would get the token from the URL query parameters
  // For this demo, we'll simulate having a token
  const [token, setToken] = useState('');
  const [isValidToken, setIsValidToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  useEffect(() => {
    // In a real app, you would validate the token with your backend
    // For this demo, we'll simulate token validation
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get('token');
    
    setToken(tokenFromUrl || 'demo-token');
    
    const validateToken = async () => {
      try {
        // Simulate API call to validate token
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo purposes, consider the token valid if it exists
        const isValid = !!tokenFromUrl || true;
        setIsValidToken(isValid);
      } catch (err) {
        console.error('Token validation error:', err);
        setIsValidToken(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    validateToken();
  }, [location.search]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate form
    if (!formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields');
      return;
    }
    
    // Password validation
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to reset the password
      // For demo purposes, we'll simulate a successful reset after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login', { 
          state: { 
            message: 'Your password has been reset successfully. You can now log in with your new password.' 
          } 
        });
      }, 3000);
    } catch (err) {
      setError('An error occurred while resetting your password. Please try again.');
      console.error('Reset password error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Validating your reset link...
        </Typography>
      </Container>
    );
  }
  
  if (!isValidToken) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}>
          <Typography variant="h5" color="error" gutterBottom>
            Invalid or Expired Link
          </Typography>
          <Typography variant="body1" paragraph>
            The password reset link you clicked is invalid or has expired.
          </Typography>
          <Typography variant="body1" paragraph>
            Please request a new password reset link.
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/forgot-password"
            sx={{ mt: 2 }}
          >
            Request New Link
          </Button>
        </Paper>
      </Container>
    );
  }
  
  if (isSuccess) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}>
          <CheckCircle sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Password Reset Successful!
          </Typography>
          <Typography variant="body1" paragraph>
            Your password has been reset successfully.
          </Typography>
          <Typography variant="body1" paragraph>
            You will be redirected to the login page in a few seconds...
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/login"
            sx={{ mt: 2 }}
          >
            Go to Login
          </Button>
        </Paper>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Reset Password
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please enter your new password below
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
            name="password"
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            helperText="Password must be at least 8 characters long"
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm New Password"
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
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
            {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
          </Button>
          
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Link component={RouterLink} to="/login" variant="body2">
              Back to Login
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ResetPasswordPage;
