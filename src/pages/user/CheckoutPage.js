import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Button, 
  TextField, 
  Divider, 
  Stepper,
  Step,
  StepLabel,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Alert,
  Card,
  CardContent,
  CircularProgress
} from '@mui/material';
import { 
  ArrowBack, 
  Person, 
  Email, 
  Phone, 
  CreditCard, 
  AccountBalance, 
  Payment
} from '@mui/icons-material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../../context/AuthContext';

// Payment method options
const paymentMethods = [
  { id: 'credit_card', name: 'Credit/Debit Card', icon: <CreditCard /> },
  { id: 'paypal', name: 'PayPal', icon: <Payment /> },
  { id: 'bank_transfer', name: 'Bank Transfer', icon: <AccountBalance /> },
  { id: 'mobile_money', name: 'Mobile Money (EcoCash)', icon: <Phone /> }
];

// Validation schema for passenger information
const passengerSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  country: Yup.string().required('Country is required'),
  termsAccepted: Yup.boolean().oneOf([true], 'You must accept the terms and conditions')
});

// Steps in the checkout process
const steps = ['Passenger Information', 'Payment', 'Confirmation'];

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  
  const { 
    bus, 
    selectedSeats, 
    boardingPoint, 
    droppingPoint, 
    date, 
    totalPrice 
  } = location.state || {};
  
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  
  // If we don't have the necessary data, redirect to home
  if (!bus || !selectedSeats || !boardingPoint || !droppingPoint) {
    navigate('/');
    return null;
  }

  const handleGoBack = () => {
    if (activeStep === 0) {
      navigate(-1);
    } else {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmitPassengerInfo = (values) => {
    // Move to payment step
    handleNext();
  };

  const handlePaymentSubmit = async () => {
    setProcessing(true);
    setError('');
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a random booking reference
      const bookingReference = Math.random().toString(36).substring(2, 10).toUpperCase();
      
      // Navigate to confirmation page
      navigate(`/booking-confirmation/${bookingReference}`, {
        state: {
          bookingReference,
          bus,
          selectedSeats,
          boardingPoint,
          droppingPoint,
          date,
          totalPrice,
          paymentMethod
        }
      });
    } catch (err) {
      setError('Payment processing failed. Please try again.');
      setProcessing(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button 
        startIcon={<ArrowBack />} 
        onClick={handleGoBack}
        sx={{ mb: 2 }}
        disabled={processing}
      >
        {activeStep === 0 ? 'Back to seat selection' : 'Back'}
      </Button>
      
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <Grid container spacing={3}>
        {/* Main content */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3 }}>
            {activeStep === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Passenger Information
                </Typography>
                
                <Formik
                  initialValues={{
                    firstName: currentUser?.firstName || '',
                    lastName: currentUser?.lastName || '',
                    email: currentUser?.email || '',
                    phone: currentUser?.phone || '',
                    address: currentUser?.address || '',
                    city: currentUser?.city || '',
                    country: currentUser?.country || '',
                    termsAccepted: false
                  }}
                  validationSchema={passengerSchema}
                  onSubmit={handleSubmitPassengerInfo}
                >
                  {({ errors, touched, values, handleChange }) => (
                    <Form>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Field
                            as={TextField}
                            name="firstName"
                            label="First Name"
                            fullWidth
                            error={touched.firstName && Boolean(errors.firstName)}
                            helperText={touched.firstName && errors.firstName}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field
                            as={TextField}
                            name="lastName"
                            label="Last Name"
                            fullWidth
                            error={touched.lastName && Boolean(errors.lastName)}
                            helperText={touched.lastName && errors.lastName}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            name="email"
                            label="Email"
                            fullWidth
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            name="phone"
                            label="Phone Number"
                            fullWidth
                            error={touched.phone && Boolean(errors.phone)}
                            helperText={touched.phone && errors.phone}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            name="address"
                            label="Address"
                            fullWidth
                            error={touched.address && Boolean(errors.address)}
                            helperText={touched.address && errors.address}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field
                            as={TextField}
                            name="city"
                            label="City"
                            fullWidth
                            error={touched.city && Boolean(errors.city)}
                            helperText={touched.city && errors.city}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field
                            as={TextField}
                            name="country"
                            label="Country"
                            fullWidth
                            error={touched.country && Boolean(errors.country)}
                            helperText={touched.country && errors.country}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="termsAccepted"
                                checked={values.termsAccepted}
                                onChange={handleChange}
                                color="primary"
                              />
                            }
                            label="I accept the terms and conditions"
                          />
                          {touched.termsAccepted && errors.termsAccepted && (
                            <Typography variant="caption" color="error">
                              {errors.termsAccepted}
                            </Typography>
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                          >
                            Continue to Payment
                          </Button>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Box>
            )}
            
            {activeStep === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Payment Method
                </Typography>
                
                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}
                
                <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
                  <FormLabel component="legend">Select a payment method</FormLabel>
                  <RadioGroup
                    name="paymentMethod"
                    value={paymentMethod}
                    onChange={handlePaymentMethodChange}
                  >
                    {paymentMethods.map((method) => (
                      <Paper
                        key={method.id}
                        elevation={paymentMethod === method.id ? 3 : 1}
                        sx={{
                          mb: 1,
                          p: 1,
                          border: paymentMethod === method.id ? '2px solid' : '1px solid',
                          borderColor: paymentMethod === method.id ? 'primary.main' : 'grey.300',
                          borderRadius: 1
                        }}
                      >
                        <FormControlLabel
                          value={method.id}
                          control={<Radio />}
                          label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {method.icon}
                              <Typography sx={{ ml: 1 }}>{method.name}</Typography>
                            </Box>
                          }
                          sx={{ width: '100%', m: 0 }}
                        />
                      </Paper>
                    ))}
                  </RadioGroup>
                </FormControl>
                
                {paymentMethod === 'credit_card' && (
                  <Box>
                    <Typography variant="subtitle1" gutterBottom>
                      Credit Card Details
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          label="Card Number"
                          fullWidth
                          placeholder="1234 5678 9012 3456"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Expiry Date"
                          fullWidth
                          placeholder="MM/YY"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="CVV"
                          fullWidth
                          placeholder="123"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Cardholder Name"
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}
                
                {paymentMethod === 'paypal' && (
                  <Box sx={{ textAlign: 'center', py: 2 }}>
                    <Typography variant="body1" gutterBottom>
                      You will be redirected to PayPal to complete your payment.
                    </Typography>
                  </Box>
                )}
                
                {paymentMethod === 'bank_transfer' && (
                  <Box sx={{ py: 2 }}>
                    <Typography variant="body1" gutterBottom>
                      Please use the following details to make your bank transfer:
                    </Typography>
                    <Typography variant="body2">
                      Bank: National Bank<br />
                      Account Name: BusTickets Inc.<br />
                      Account Number: 1234567890<br />
                      Reference: Your email address
                    </Typography>
                  </Box>
                )}
                
                {paymentMethod === 'mobile_money' && (
                  <Box sx={{ py: 2 }}>
                    <Typography variant="body1" gutterBottom>
                      Please enter your mobile money details:
                    </Typography>
                    <TextField
                      label="Mobile Number"
                      fullWidth
                      sx={{ mb: 2 }}
                    />
                  </Box>
                )}
                
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  onClick={handlePaymentSubmit}
                  disabled={processing}
                  sx={{ mt: 3 }}
                >
                  {processing ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    `Pay $${totalPrice}`
                  )}
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
        
        {/* Order summary */}
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1">
                  {bus.operator} - {bus.busType}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {date}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">From:</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {bus.from} ({boardingPoint.name})
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">To:</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {bus.to} ({droppingPoint.name})
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Departure:</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {boardingPoint.time}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Arrival:</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {droppingPoint.time}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Seats:</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {selectedSeats.map(seat => seat.number).join(', ')}
                </Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Ticket Price:</Typography>
                <Typography variant="body2">
                  ${bus.price} x {selectedSeats.length}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Service Fee:</Typography>
                <Typography variant="body2">
                  $5.00
                </Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Total:
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold" color="primary">
                  ${totalPrice + 5}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;

