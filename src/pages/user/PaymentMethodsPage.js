import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Button, 
  TextField, 
  Card,
  CardContent,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Radio,
  RadioGroup,
  FormControlLabel
} from '@mui/material';
import { 
  CreditCard, 
  Delete, 
  Edit, 
  Add, 
  Check, 
  ArrowBack,
  Payment,
  AccountBalance,
  PaymentOutlined
} from '@mui/icons-material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../context/AuthContext';

// Credit card validation schema
const creditCardSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .required('Card number is required')
    .matches(/^[0-9]{16}$/, 'Card number must be 16 digits'),
  cardholderName: Yup.string().required('Cardholder name is required'),
  expiryMonth: Yup.string().required('Expiry month is required'),
  expiryYear: Yup.string().required('Expiry year is required'),
  cvv: Yup.string()
    .required('CVV is required')
    .matches(/^[0-9]{3,4}$/, 'CVV must be 3 or 4 digits'),
  isDefault: Yup.boolean()
});

// Generate mock payment methods
const generateMockPaymentMethods = () => {
  return [
    {
      id: 'pm_1',
      type: 'credit_card',
      cardNumber: '4111111111111111',
      cardholderName: 'John Doe',
      expiryMonth: '12',
      expiryYear: '2025',
      brand: 'visa',
      isDefault: true
    },
    {
      id: 'pm_2',
      type: 'credit_card',
      cardNumber: '5555555555554444',
      cardholderName: 'John Doe',
      expiryMonth: '10',
      expiryYear: '2024',
      brand: 'mastercard',
      isDefault: false
    }
  ];
};

const PaymentMethodsPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [paymentMethodToDelete, setPaymentMethodToDelete] = useState(null);
  const [deleteProcessing, setDeleteProcessing] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [addError, setAddError] = useState('');
  
  useEffect(() => {
    // Check if user is logged in
    if (!currentUser) {
      navigate('/login', { state: { from: '/payment-methods' } });
      return;
    }
    
    // Simulate API call to fetch payment methods
    setTimeout(() => {
      const mockPaymentMethods = generateMockPaymentMethods();
      setPaymentMethods(mockPaymentMethods);
      setLoading(false);
    }, 800);
  }, [currentUser, navigate]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleOpenAddDialog = () => {
    setAddDialogOpen(true);
    setAddSuccess(false);
    setAddError('');
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
  };

  const handleOpenDeleteDialog = (paymentMethod) => {
    setPaymentMethodToDelete(paymentMethod);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setPaymentMethodToDelete(null);
  };

  const handleAddPaymentMethod = async (values, { setSubmitting, resetForm }) => {
    setAddSuccess(false);
    setAddError('');
    
    try {
      // Simulate API call to add payment method
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a new payment method object
      const newPaymentMethod = {
        id: `pm_${Math.random().toString(36).substring(2, 10)}`,
        type: 'credit_card',
        cardNumber: values.cardNumber,
        cardholderName: values.cardholderName,
        expiryMonth: values.expiryMonth,
        expiryYear: values.expiryYear,
        brand: values.cardNumber.startsWith('4') ? 'visa' : 
               values.cardNumber.startsWith('5') ? 'mastercard' : 
               'unknown',
        isDefault: values.isDefault
      };
      
      // If the new card is set as default, update other cards
      let updatedPaymentMethods = [...paymentMethods];
      if (values.isDefault) {
        updatedPaymentMethods = updatedPaymentMethods.map(pm => ({
          ...pm,
          isDefault: false
        }));
      }
      
      // Add the new payment method
      setPaymentMethods([...updatedPaymentMethods, newPaymentMethod]);
      
      setAddSuccess(true);
      resetForm();
      
      // Close the dialog after a short delay
      setTimeout(() => {
        setAddDialogOpen(false);
      }, 1500);
    } catch (error) {
      console.error('Error adding payment method:', error);
      setAddError('Failed to add payment method. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeletePaymentMethod = async () => {
    if (!paymentMethodToDelete) return;
    
    setDeleteProcessing(true);
    
    try {
      // Simulate API call to delete payment method
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Remove the payment method from state
      setPaymentMethods(paymentMethods.filter(pm => pm.id !== paymentMethodToDelete.id));
      
      setDeleteProcessing(false);
      setDeleteDialogOpen(false);
      setPaymentMethodToDelete(null);
    } catch (error) {
      console.error('Error deleting payment method:', error);
      setDeleteProcessing(false);
    }
  };

  const handleSetDefaultPaymentMethod = (paymentMethodId) => {
    // Update payment methods to set the selected one as default
    const updatedPaymentMethods = paymentMethods.map(pm => ({
      ...pm,
      isDefault: pm.id === paymentMethodId
    }));
    
    setPaymentMethods(updatedPaymentMethods);
  };

  const getCardIcon = (brand) => {
    switch (brand.toLowerCase()) {
      case 'visa':
        return '💳 Visa';
      case 'mastercard':
        return '💳 Mastercard';
      case 'amex':
        return '💳 Amex';
      case 'discover':
        return '💳 Discover';
      default:
        return '💳';
    }
  };

  const maskCardNumber = (cardNumber) => {
    return `**** **** **** ${cardNumber.slice(-4)}`;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button 
        startIcon={<ArrowBack />} 
        onClick={handleGoBack}
        sx={{ mb: 2 }}
      >
        Back to Profile
      </Button>
      
      <Typography variant="h4" gutterBottom>
        Payment Methods
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" color="text.secondary">
          Manage your saved payment methods for faster checkout.
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        {paymentMethods.map((paymentMethod) => (
          <Grid item xs={12} sm={6} key={paymentMethod.id}>
            <Card 
              elevation={2}
              sx={{ 
                borderLeft: paymentMethod.isDefault ? 4 : 0, 
                borderColor: 'primary.main',
                position: 'relative'
              }}
            >
              {paymentMethod.isDefault && (
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: 10, 
                    right: 10, 
                    bgcolor: 'primary.main',
                    color: 'white',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.75rem'
                  }}
                >
                  Default
                </Box>
              )}
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ mr: 1 }}>
                    {getCardIcon(paymentMethod.brand)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {paymentMethod.brand.toUpperCase()}
                  </Typography>
                </Box>
                
                <Typography variant="body1" gutterBottom>
                  {maskCardNumber(paymentMethod.cardNumber)}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {paymentMethod.cardholderName}
                </Typography>
                
                <Typography variant="body2" color="text.secondary">
                  Expires: {paymentMethod.expiryMonth}/{paymentMethod.expiryYear}
                </Typography>
                
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                  {!paymentMethod.isDefault && (
                    <Button 
                      size="small" 
                      onClick={() => handleSetDefaultPaymentMethod(paymentMethod.id)}
                      startIcon={<Check />}
                    >
                      Set as Default
                    </Button>
                  )}
                  <Button 
                    size="small" 
                    color="error"
                    onClick={() => handleOpenDeleteDialog(paymentMethod)}
                    startIcon={<Delete />}
                  >
                    Remove
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
        
        <Grid item xs={12} sm={6}>
          <Card 
            elevation={1}
            sx={{ 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: '2px dashed',
              borderColor: 'divider',
              bgcolor: 'background.default',
              cursor: 'pointer'
            }}
            onClick={handleOpenAddDialog}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <IconButton 
                sx={{ 
                  bgcolor: 'background.paper', 
                  mb: 1,
                  '&:hover': {
                    bgcolor: 'background.paper'
                  }
                }}
              >
                <Add fontSize="large" />
              </IconButton>
              <Typography variant="body1">
                Add New Payment Method
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Add Payment Method Dialog */}
      <Dialog
        open={addDialogOpen}
        onClose={handleCloseAddDialog}
        aria-labelledby="add-payment-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="add-payment-dialog-title">
          Add Payment Method
        </DialogTitle>
        <DialogContent>
          {addSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Payment method added successfully!
            </Alert>
          )}
          
          {addError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {addError}
            </Alert>
          )}
          
          <Formik
            initialValues={{
              cardNumber: '',
              cardholderName: '',
              expiryMonth: '',
              expiryYear: '',
              cvv: '',
              isDefault: false
            }}
            validationSchema={creditCardSchema}
            onSubmit={handleAddPaymentMethod}
          >
            {({ errors, touched, isSubmitting, handleSubmit }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="cardNumber"
                      label="Card Number"
                      fullWidth
                      placeholder="1234 5678 9012 3456"
                      error={touched.cardNumber && Boolean(errors.cardNumber)}
                      helperText={touched.cardNumber && errors.cardNumber}
                      InputProps={{
                        startAdornment: <CreditCard sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="cardholderName"
                      label="Cardholder Name"
                      fullWidth
                      error={touched.cardholderName && Boolean(errors.cardholderName)}
                      helperText={touched.cardholderName && errors.cardholderName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl 
                      fullWidth
                      error={touched.expiryMonth && Boolean(errors.expiryMonth)}
                    >
                      <InputLabel id="expiry-month-label">Month</InputLabel>
                      <Field
                        as={Select}
                        name="expiryMonth"
                        labelId="expiry-month-label"
                        label="Month"
                      >
                        {Array.from({ length: 12 }, (_, i) => {
                          const month = (i + 1).toString().padStart(2, '0');
                          return (
                            <MenuItem key={month} value={month}>
                              {month}
                            </MenuItem>
                          );
                        })}
                      </Field>
                      {touched.expiryMonth && errors.expiryMonth && (
                        <FormHelperText>{errors.expiryMonth}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl 
                      fullWidth
                      error={touched.expiryYear && Boolean(errors.expiryYear)}
                    >
                      <InputLabel id="expiry-year-label">Year</InputLabel>
                      <Field
                        as={Select}
                        name="expiryYear"
                        labelId="expiry-year-label"
                        label="Year"
                      >
                        {Array.from({ length: 10 }, (_, i) => {
                          const year = (new Date().getFullYear() + i).toString();
                          return (
                            <MenuItem key={year} value={year}>
                              {year}
                            </MenuItem>
                          );
                        })}
                      </Field>
                      {touched.expiryYear && errors.expiryYear && (
                        <FormHelperText>{errors.expiryYear}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Field
                      as={TextField}
                      name="cvv"
                      label="CVV"
                      fullWidth
                      error={touched.cvv && Boolean(errors.cvv)}
                      helperText={touched.cvv && errors.cvv}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Field
                          as={Radio}
                          name="isDefault"
                          type="radio"
                          value={true}
                        />
                      }
                      label="Set as default payment method"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      disabled={isSubmitting}
                      startIcon={isSubmitting ? <CircularProgress size={20} /> : <Add />}
                    >
                      {isSubmitting ? 'Adding...' : 'Add Payment Method'}
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
      
      {/* Delete Payment Method Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="delete-payment-dialog-title"
        aria-describedby="delete-payment-dialog-description"
      >
        <DialogTitle id="delete-payment-dialog-title">
          Remove Payment Method
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-payment-dialog-description">
            Are you sure you want to remove this payment method?
            {paymentMethodToDelete && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">
                  {getCardIcon(paymentMethodToDelete.brand)} {maskCardNumber(paymentMethodToDelete.cardNumber)}
                </Typography>
              </Box>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} disabled={deleteProcessing}>
            Cancel
          </Button>
          <Button 
            onClick={handleDeletePaymentMethod} 
            color="error" 
            disabled={deleteProcessing}
            startIcon={deleteProcessing ? <CircularProgress size={20} /> : <Delete />}
          >
            {deleteProcessing ? 'Removing...' : 'Remove'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PaymentMethodsPage;

