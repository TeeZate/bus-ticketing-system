import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Divider, 
  Button, 
  TextField, 
  FormControl, 
  FormControlLabel, 
  RadioGroup, 
  Radio, 
  Checkbox,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  InputAdornment,
  CircularProgress,
  Alert,
  Chip,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  CreditCard, 
  AccountBalance, 
  Payment as PaymentIcon, 
  Lock, 
  CheckCircle,
  Info,
  LocalOffer,
  Receipt,
  ArrowBack,
  CreditCardOff
} from '@mui/icons-material';

// Mock data for the booking details
const mockBookingData = {
  id: 'BK12345',
  busId: 'BUS789',
  busName: 'Express Deluxe',
  busOperator: 'Royal Travels',
  departureCity: 'New York',
  arrivalCity: 'Boston',
  departureDate: '2023-12-15',
  departureTime: '10:00 AM',
  arrivalTime: '2:30 PM',
  duration: '4h 30m',
  passengers: [
    { id: 1, name: 'John Doe', age: 32, gender: 'Male', seatNumber: 'A4' },
    { id: 2, name: 'Jane Doe', age: 28, gender: 'Female', seatNumber: 'A5' }
  ],
  fare: {
    baseFare: 45.00,
    taxes: 5.50,
    serviceCharge: 2.50,
    totalFare: 53.00
  }
};

// Payment method options
const paymentMethods = [
  { 
    id: 'credit_card', 
    name: 'Credit/Debit Card', 
    icon: <CreditCard />, 
    description: 'Pay securely with your credit or debit card',
    supported: ['Visa', 'Mastercard', 'American Express', 'Discover']
  },
  { 
    id: 'bank_transfer', 
    name: 'Bank Transfer', 
    icon: <AccountBalance />, 
    description: 'Direct transfer from your bank account',
    supported: ['ACH', 'Wire Transfer']
  },
  { 
    id: 'digital_wallet', 
    name: 'Digital Wallet', 
    icon: <PaymentIcon />, 
    description: 'Pay with your preferred digital wallet',
    supported: ['PayPal', 'Apple Pay', 'Google Pay']
  }
];

// Promo codes for testing
const validPromoCodes = [
  { code: 'FIRST10', discount: 10, type: 'percentage', description: '10% off for first-time users' },
  { code: 'SUMMER5', discount: 5, type: 'fixed', description: '$5 off summer promotion' }
];

const PaymentPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // State for booking data
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Payment form state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit_card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: ''
  });
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    routingNumber: '',
    accountHolderName: ''
  });
  const [walletDetails, setWalletDetails] = useState({
    walletType: 'PayPal',
    email: ''
  });
  
  // Promo code state
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [applyingPromo, setApplyingPromo] = useState(false);
  
  // Billing address state
  const [billingAddress, setBillingAddress] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  
  // Checkout state
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [savePaymentInfo, setSavePaymentInfo] = useState(false);
  const [sendReceipt, setSendReceipt] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  // Stepper state
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Review Booking', 'Payment Details', 'Confirmation'];
  
  // Calculate total after discount
  const calculateTotalAfterDiscount = () => {
    if (!booking) return 0;
    
    let total = booking.fare.totalFare;
    
    if (appliedPromo) {
      if (appliedPromo.type === 'percentage') {
        total = total * (1 - appliedPromo.discount / 100);
      } else {
        total = total - appliedPromo.discount;
      }
    }
    
    return Math.max(total, 0).toFixed(2);
  };
  
  // Fetch booking data
  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        // In a real app, this would be an API call
        // For demo purposes, we'll use the mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        setBooking(mockBookingData);
      } catch (err) {
        console.error('Error fetching booking data:', err);
        setError('Failed to load booking details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookingData();
  }, [id]);
  
  // Handle payment method change
  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };
  
  // Handle card details change
  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formattedValue = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .slice(0, 19);
      
      setCardDetails(prev => ({
        ...prev,
        [name]: formattedValue
      }));
      return;
    }
    
    // Format expiry date
    if (name === 'expiryDate') {
      const formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d{0,2})/, '$1/$2')
        .slice(0, 5);
      
      setCardDetails(prev => ({
        ...prev,
        [name]: formattedValue
      }));
      return;
    }
    
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle bank details change
  const handleBankDetailsChange = (e) => {
    const { name, value } = e.target;
    setBankDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle wallet details change
  const handleWalletDetailsChange = (e) => {
    const { name, value } = e.target;
    setWalletDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle billing address change
  const handleBillingAddressChange = (e) => {
    const { name, value } = e.target;
    setBillingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Apply promo code
  const handleApplyPromoCode = async () => {
    if (!promoCode.trim()) {
      setPromoError('Please enter a promo code');
      return;
    }
    
    setApplyingPromo(true);
    setPromoError('');
    
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll check against our valid promo codes
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundPromo = validPromoCodes.find(
        promo => promo.code.toLowerCase() === promoCode.toLowerCase()
      );
      
      if (foundPromo) {
        setAppliedPromo(foundPromo);
        setPromoCode('');
      } else {
        setPromoError('Invalid or expired promo code');
      }
    } catch (err) {
      setPromoError('Error applying promo code. Please try again.');
    } finally {
      setApplyingPromo(false);
    }
  };
  
  // Remove applied promo code
  const handleRemovePromoCode = () => {
    setAppliedPromo(null);
  };
  
  // Handle next step
  const handleNext = () => {
    if (activeStep === 0) {
      // Validate first step if needed
      setActiveStep(1);
    } else if (activeStep === 1) {
      // Validate payment details
      if (selectedPaymentMethod === 'credit_card') {
        if (!cardDetails.cardNumber || !cardDetails.cardholderName || 
            !cardDetails.expiryDate || !cardDetails.cvv) {
          setPaymentError('Please fill in all card details');
          return;
        }
      } else if (selectedPaymentMethod === 'bank_transfer') {
        if (!bankDetails.accountNumber || !bankDetails.routingNumber || 
            !bankDetails.accountHolderName) {
          setPaymentError('Please fill in all bank details');
          return;
        }
      } else if (selectedPaymentMethod === 'digital_wallet') {
        if (!walletDetails.email) {
          setPaymentError('Please enter your email address');
          return;
        }
      }
      
      if (!agreeToTerms) {
        setPaymentError('You must agree to the terms and conditions');
        return;
      }
      
      // Proceed to confirmation
      setPaymentError('');
      setActiveStep(2);
    }
  };
  
  // Handle back step
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setPaymentError('');
  };
  
  // Process payment
  const handleProcessPayment = async () => {
    setIsProcessing(true);
    setPaymentError('');
    
    try {
      // In a real app, this would be an API call to process the payment
      // For demo purposes, we'll simulate a successful payment after a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful payment
      setPaymentSuccess(true);
      
      // Redirect to confirmation page after 2 seconds
      setTimeout(() => {
        navigate(`/confirmation/${id}`, { 
          state: { 
            paymentMethod: selectedPaymentMethod,
            totalPaid: calculateTotalAfterDiscount(),
            bookingId: booking.id
          } 
        });
      }, 2000);
    } catch (err) {
      console.error('Payment processing error:', err);
      setPaymentError('An error occurred while processing your payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Render loading state
  if (loading) {
    return (
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading payment details...
        </Typography>
      </Box>
    );
  }
  
  // Render error state
  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </Container>
    );
  }
  
  // Render payment success state
  if (paymentSuccess) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Payment Successful!
          </Typography>
          <Typography variant="body1" paragraph>
            Your payment of ${calculateTotalAfterDiscount()} has been processed successfully.
          </Typography>
          <Typography variant="body1" paragraph>
            Redirecting you to the booking confirmation page...
          </Typography>
          <CircularProgress size={30} sx={{ mt: 2 }} />
        </Paper>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stepper 
        activeStep={activeStep} 
        alternativeLabel={!isMobile}
        orientation={isMobile ? 'vertical' : 'horizontal'}
        sx={{ mb: 4 }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      {activeStep === 0 && booking && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" component="h1" fontWeight="bold">
                  Review Your Booking
                </Typography>
                <Chip 
                  label={`Booking ID: ${booking.id}`} 
                  color="primary" 
                  variant="outlined" 
                />
              </Box>
              
              <Divider sx={{ mb: 3 }} />
              
              <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                  Journey Details
                </Typography>
                
                <Card variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Bus Operator
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {booking.busOperator}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Bus Type
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {booking.busName}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ my: 1 }} />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <Typography variant="body2" color="text.secondary">
                          From
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {booking.departureCity}
                        </Typography>
                        <Typography variant="body2">
                          {booking.departureDate}, {booking.departureTime}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={2} sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        flexDirection: 'column'
                      }}>
                        <Typography variant="body2" color="text.secondary" align="center">
                          Duration
                        </Typography>
                        <Typography variant="body2" align="center">
                          {booking.duration}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <Typography variant="body2" color="text.secondary">
                          To
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {booking.arrivalCity}
                        </Typography>
                        <Typography variant="body2">
                          {booking.departureDate}, {booking.arrivalTime}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Passenger Details
                </Typography>
                
                {booking.passengers.map((passenger, index) => (
                  <Card key={passenger.id} variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="text.secondary">
                            Passenger {index + 1}
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {passenger.name}
                          </Typography>
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <Typography variant="body2" color="text.secondary">
                            Age
                          </Typography>
                          <Typography variant="body1">
                            {passenger.age}
                          </Typography>
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <Typography variant="body2" color="text.secondary">
                            Gender
                          </Typography>
                          <Typography variant="body1">
                            {passenger.gender}
                          </Typography>
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <Typography variant="body2" color="text.secondary">
                            Seat
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {passenger.seatNumber}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2, position: 'sticky', top: 20 }}>
              <Typography variant="h6" gutterBottom>
                Price Details
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={1}>
                  <Grid item xs={8}>
                    <Typography variant="body2">
                      Base Fare ({booking.passengers.length} {booking.passengers.length > 1 ? 'passengers' : 'passenger'})
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2" align="right">
                      ${booking.fare.baseFare.toFixed(2)}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={8}>
                    <Typography variant="body2">
                      Taxes
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2" align="right">
                      ${booking.fare.taxes.toFixed(2)}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={8}>
                    <Typography variant="body2">
                      Service Charge
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2" align="right">
                      ${booking.fare.serviceCharge.toFixed(2)}
                    </Typography>
                  </Grid>
                  
                  {appliedPromo && (
                    <>
                      <Grid item xs={12}>
                        <Divider sx={{ my: 1 }} />
                      </Grid>
                      
                      <Grid item xs={8}>
                        <Typography variant="body2" color="success.main" sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocalOffer fontSize="small" sx={{ mr: 0.5 }} />
                          Promo ({appliedPromo.code})
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="body2" color="success.main" align="right">
                          {appliedPromo.type === 'percentage' 
                            ? `-${appliedPromo.discount}%` 
                            : `-$${appliedPromo.discount.toFixed(2)}`}
                        </Typography>
                      </Grid>
                    </>
                  )}
                  
                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                  </Grid>
                  
                  <Grid item xs={8}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Total Amount
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="subtitle1" fontWeight="bold" align="right">
                      ${calculateTotalAfterDiscount()}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              
              {!appliedPromo && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="body2" gutterBottom>
                    Have a promo code?
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={8}>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        error={!!promoError}
                        disabled={applyingPromo}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={handleApplyPromoCode}
                        disabled={applyingPromo || !promoCode.trim()}
                      >
                        {applyingPromo ? 'Applying...' : 'Apply'}
                      </Button>
                    </Grid>
                    {promoError && (
                      <Grid item xs={12}>
                        <Typography variant="caption" color="error">
                          {promoError}
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              )}
              
              {appliedPromo && (
                <Box sx={{ mt: 2 }}>
                  <Alert 
                    severity="success"
                    action={
                      <Button 
                        color="inherit" 
                        size="small" 
                        onClick={handleRemovePromoCode}
                      >
                        Remove
                      </Button>
                    }
                  >
                    {appliedPromo.description}
                  </Alert>
                </Box>
              )}
              
              <Box sx={{ mt: 3 }}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleNext}
                  sx={{ py: 1.5 }}
                >
                  Proceed to Payment
                </Button>
                
                <Button
                  fullWidth
                  variant="text"
                  onClick={() => navigate(-1)}
                  sx={{ mt: 1 }}
                >
                  Cancel and Go Back
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}
      
      {activeStep === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
              <Typography variant="h5" component="h1" fontWeight="bold" gutterBottom>
                Payment Method
              </Typography>
              
              <FormControl component="fieldset" sx={{ width: '100%', mt: 2 }}>
                <RadioGroup
                  aria-label="payment-method"
                  name="payment-method"
                  value={selectedPaymentMethod}
                  onChange={handlePaymentMethodChange}
                >
                  {paymentMethods.map((method) => (
                    <Paper
                      key={method.id}
                      variant="outlined"
                      sx={{
                        mb: 2,
                        p: 2,
                        borderColor: selectedPaymentMethod === method.id ? 'primary.main' : 'divider',
                        borderWidth: selectedPaymentMethod === method.id ? 2 : 1,
                        borderRadius: 1
                      }}
                    >
                      <FormControlLabel
                        value={method.id}
                        control={<Radio />}
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {method.icon}
                            <Typography sx={{ ml: 1, fontWeight: 'medium' }}>
                              {method.name}
                            </Typography>
                          </Box>
                        }
                        sx={{ width: '100%', m: 0 }}
                      />
                      
                      {selectedPaymentMethod === method.id && (
                        <Box sx={{ mt: 2, ml: 4 }}>
                          <Typography variant="body2" color="text.secondary" paragraph>
                            {method.description}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                            {method.supported.map((item) => (
                              <Chip
                                key={item}
                                label={item}
                                size="small"
                                variant="outlined"
                              />
                            ))}
                          </Box>
                          
                          {selectedPaymentMethod === 'credit_card' && (
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <TextField
                                  fullWidth
                                  label="Card Number"
                                  name="cardNumber"
                                  value={cardDetails.cardNumber}
                                  onChange={handleCardDetailsChange}
                                  placeholder="1234 5678 9012 3456"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <CreditCard color="action" />
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  fullWidth
                                  label="Cardholder Name"
                                  name="cardholderName"
                                  value={cardDetails.cardholderName}
                                  onChange={handleCardDetailsChange}
                                  placeholder="John Doe"
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  fullWidth
                                  label="Expiry Date"
                                  name="expiryDate"
                                  value={cardDetails.expiryDate}
                                  onChange={handleCardDetailsChange}
                                  placeholder="MM/YY"
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  fullWidth
                                  label="CVV"
                                  name="cvv"
                                  value={cardDetails.cvv}
                                  onChange={handleCardDetailsChange}
                                  placeholder="123"
                                  type="password"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Lock fontSize="small" />
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </Grid>
                            </Grid>
                          )}
                          
                          {selectedPaymentMethod === 'bank_transfer' && (
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <TextField
                                  fullWidth
                                  label="Account Number"
                                  name="accountNumber"
                                  value={bankDetails.accountNumber}
                                  onChange={handleBankDetailsChange}
                                  placeholder="123456789"
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  fullWidth
                                  label="Routing Number"
                                  name="routingNumber"
                                  value={bankDetails.routingNumber}
                                  onChange={handleBankDetailsChange}
                                  placeholder="987654321"
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  fullWidth
                                  label="Account Holder Name"
                                  name="accountHolderName"
                                  value={bankDetails.accountHolderName}
                                  onChange={handleBankDetailsChange}
                                  placeholder="John Doe"
                                />
                              </Grid>
                            </Grid>
                          )}
                          
                          {selectedPaymentMethod === 'digital_wallet' && (
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <FormControl fullWidth>
                                  <RadioGroup
                                    row
                                    name="walletType"
                                    value={walletDetails.walletType}
                                    onChange={handleWalletDetailsChange}
                                  >
                                    <FormControlLabel value="PayPal" control={<Radio />} label="PayPal" />
                                    <FormControlLabel value="Apple Pay" control={<Radio />} label="Apple Pay" />
                                    <FormControlLabel value="Google Pay" control={<Radio />} label="Google Pay" />
                                  </RadioGroup>
                                </FormControl>
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  fullWidth
                                  label="Email Address"
                                  name="email"
                                  type="email"
                                  value={walletDetails.email}
                                  onChange={handleWalletDetailsChange}
                                  placeholder="your.email@example.com"
                                />
                              </Grid>
                            </Grid>
                          )}
                        </Box>
                      )}
                    </Paper>
                  ))}
                </RadioGroup>
              </FormControl>
              
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Billing Address
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address Line 1"
                      name="addressLine1"
                      value={billingAddress.addressLine1}
                      onChange={handleBillingAddressChange}
                      placeholder="Street address, P.O. box, company name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address Line 2"
                      name="addressLine2"
                      value={billingAddress.addressLine2}
                      onChange={handleBillingAddressChange}
                      placeholder="Apartment, suite, unit, building, floor, etc."
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="City"
                      name="city"
                      value={billingAddress.city}
                      onChange={handleBillingAddressChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="State/Province"
                      name="state"
                      value={billingAddress.state}
                      onChange={handleBillingAddressChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="ZIP/Postal Code"
                      name="zipCode"
                      value={billingAddress.zipCode}
                      onChange={handleBillingAddressChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Country"
                      name="country"
                      value={billingAddress.country}
                      onChange={handleBillingAddressChange}
                    />
                  </Grid>
                </Grid>
              </Box>
              
              <Box sx={{ mt: 4 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={savePaymentInfo}
                      onChange={(e) => setSavePaymentInfo(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Save payment information for future bookings"
                />
                
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={sendReceipt}
                      onChange={(e) => setSendReceipt(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Email me a receipt"
                />
                
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="body2">
                      I agree to the{' '}
                      {/* <Link href="/terms" underline="hover">
                        Terms & Conditions
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy-policy" underline="hover">
                        Privacy Policy
                      </Link> */}
                    </Typography>
                  }
                />
              </Box>
              
              {paymentError && (
                <Alert severity="error" sx={{ mt: 3 }}>
                  {paymentError}
                </Alert>
              )}
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2, position: 'sticky', top: 20 }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={1}>
                  <Grid item xs={8}>
                    <Typography variant="body2">
                      {booking.departureCity} to {booking.arrivalCity}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2" align="right">
                      ${booking.fare.baseFare.toFixed(2)}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={8}>
                    <Typography variant="body2">
                      Taxes & Fees
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2" align="right">
                      ${(booking.fare.taxes + booking.fare.serviceCharge).toFixed(2)}
                    </Typography>
                  </Grid>
                  
                  {appliedPromo && (
                    <>
                      <Grid item xs={8}>
                        <Typography variant="body2" color="success.main">
                          Promo ({appliedPromo.code})
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="body2" color="success.main" align="right">
                          {appliedPromo.type === 'percentage' 
                            ? `-${appliedPromo.discount}%` 
                            : `-$${appliedPromo.discount.toFixed(2)}`}
                        </Typography>
                      </Grid>
                    </>
                  )}
                  
                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                  </Grid>
                  
                  <Grid item xs={8}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Total
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="subtitle1" fontWeight="bold" align="right">
                      ${calculateTotalAfterDiscount()}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              
              <Box sx={{ mt: 3 }}>
                <Alert severity="info" icon={<Info />} sx={{ mb: 3 }}>
                  <Typography variant="body2">
                    Your payment information is encrypted and secure. We never store your full card details.
                  </Typography>
                </Alert>
                
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleNext}
                  sx={{ py: 1.5 }}
                >
                  Review Order
                </Button>
                
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleBack}
                  sx={{ mt: 2 }}
                >
                  Back
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}
      
      {activeStep === 2 && (
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h5" component="h1" fontWeight="bold" gutterBottom>
                Review and Confirm
              </Typography>
              
              <Alert severity="info" sx={{ my: 2 }}>
                Please review your order details before completing your purchase.
              </Alert>
              
              <Box sx={{ my: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Trip Summary
                </Typography>
                
                <Card variant="outlined" sx={{ mb: 3 }}>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          From
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {booking.departureCity}
                        </Typography>
                        <Typography variant="body2">
                          {booking.departureDate}, {booking.departureTime}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          To
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {booking.arrivalCity}
                        </Typography>
                        <Typography variant="body2">
                          {booking.departureDate}, {booking.arrivalTime}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ my: 1 }} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Bus Operator
                        </Typography>
                        <Typography variant="body1">
                          {booking.busOperator} - {booking.busName}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Passengers
                        </Typography>
                        <Typography variant="body1">
                          {booking.passengers.length} {booking.passengers.length > 1 ? 'passengers' : 'passenger'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
              
              <Box sx={{ my: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Payment Details
                </Typography>
                
                <Card variant="outlined" sx={{ mb: 3 }}>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Payment Method
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {selectedPaymentMethod === 'credit_card' && (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CreditCard sx={{ mr: 1 }} />
                              {cardDetails.cardNumber ? 
                                `Card ending in ${cardDetails.cardNumber.slice(-4)}` : 
                                'Credit/Debit Card'}
                            </Box>
                          )}
                          {selectedPaymentMethod === 'bank_transfer' && (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <AccountBalance sx={{ mr: 1 }} />
                              Bank Transfer
                            </Box>
                          )}
                          {selectedPaymentMethod === 'digital_wallet' && (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <PaymentIcon sx={{ mr: 1 }} />
                              {walletDetails.walletType}
                            </Box>
                          )}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Billing Address
                        </Typography>
                        <Typography variant="body1">
                          {billingAddress.addressLine1 ? 
                            `${billingAddress.city}, ${billingAddress.state}, ${billingAddress.country}` : 
                            'Not provided'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
              
              <Box sx={{ my: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Price Details
                </Typography>
                
                <Card variant="outlined">
                  <CardContent>
                    <Grid container spacing={1}>
                      <Grid item xs={8}>
                        <Typography variant="body2">
                          Base Fare
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="body2" align="right">
                          ${booking.fare.baseFare.toFixed(2)}
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={8}>
                        <Typography variant="body2">
                          Taxes
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="body2" align="right">
                          ${booking.fare.taxes.toFixed(2)}
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={8}>
                        <Typography variant="body2">
                          Service Charge
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="body2" align="right">
                          ${booking.fare.serviceCharge.toFixed(2)}
                        </Typography>
                      </Grid>
                      
                      {appliedPromo && (
                        <>
                          <Grid item xs={8}>
                            <Typography variant="body2" color="success.main" sx={{ display: 'flex', alignItems: 'center' }}>
                              <LocalOffer fontSize="small" sx={{ mr: 0.5 }} />
                              Promo ({appliedPromo.code})
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography variant="body2" color="success.main" align="right">
                              {appliedPromo.type === 'percentage' 
                                ? `-${appliedPromo.discount}%` 
                                : `-$${appliedPromo.discount.toFixed(2)}`}
                            </Typography>
                          </Grid>
                        </>
                      )}
                      
                      <Grid item xs={12}>
                        <Divider sx={{ my: 1 }} />
                      </Grid>
                      
                      <Grid item xs={8}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Total Amount
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="subtitle1" fontWeight="bold" align="right">
                          ${calculateTotalAfterDiscount()}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
              
              <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
                  By clicking "Complete Payment", you agree to our Terms & Conditions and Privacy Policy.
                </Typography>
                
                {paymentError && (
                  <Alert severity="error" sx={{ mb: 3, width: '100%' }}>
                  {paymentError}
                </Alert>
              )}
              
              <Box sx={{ display: 'flex', gap: 2, width: '100%', flexDirection: { xs: 'column', sm: 'row' } }}>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleBack}
                  sx={{ flex: 1, py: 1.5 }}
                  disabled={isProcessing}
                >
                  Back
                </Button>
                
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleProcessPayment}
                  sx={{ flex: 2, py: 1.5 }}
                  disabled={isProcessing}
                  startIcon={isProcessing ? <CircularProgress size={20} color="inherit" /> : <Lock />}
                >
                  {isProcessing ? 'Processing...' : `Complete Payment ($${calculateTotalAfterDiscount()})`}
                </Button>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 3 }}>
                <Lock fontSize="small" color="action" sx={{ mr: 1 }} />
                <Typography variant="caption" color="text.secondary">
                  Secure payment processed with encryption
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2, position: 'sticky', top: 20 }}>
            <Typography variant="h6" gutterBottom>
              Need Help?
            </Typography>
            
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" paragraph>
                If you have any questions or need assistance with your payment, our customer support team is here to help.
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="body2" fontWeight="medium">
                  Customer Support:
                </Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  1-800-BUS-RIDE
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="body2" fontWeight="medium">
                  Email:
                </Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  support@busticketbooking.com
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" fontWeight="medium">
                  Hours:
                </Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  24/7, 365 days a year
                </Typography>
              </Box>
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h6" gutterBottom>
              Cancellation Policy
            </Typography>
            
            <Typography variant="body2" paragraph>
              • Free cancellation up to 24 hours before departure
            </Typography>
            <Typography variant="body2" paragraph>
              • 50% refund for cancellations between 24 and 12 hours before departure
            </Typography>
            <Typography variant="body2" paragraph>
              • No refund for cancellations less than 12 hours before departure
            </Typography>
            
            <Button
              fullWidth
              variant="text"
              component="a"
              href="/cancellation-policy"
              sx={{ mt: 1 }}
            >
              View Full Policy
            </Button>
          </Paper>
        </Grid>
      </Grid>
    )}
  </Container>
);
};

export default PaymentPage;



