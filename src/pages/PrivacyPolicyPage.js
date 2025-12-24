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

const PrivacyPolicyPage = () => {
  const handlePrint = () => {
    window.print();
  };
  
  const handleDownload = () => {
    // In a real application, this would generate and download a PDF
    alert('In a real application, this would download the Privacy Policy as a PDF file.');
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
            Privacy Policy
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
            <Typography color="white">Privacy Policy</Typography>
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
              BusTickets Privacy Policy
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Last Updated: November 15, 2023
            </Typography>
          </Box>
          
          <Typography variant="body1" paragraph>
            At BusTickets, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our mobile application.
          </Typography>
          
          <Typography variant="body1" paragraph>
            Please read this Privacy Policy carefully. By accessing or using our Service, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy. If you do not agree with our policies and practices, please do not use our Service.
          </Typography>
          
          <Divider sx={{ my: 3 }} />
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" component="h3" gutterBottom>
              1. Information We Collect
            </Typography>
            
            <Typography variant="subtitle1" gutterBottom>
              1.1 Personal Information
            </Typography>
            <Typography variant="body1" paragraph>
              We may collect personal information that you voluntarily provide to us when you:
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Register for an account" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Book a bus ticket" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Sign up for our newsletter" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Contact our customer support" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Participate in promotions or surveys" />
              </ListItem>
            </List>
            <Typography variant="body1" paragraph>
              The personal information we may collect includes:
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Name, email address, phone number, and mailing address" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Date of birth and gender" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Payment information (credit card details, billing address)" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Travel preferences and history" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Government-issued identification details (for certain international routes)" />
              </ListItem>
            </List>
            
            <Typography variant="subtitle1" gutterBottom>
              1.2 Automatically Collected Information
            </Typography>
            <Typography variant="body1" paragraph>
              When you access or use our Service, we may automatically collect certain information, including:
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Device information (such as your IP address, browser type, operating system)" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Usage data (pages visited, time spent on pages, links clicked)" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Location data (with your consent)" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Cookies and similar tracking technologies" />
              </ListItem>
            </List>
          </Box>
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" component="h3" gutterBottom>
              2. How We Use Your Information
            </Typography>
            <Typography variant="body1" paragraph>
              We may use the information we collect for various purposes, including to:
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Process and manage your bookings" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Create and maintain your account" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Provide customer support and respond to inquiries" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Send transactional emails (booking confirmations, updates, etc.)" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Send marketing communications (with your consent)" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Improve our Service and develop new features" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Detect and prevent fraud or unauthorized activities" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Comply with legal obligations" />
              </ListItem>
            </List>
          </Box>
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" component="h3" gutterBottom>
              3. How We Share Your Information
            </Typography>
            <Typography variant="body1" paragraph>
              We may share your information with:
            </Typography>
            
            <Typography variant="subtitle1" gutterBottom>
              3.1 Bus Operators
            </Typography>
            <Typography variant="body1" paragraph>
              We share necessary booking information with the bus operators to facilitate your travel. This includes passenger names, contact details, and any special requirements you have specified.
            </Typography>
            
            <Typography variant="subtitle1" gutterBottom>
              3.2 Service Providers
            </Typography>
            <Typography variant="body1" paragraph>
              We may engage third-party companies and individuals to facilitate our Service, provide the Service on our behalf, perform Service-related services, or assist us in analyzing how our Service is used. These third parties have access to your personal information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
            </Typography>
            
            <Typography variant="subtitle1" gutterBottom>
              3.3 Business Transfers
            </Typography>
            <Typography variant="body1" paragraph>
              If BusTickets is involved in a merger, acquisition, or asset sale, your personal information may be transferred as a business asset. In such cases, we will provide notice before your personal information is transferred and becomes subject to a different Privacy Policy.
            </Typography>
            
            <Typography variant="subtitle1" gutterBottom>
              3.4 Legal Requirements
            </Typography>
            <Typography variant="body1" paragraph>
              We may disclose your personal information if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).
            </Typography>
          </Box>
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" component="h3" gutterBottom>
              4. Cookies and Tracking Technologies
            </Typography>
            <Typography variant="body1" paragraph>
              We use cookies and similar tracking technologies to track activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
            </Typography>
            
            <Typography variant="body1" paragraph>
              We use the following types of cookies:
            </Typography>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Essential Cookies" 
                  secondary="These cookies are necessary for the website to function and cannot be switched off in our systems."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Performance Cookies" 
                  secondary="These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Functional Cookies" 
                  secondary="These cookies enable the website to provide enhanced functionality and personalization."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Targeting Cookies" 
                  secondary="These cookies may be set through our site by our advertising partners to build a profile of your interests."
                />
              </ListItem>
            </List>
            
            <Typography variant="body1" paragraph>
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
            </Typography>
          </Box>
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" component="h3" gutterBottom>
              5. Data Security
            </Typography>
            <Typography variant="body1" paragraph>
              The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
            </Typography>
            
            <Typography variant="body1" paragraph>
              We implement a variety of security measures to maintain the safety of your personal information, including:
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Using encryption to protect sensitive information transmitted online" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Protecting your information offline by keeping it on secured servers" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Restricting access to personal information to employees, contractors, and agents who need to know that information" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Regular security assessments and audits" />
              </ListItem>
            </List>
          </Box>
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" component="h3" gutterBottom>
              6. Your Data Protection Rights
            </Typography>
            <Typography variant="body1" paragraph>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </Typography>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Right to Access" 
                  secondary="You have the right to request copies of your personal information."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Right to Rectification" 
                  secondary="You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Right to Erasure" 
                  secondary="You have the right to request that we erase your personal information, under certain conditions."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Right to Restrict Processing" 
                  secondary="You have the right to request that we restrict the processing of your personal information, under certain conditions."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Right to Object to Processing" 
                  secondary="You have the right to object to our processing of your personal information, under certain conditions."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Right to Data Portability" 
                  secondary="You have the right to request that we transfer the data we have collected to another organization, or directly to you, under certain conditions."
                />
              </ListItem>
            </List>
            
            <Typography variant="body1" paragraph>
              If you wish to exercise any of these rights, please contact us using the information provided in the "Contact Us" section.
            </Typography>
          </Box>
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" component="h3" gutterBottom>
              7. Children's Privacy
            </Typography>
            <Typography variant="body1" paragraph>
              Our Service is not directed to anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us. If we become aware that we have collected personal information from children without verification of parental consent, we take steps to remove that information from our servers.
            </Typography>
          </Box>
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" component="h3" gutterBottom>
              8. International Data Transfers
            </Typography>
            <Typography variant="body1" paragraph>
              Your information, including personal information, may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction.
            </Typography>
            
            <Typography variant="body1" paragraph>
              If you are located outside the United States and choose to provide information to us, please note that we transfer the information, including personal information, to the United States and process it there.
            </Typography>
            
            <Typography variant="body1" paragraph>
              Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.
            </Typography>
          </Box>
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" component="h3" gutterBottom>
              9. Changes to This Privacy Policy
            </Typography>
            <Typography variant="body1" paragraph>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.
            </Typography>
            
            <Typography variant="body1" paragraph>
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </Typography>
          </Box>
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" component="h3" gutterBottom>
              10. Contact Us
            </Typography>
            <Typography variant="body1" paragraph>
              If you have any questions about this Privacy Policy, please contact us:
            </Typography>
            <List>
              <ListItem disableGutters>
                <ListItemText 
                  primary="By email: privacy@bustickets.com" 
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText 
                  primary="By mail: BusTickets Inc., 123 Bus Terminal Avenue, New York, NY 10001, United States" 
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText 
                  primary="By phone: +1 (800) 123-4567" 
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
            to="/terms"
          >
            Terms & Conditions
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default PrivacyPolicyPage;
