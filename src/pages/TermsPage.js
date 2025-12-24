import React from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Breadcrumbs,
  Link,
  Button
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { NavigateNext, Print, GetApp } from '@mui/icons-material';

const TermsPage = () => {
    const handlePrint = () => {
        window.print();
      };
      
      const handleDownload = () => {
        // In a real application, this would generate and download a PDF
        alert('In a real application, this would download the Terms & Conditions as a PDF file.');
      };
      
      return (
        <Box>
          {/* Header */}
          <Box 
            sx={{ 
              bgcolor: 'primary.main', 
              color: 'white', 
              py: 4
            }}
          >
            <Container maxWidth="lg">
              <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                Terms & Conditions
              </Typography>
              <Breadcrumbs 
                separator={<NavigateNext fontSize="small" sx={{ color: 'white' }} />} 
                aria-label="breadcrumb"
                sx={{ 
                  '& .MuiBreadcrumbs-li': { color: 'white' },
                  '& a': { color: 'white', textDecoration: 'none' }
                }}
              >
                <Link component={RouterLink} to="/">
                  Home
                </Link>
                <Typography color="white">Terms & Conditions</Typography>
              </Breadcrumbs>
            </Container>
          </Box>
          
          {/* Main Content */}
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
              <Button 
                startIcon={<Print />} 
                onClick={handlePrint}
                sx={{ mr: 2 }}
              >
                Print
              </Button>
              <Button 
                startIcon={<GetApp />} 
                onClick={handleDownload}
              >
                Download PDF
              </Button>
            </Box>
            
            <Paper sx={{ p: 4 }} className="print-content">
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  BusTickets Terms and Conditions
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Last Updated: November 15, 2023
                </Typography>
              </Box>
              
              <Typography variant="body1" paragraph>
                Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the BusTickets website and mobile application (the "Service") operated by BusTickets Inc. ("us", "we", or "our").
              </Typography>
              
              <Typography variant="body1" paragraph>
                Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
              </Typography>
              
              <Typography variant="body1" paragraph>
                By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
              </Typography>
              
              <Divider sx={{ my: 3 }} />
              
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  1. Definitions
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>"Service"</strong> refers to the BusTickets website and mobile application, which provides a platform for users to search, compare, and book bus tickets.
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>"User"</strong> refers to the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>"Bus Operator"</strong> refers to the companies that provide bus transportation services and whose tickets are available for booking through our Service.
                </Typography>
              </Box>
              
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  2. Account Registration
                </Typography>
                <Typography variant="body1" paragraph>
                  When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                </Typography>
                <Typography variant="body1" paragraph>
                  You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
                </Typography>
                <Typography variant="body1" paragraph>
                  You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
                </Typography>
              </Box>
              
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  3. Booking and Payments
                </Typography>
                <Typography variant="body1" paragraph>
                  3.1. BusTickets acts as an intermediary between Users and Bus Operators. We facilitate the booking of tickets but are not the provider of the transportation services.
                </Typography>
                <Typography variant="body1" paragraph>
                  3.2. By making a booking through our Service, you enter into a direct contractual relationship with the Bus Operator. BusTickets is not a party to this relationship.
                </Typography>
                <Typography variant="body1" paragraph>
                  3.3. The prices displayed on our Service include the ticket fare set by the Bus Operator and our service fee. All prices are displayed in the selected currency and include applicable taxes unless stated otherwise.
                </Typography>
                <Typography variant="body1" paragraph>
                  3.4. Payment for bookings must be made at the time of reservation. We accept various payment methods as indicated on our Service.
                </Typography>
                <Typography variant="body1" paragraph>
                  3.5. Upon successful payment, you will receive a confirmation email with your e-ticket or booking reference. This serves as proof of your booking.
                </Typography>
              </Box>
              
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  4. Cancellations and Refunds
                </Typography>
                <Typography variant="body1" paragraph>
                  4.1. Cancellation policies vary by Bus Operator. The specific cancellation policy applicable to your booking will be displayed during the booking process.
                </Typography>
                <Typography variant="body1" paragraph>
                  4.2. To cancel a booking, you must follow the cancellation procedure specified on our Service or contact our customer support.
                </Typography>
                <Typography variant="body1" paragraph>
                  4.3. Refunds, when applicable, will be processed according to the Bus Operator's policy. Our service fee is non-refundable unless required by law.
                </Typography>
                <Typography variant="body1" paragraph>
                  4.4. Refund processing times depend on your payment method and financial institution, typically taking 5-10 business days.
                </Typography>
              </Box>
              
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  5. User Responsibilities
                </Typography>
                <Typography variant="body1" paragraph>
                  5.1. You must provide accurate personal information when making a booking. The name on the booking must match the ID you will present when boarding.
                </Typography>
                <Typography variant="body1" paragraph>
                  5.2. You are responsible for arriving at the departure point at the specified time. BusTickets and the Bus Operator are not liable if you miss your bus.
                </Typography>
                <Typography variant="body1" paragraph>
                  5.3. You must comply with all rules and regulations set by the Bus Operator, including baggage allowance and prohibited items.
                </Typography>
                <Typography variant="body1" paragraph>
                  5.4. You must not use our Service for any illegal or unauthorized purpose, including but not limited to fraudulent bookings.
                </Typography>
              </Box>
              
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  6. Limitation of Liability
                </Typography>
                <Typography variant="body1" paragraph>
                  6.1. BusTickets is not liable for the acts, errors, omissions, representations, warranties, breaches, or negligence of any Bus Operator or for any personal injuries, death, property damage, or other damages or expenses resulting from the use of the transportation services.
                </Typography>
                <Typography variant="body1" paragraph>
                  6.2. We do not guarantee the accuracy, completeness, or reliability of any information displayed on our Service regarding Bus Operators, routes, schedules, or fares.
                </Typography>
                <Typography variant="body1" paragraph>
                  6.3. In no event shall BusTickets, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                </Typography>
              </Box>
              
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  7. Intellectual Property
                </Typography>
                <Typography variant="body1" paragraph>
                  7.1. The Service and its original content, features, and functionality are and will remain the exclusive property of BusTickets and its licensors.
                </Typography>
                <Typography variant="body1" paragraph>
                  7.2. You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Service without our prior written consent.
                </Typography>
              </Box>
              
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  8. Privacy Policy
                </Typography>
                <Typography variant="body1" paragraph>
                  8.1. Our Privacy Policy, available on our Service, describes how we collect, use, and share information about you when you use our Service. By using our Service, you consent to our collection and use of information as described in the Privacy Policy.
                </Typography>
              </Box>
              
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  9. Changes to Terms
                </Typography>
                <Typography variant="body1" paragraph>
                  9.1. We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
                </Typography>
                <Typography variant="body1" paragraph>
                  9.2. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
                </Typography>
              </Box>
              
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  10. Governing Law
                </Typography>
                <Typography variant="body1" paragraph>
                  10.1. These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
                </Typography>
                <Typography variant="body1" paragraph>
                  10.2. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
                </Typography>
              </Box>
              
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  11. Contact Us
                </Typography>
                <Typography variant="body1" paragraph>
                  If you have any questions about these Terms, please contact us:
                </Typography>
                <List>
                  <ListItem disableGutters>
                    <ListItemText 
                      primary="By email: legal@bustickets.com" 
                    />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemText 
                      primary="By mail: BusTickets Inc., 123 Bus Terminal Avenue, New York, NY 10001, United States" 
                    />
                  </ListItem>
                </List>
              </Box>
            </Paper>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button 
                variant="contained" 
                color="primary"
                component={RouterLink}
                to="/contact"
                sx={{ mr: 2 }}
              >
                Contact Us
              </Button>
              <Button 
                variant="outlined"
                component={RouterLink}
                to="/privacy-policy"
              >
                Privacy Policy
              </Button>
            </Box>
          </Container>
        </Box>
      );
    };
    
    export default TermsPage;
    
