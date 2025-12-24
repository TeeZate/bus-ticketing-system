import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Divider,
  TextField,
  InputAdornment,
  Button,
  Chip,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link
} from '@mui/material';
import { 
  ExpandMore, 
  Search, 
  DirectionsBus, 
  Payment, 
  Receipt, 
  SupportAgent, 
  CreditCard, 
  EventSeat, 
  AccessTime, 
  Help,
  ArrowForward
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

// FAQ data organized by categories
const faqData = {
  booking: [
    {
      question: "How do I book a bus ticket?",
      answer: "Booking a bus ticket is easy! Simply enter your departure and destination cities, select your travel date, and click 'Search'. Choose your preferred bus from the search results, select your seat, provide passenger details, and complete the payment. You'll receive your e-ticket via email immediately after booking."
    },
    {
      question: "Can I book tickets for someone else?",
      answer: "Yes, you can book tickets for friends, family members, or anyone else. During the booking process, you'll need to enter the passenger's details. Make sure to use their correct name as it appears on their ID, as this will be checked during boarding."
    },
    {
      question: "How far in advance can I book tickets?",
      answer: "Most bus operators allow bookings up to 90 days in advance. For popular routes and holiday seasons, we recommend booking as early as possible to secure your seat and get the best prices."
    },
    {
      question: "Is there a limit to how many tickets I can book at once?",
      answer: "You can book up to 10 tickets in a single transaction. If you need to book for a larger group, please contact our customer support for assistance with group bookings."
    },
    {
      question: "Do I need to create an account to book tickets?",
      answer: "While you can book as a guest, we recommend creating an account for a faster booking experience in the future. With an account, you can also track your bookings, save favorite routes, and earn rewards points."
    }
  ],
  payment: [
    {
      question: "What payment methods are accepted?",
      answer: "We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Google Pay. Some routes also offer the option to pay with cash at select terminals."
    },
    {
      question: "Is it safe to pay online?",
      answer: "Yes, all payments are processed through secure payment gateways with industry-standard encryption. We do not store your credit card information on our servers."
    },
    {
      question: "When will I be charged for my booking?",
      answer: "Your payment will be processed immediately when you complete your booking. If the payment is successful, you'll receive a confirmation email with your e-ticket."
    },
    {
      question: "Do you offer any discounts?",
      answer: "Yes, we offer various discounts including senior citizen discounts, student discounts, military discounts, and seasonal promotions. You can check for available discounts during the booking process."
    },
    {
      question: "Can I use multiple payment methods for a single booking?",
      answer: "Currently, we only support one payment method per transaction. If you need to split payment, you may need to make separate bookings."
    }
  ],
  tickets: [
    {
      question: "How do I receive my ticket after booking?",
      answer: "After completing your booking, your e-ticket will be sent to your email address immediately. You can also access your tickets in the 'My Bookings' section of your account if you booked while logged in."
    },
    {
      question: "Do I need to print my ticket?",
      answer: "No, you don't need to print your ticket. You can show the e-ticket on your smartphone or tablet. However, make sure your device is charged before boarding. If you prefer, you can also print your ticket for backup."
    },
    {
      question: "What if I don't receive my ticket email?",
      answer: "First, check your spam or junk folder. If you still can't find it, log in to your account and go to 'My Bookings' to access your ticket. If you booked as a guest, contact our customer support with your booking reference number for assistance."
    },
    {
      question: "Can I transfer my ticket to someone else?",
      answer: "Ticket transfers are subject to the policy of the bus operator. Some operators allow name changes for a fee, while others don't permit transfers. Contact our customer support for assistance with specific cases."
    },
    {
      question: "What ID do I need to show when boarding?",
      answer: "You'll need to present a valid government-issued photo ID that matches the name on your ticket. This could be a driver's license, passport, or state ID card."
    }
  ],
  cancellation: [
    {
      question: "How do I cancel my booking?",
      answer: "To cancel your booking, log in to your account, go to 'My Bookings', find the booking you want to cancel, and click on 'Cancel Booking'. If you booked as a guest, you can use the cancellation link in your confirmation email."
    },
    {
      question: "What is your cancellation policy?",
      answer: "Cancellation policies vary by bus operator. Generally, cancellations made 24 hours or more before departure are eligible for a refund with a small cancellation fee. Cancellations made less than 24 hours before departure may receive a partial refund or travel credit. The specific policy will be displayed during booking."
    },
    {
      question: "How long does it take to process a refund?",
      answer: "Once your cancellation is approved, refunds typically take 5-10 business days to appear in your account, depending on your payment method and financial institution."
    },
    {
      question: "Can I get a refund if I miss my bus?",
      answer: "No, if you miss your bus, you are not eligible for a refund. However, some operators may allow you to use your ticket for a later bus on the same day, subject to seat availability and a change fee."
    },
    {
      question: "What if my bus is cancelled by the operator?",
      answer: "If your bus is cancelled by the operator, you'll be notified as soon as possible and offered either a full refund or rebooking on the next available bus at no extra cost."
    }
  ],
  travel: [
    {
      question: "How early should I arrive at the bus station?",
      answer: "We recommend arriving at least 30 minutes before your scheduled departure time to allow for check-in, baggage handling, and boarding procedures."
    },
    {
      question: "What is the baggage allowance?",
      answer: "Most bus operators allow one piece of luggage (up to 20kg) to be stored in the luggage compartment and one small carry-on bag per passenger. Additional or overweight luggage may incur extra charges."
    },
    {
      question: "Are there restrooms on the bus?",
      answer: "Most long-distance buses have onboard restrooms. Additionally, buses typically make rest stops every 2-3 hours on longer journeys."
    },
    {
      question: "Is food allowed on the bus?",
      answer: "Light snacks and non-alcoholic beverages are generally allowed on buses. However, please be considerate of other passengers by avoiding foods with strong odors."
    },
    {
      question: "Are pets allowed on the bus?",
      answer: "Most bus operators do not allow pets, with the exception of service animals. Service animals must be properly harnessed and remain under the owner's control throughout the journey."
    }
  ],
  account: [
    {
      question: "How do I create an account?",
      answer: "To create an account, click on the 'Sign Up' button in the top right corner of our website. Fill in your details, create a password, and verify your email address to complete the registration process."
    },
    {
      question: "I forgot my password. How do I reset it?",
      answer: "Click on 'Login', then select 'Forgot Password'. Enter your email address, and we'll send you a link to reset your password. Follow the instructions in the email to create a new password."
    },
    {
      question: "How do I update my personal information?",
      answer: "Log in to your account, go to 'My Profile', and click on 'Edit Profile'. Update your information as needed and save the changes."
    },
    {
      question: "Can I delete my account?",
      answer: "Yes, you can delete your account by going to 'My Profile', selecting 'Account Settings', and clicking on 'Delete Account'. Please note that this action is irreversible and will remove all your data from our system."
    },
    {
      question: "What are the benefits of creating an account?",
      answer: "With an account, you can save your payment information for faster checkout, access your booking history, receive exclusive deals and promotions, earn and redeem rewards points, and save your favorite routes for quick booking."
    }
  ]
};

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedPanel, setExpandedPanel] = useState(false);
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setExpandedPanel(false);
  };
  
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : false);
  };
  
  // Filter FAQs based on search query and active category
  const getFilteredFAQs = () => {
    let filteredFAQs = [];
    
    // If a specific category is selected
    if (activeCategory !== 'all') {
      filteredFAQs = faqData[activeCategory] || [];
    } else {
      // Combine all categories
      Object.values(faqData).forEach(categoryFAQs => {
        filteredFAQs = [...filteredFAQs, ...categoryFAQs];
      });
    }
    
    // Apply search filter if there's a query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredFAQs = filteredFAQs.filter(faq => 
        faq.question.toLowerCase().includes(query) || 
        faq.answer.toLowerCase().includes(query)
      );
    }
    
    return filteredFAQs;
  };
  
  const filteredFAQs = getFilteredFAQs();
  
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
        <Container maxWidth="md">
          <Typography variant="h3" component="h1" gutterBottom textAlign="center" fontWeight="bold">
            Frequently Asked Questions
          </Typography>
          <Typography variant="h6" paragraph textAlign="center">
            Find answers to common questions about our services.
          </Typography>
          
          <Box sx={{ mt: 4, mb: 2 }}>
            <TextField
              fullWidth
              placeholder="Search for answers..."
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'white' }} />
                  </InputAdornment>
                ),
                sx: { 
                  bgcolor: 'rgba(255, 255, 255, 0.15)', 
                  borderRadius: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  color: 'white',
                  '& input::placeholder': {
                    color: 'rgba(255, 255, 255, 0.7)',
                  }
                }
              }}
            />
          </Box>
        </Container>
      </Box>
      
      {/* FAQ Categories */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 2 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
          <Chip 
            label="All Categories" 
            icon={<Help />} 
            onClick={() => handleCategoryChange('all')} 
            color={activeCategory === 'all' ? 'primary' : 'default'}
            variant={activeCategory === 'all' ? 'filled' : 'outlined'}
            sx={{ m: 0.5 }}
          />
          <Chip 
            label="Booking" 
            icon={<DirectionsBus />} 
            onClick={() => handleCategoryChange('booking')} 
            color={activeCategory === 'booking' ? 'primary' : 'default'}
            variant={activeCategory === 'booking' ? 'filled' : 'outlined'}
            sx={{ m: 0.5 }}
          />
          <Chip 
            label="Payment" 
            icon={<Payment />} 
            onClick={() => handleCategoryChange('payment')} 
            color={activeCategory === 'payment' ? 'primary' : 'default'}
            variant={activeCategory === 'payment' ? 'filled' : 'outlined'}
            sx={{ m: 0.5 }}
          />
          <Chip 
            label="Tickets" 
            icon={<Receipt />} 
            onClick={() => handleCategoryChange('tickets')} 
            color={activeCategory === 'tickets' ? 'primary' : 'default'}
            variant={activeCategory === 'tickets' ? 'filled' : 'outlined'}
            sx={{ m: 0.5 }}
          />
          <Chip 
            label="Cancellation" 
            icon={<CreditCard />} 
            onClick={() => handleCategoryChange('cancellation')} 
            color={activeCategory === 'cancellation' ? 'primary' : 'default'}
            variant={activeCategory === 'cancellation' ? 'filled' : 'outlined'}
            sx={{ m: 0.5 }}
          />
          <Chip 
            label="Travel" 
            icon={<EventSeat />} 
            onClick={() => handleCategoryChange('travel')} 
            color={activeCategory === 'travel' ? 'primary' : 'default'}
            variant={activeCategory === 'travel' ? 'filled' : 'outlined'}
            sx={{ m: 0.5 }}
          />
          <Chip 
            label="Account" 
            icon={<SupportAgent />} 
            onClick={() => handleCategoryChange('account')} 
            color={activeCategory === 'account' ? 'primary' : 'default'}
            variant={activeCategory === 'account' ? 'filled' : 'outlined'}
            sx={{ m: 0.5 }}
          />
        </Box>
      </Container>
      
      {/* FAQ Accordions */}
      <Container maxWidth="md" sx={{ py: 4 }}>
        {filteredFAQs.length > 0 ? (
          <>
            <Typography variant="h5" component="h2" gutterBottom>
              {activeCategory === 'all' 
                ? 'All Frequently Asked Questions' 
                : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} FAQs`}
            </Typography>
            
            {searchQuery && (
              <Typography variant="body2" color="text.secondary" paragraph>
                Showing {filteredFAQs.length} results for "{searchQuery}"
              </Typography>
            )}
            
            <Box sx={{ mt: 3 }}>
              {filteredFAQs.map((faq, index) => (
                <Accordion 
                  key={index}
                  expanded={expandedPanel === `panel${index}`}
                  onChange={handleAccordionChange(`panel${index}`)}
                  sx={{ 
                    mb: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    '&:before': {
                      display: 'none',
                    }
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                    sx={{ 
                      '&.Mui-expanded': {
                        bgcolor: 'primary.light',
                        color: 'primary.contrastText',
                        borderRadius: '4px 4px 0 0',
                      }
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight="medium">
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ pt: 2, pb: 3 }}>
                    <Typography variant="body1" color="text.secondary">
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </>
        ) : (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Help fontSize="large" color="action" sx={{ mb: 2, fontSize: 60, opacity: 0.5 }} />
            <Typography variant="h6" gutterBottom>
              No FAQs Found
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              We couldn't find any FAQs matching your search criteria.
            </Typography>
            <Button 
              variant="outlined" 
              color="primary"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
            >
              Clear Filters
            </Button>
          </Paper>
        )}
      </Container>
      
      {/* Popular Topics Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h5" component="h2" gutterBottom textAlign="center" sx={{ mb: 4 }}>
            Popular Topics
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <DirectionsBus color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" component="h3">
                    Booking Process
                  </Typography>
                </Box>
                <List disablePadding>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <ArrowForward fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="How to book tickets online" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <ArrowForward fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Group booking options" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <ArrowForward fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Seat selection guide" />
                  </ListItem>
                </List>
                <Button 
                  variant="text" 
                  color="primary" 
                  onClick={() => handleCategoryChange('booking')}
                  sx={{ mt: 2 }}
                >
                  View All Booking FAQs
                </Button>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CreditCard color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" component="h3">
                    Cancellations & Refunds
                  </Typography>
                </Box>
                <List disablePadding>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <ArrowForward fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Cancellation policy" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <ArrowForward fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Refund processing time" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <ArrowForward fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Rescheduling options" />
                  </ListItem>
                </List>
                <Button 
                  variant="text" 
                  color="primary" 
                  onClick={() => handleCategoryChange('cancellation')}
                  sx={{ mt: 2 }}
                >
                  View All Cancellation FAQs
                </Button>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EventSeat color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" component="h3">
                    Travel Information
                  </Typography>
                </Box>
                <List disablePadding>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <ArrowForward fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Baggage allowance" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <ArrowForward fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Bus amenities" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <ArrowForward fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Check-in procedures" />
                  </ListItem>
                </List>
                <Button 
                  variant="text" 
                  color="primary" 
                  onClick={() => handleCategoryChange('travel')}
                  sx={{ mt: 2 }}
                >
                  View All Travel FAQs
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Still Need Help Section */}
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Still Need Help?
        </Typography>
        <Typography variant="body1" paragraph sx={{ maxWidth: 700, mx: 'auto', mb: 4 }}>
          If you couldn't find the answer to your question, our customer support team is ready to help you.
        </Typography>
        
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <SupportAgent color="primary" sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" component="h3" gutterBottom>
                Contact Support
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Our team is available 24/7 to assist you with any questions.
              </Typography>
              <Button 
                variant="contained" 
                color="primary"
                component={RouterLink}
                to="/contact"
                sx={{ mt: 'auto' }}
              >
                Contact Us
              </Button>
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <AccessTime color="primary" sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" component="h3" gutterBottom>
                Live Chat
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Chat with our support agents for immediate assistance.
              </Typography>
              <Button 
                variant="contained" 
                color="primary"
                sx={{ mt: 'auto' }}
                onClick={() => console.log('Live chat functionality would be implemented here')}
              >
                Start Chat
              </Button>
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6" component="h3" gutterBottom>
                Call Us
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Speak directly with our customer service team.
              </Typography>
              <Button 
                variant="contained" 
                color="primary"
                component="a"
                href="tel:+18001234567"
                sx={{ mt: 'auto' }}
              >
                +1 (800) 123-4567
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FAQPage;

