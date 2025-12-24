import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  TextField, 
  Button, 
  MenuItem,
  Divider,
  Card,
  CardContent,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import { 
  Email, 
  Phone, 
  LocationOn, 
  Send, 
  WhatsApp,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  AccessTime
} from '@mui/icons-material';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Validate subject
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Show success message
      setSnackbar({
        open: true,
        message: 'Your message has been sent successfully! We will get back to you soon.',
        severity: 'success'
      });
    } catch (error) {
      // Show error message
      setSnackbar({
        open: true,
        message: 'Failed to send message. Please try again later.',
        severity: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };
  
  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          py: 8,
          position: 'relative'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                Contact Us
              </Typography>
              <Typography variant="h6" paragraph>
                We're here to help and answer any questions you might have.
              </Typography>
              <Typography variant="body1">
                Please fill out the form below, and a member of our team will get back to you as soon as possible.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              <Box component="img" src="/images/contact-us.svg" alt="Contact Us" sx={{ maxWidth: '80%' }} />
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Contact Information & Form Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" component="h2" gutterBottom color="primary">
              Get In Touch
            </Typography>
            
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                  <LocationOn color="primary" sx={{ mr: 2, mt: 0.5 }} />
                  <Box>
                    <Typography variant="h6" component="h3" gutterBottom>
                      Our Main Office
                    </Typography>
                    <Typography variant="body2">
                      123 Bus Terminal Avenue<br />
                      New York, NY 10001<br />
                      United States
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                  <Email color="primary" sx={{ mr: 2, mt: 0.5 }} />
                  <Box>
                    <Typography variant="h6" component="h3" gutterBottom>
                      Email Us
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Customer Support:</strong><br />
                      support@bustickets.com
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Business Inquiries:</strong><br />
                      partnerships@bustickets.com
                    </Typography>
                    <Typography variant="body2">
                      <strong>Careers:</strong><br />
                      careers@bustickets.com
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                  <Phone color="primary" sx={{ mr: 2, mt: 0.5 }} />
                  <Box>
                    <Typography variant="h6" component="h3" gutterBottom>
                      Call Us
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Customer Support:</strong><br />
                      +1 (800) 123-4567
                    </Typography>
                    <Typography variant="body2">
                      <strong>Business Inquiries:</strong><br />
                      +1 (212) 555-7890
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <AccessTime color="primary" sx={{ mr: 2, mt: 0.5 }} />
                  <Box>
                    <Typography variant="h6" component="h3" gutterBottom>
                      Business Hours
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Monday-Friday:</strong> 8:00 AM - 8:00 PM EST
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Saturday:</strong> 9:00 AM - 6:00 PM EST
                    </Typography>
                    <Typography variant="body2">
                      <strong>Sunday:</strong> 10:00 AM - 4:00 PM EST
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
            
            <Typography variant="h5" component="h2" gutterBottom color="primary" sx={{ mt: 4 }}>
              Connect With Us
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Button 
                variant="contained" 
                startIcon={<Facebook />} 
                sx={{ bgcolor: '#3b5998' }}
                href="https://facebook.com"
                target="_blank"
              >
                Facebook
              </Button>
              <Button 
                variant="contained" 
                startIcon={<Twitter />} 
                sx={{ bgcolor: '#1da1f2' }}
                href="https://twitter.com"
                target="_blank"
              >
                Twitter
              </Button>
              <Button 
                variant="contained" 
                startIcon={<Instagram />} 
                sx={{ bgcolor: '#e1306c' }}
                href="https://instagram.com"
                target="_blank"
              >
                Instagram
              </Button>
            </Box>
            
            <Button 
              variant="contained" 
              startIcon={<WhatsApp />} 
              sx={{ bgcolor: '#25d366', mb: 2 }}
              fullWidth
              href="https://wa.me/18001234567"
              target="_blank"
            >
              Chat on WhatsApp
            </Button>
            
            <Button 
              variant="contained" 
              startIcon={<LinkedIn />} 
              sx={{ bgcolor: '#0077b5' }}
              fullWidth
              href="https://linkedin.com"
              target="_blank"
            >
              Follow on LinkedIn
            </Button>
          </Grid>
          
          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom color="primary">
                Send Us a Message
              </Typography>
              <Typography variant="body2" paragraph color="text.secondary">
                Have a question or feedback? Fill out the form below and we'll respond as soon as possible.
              </Typography>
              
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="name"
                      name="name"
                      label="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      name="email"
                      label="Email Address"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="phone"
                      name="phone"
                      label="Phone Number (Optional)"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="subject"
                      name="subject"
                      label="Subject"
                      select
                      value={formData.subject}
                      onChange={handleChange}
                      error={!!errors.subject}
                      helperText={errors.subject}
                    >
                      <MenuItem value="">Select a subject</MenuItem>
                      <MenuItem value="Booking Inquiry">Booking Inquiry</MenuItem>
                      <MenuItem value="Cancellation Request">Cancellation Request</MenuItem>
                      <MenuItem value="Refund Status">Refund Status</MenuItem>
                      <MenuItem value="Technical Support">Technical Support</MenuItem>
                      <MenuItem value="Partnership Opportunity">Partnership Opportunity</MenuItem>
                      <MenuItem value="Feedback">Feedback</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="message"
                      name="message"
                      label="Your Message"
                      multiline
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      error={!!errors.message}
                      helperText={errors.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <Send />}
                      disabled={isSubmitting}
                      sx={{ py: 1.5 }}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      
      {/* Map Section */}
      <Box sx={{ height: '400px', width: '100%', mb: 8 }}>
        <Typography variant="h5" component="h2" gutterBottom color="primary" textAlign="center" sx={{ mb: 4 }}>
          Find Us
        </Typography>
        <Box
          component="iframe"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215256349542!2d-73.99493492346394!3d40.75281937138799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b30eac9f%3A0xaca8b8d4c20b9f2f!2sNew%20York%2C%20NY%2010001!5e0!3m2!1sen!2sus!4v1699887654321!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Box>
      
      {/* FAQ Section */}
      <Container maxWidth="md" sx={{ mb: 8 }}>
        <Typography variant="h5" component="h2" gutterBottom color="primary" textAlign="center">
          Frequently Asked Questions
        </Typography>
        <Typography variant="body1" paragraph textAlign="center" sx={{ mb: 4 }}>
          Find quick answers to common questions about contacting us.
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
            <Typography variant="h6" component="h3" gutterBottom>
                What is your response time for inquiries?
              </Typography>
              <Typography variant="body2">
                We aim to respond to all inquiries within 24 hours during business days. For urgent matters, we recommend calling our customer support line.
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" component="h3" gutterBottom>
                How can I check the status of my complaint?
              </Typography>
              <Typography variant="body2">
                When you submit a complaint, you'll receive a reference number. You can use this number to check the status by calling our customer support or sending an email with the reference number in the subject line.
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="h6" component="h3" gutterBottom>
                Do you offer 24/7 customer support?
              </Typography>
              <Typography variant="body2">
                Our phone support operates during the business hours listed above. However, for emergencies related to ongoing trips, we have a 24/7 emergency line available to our customers.
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" component="h3" gutterBottom>
                How do I become a bus operator partner?
              </Typography>
              <Typography variant="body2">
                For partnership inquiries, please email partnerships@bustickets.com with details about your company and fleet. Our business development team will get back to you with more information.
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" component="h3" gutterBottom>
                Can I visit your office in person?
              </Typography>
              <Typography variant="body2">
                Yes, you can visit our main office during business hours. We recommend scheduling an appointment in advance to ensure that the appropriate team member is available to assist you.
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="h6" component="h3" gutterBottom>
                How do I report a technical issue with the website or app?
              </Typography>
              <Typography variant="body2">
                For technical issues, please email support@bustickets.com with details about the problem, including screenshots if possible. Our technical team will investigate and resolve the issue as quickly as possible.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
      
      {/* Snackbar for form submission feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactPage;

