import React from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  DirectionsBus, 
  Security, 
  Speed, 
  SupportAgent, 
  EmojiEvents, 
  People, 
  Timeline, 
  CheckCircle
} from '@mui/icons-material';

const AboutPage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          py: 8,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                About BusTickets
              </Typography>
              <Typography variant="h6" paragraph>
                Connecting people and places with reliable, comfortable, and affordable bus travel since 2010.
              </Typography>
              <Typography variant="body1" paragraph>
                We're on a mission to revolutionize bus travel by making it easier, more accessible, and more enjoyable for everyone.
              </Typography>
              <Button variant="contained" color="secondary" size="large" sx={{ mt: 2 }}>
                Our Journey
              </Button>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box 
                component="img" 
                src="/images/about-hero.jpg" 
                alt="Modern bus on the road"
                sx={{ 
                  width: '100%', 
                  borderRadius: 2,
                  boxShadow: 3
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Our Story Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box 
              component="img" 
              src="/images/our-story.jpg" 
              alt="Company founders"
              sx={{ 
                width: '100%', 
                borderRadius: 2,
                boxShadow: 3
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h2" gutterBottom color="primary">
              Our Story
            </Typography>
            <Typography variant="body1" paragraph>
              BusTickets was founded in 2010 by a group of transportation enthusiasts who saw a gap in the market for a modern, user-friendly bus ticketing platform. What started as a small startup with just 5 employees has grown into a nationwide service connecting thousands of destinations.
            </Typography>
            <Typography variant="body1" paragraph>
              Our founders, Michael Chen and Sarah Johnson, met while working for a traditional transportation company. They shared a vision of transforming the bus travel industry by leveraging technology to make booking tickets as easy as possible.
            </Typography>
            <Typography variant="body1" paragraph>
              Today, we partner with over 500 bus operators across the country, offering routes to more than 2,000 destinations. Our platform serves millions of travelers annually, and we continue to grow and innovate with each passing year.
            </Typography>
          </Grid>
        </Grid>
      </Container>
      
      {/* Mission & Values Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h4" component="h2" gutterBottom color="primary">
              Our Mission & Values
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto' }}>
              At BusTickets, we're driven by a clear mission and a strong set of values that guide everything we do.
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white', textAlign: 'center' }}>
                  <DirectionsBus fontSize="large" />
                  <Typography variant="h6" component="h3">
                    Our Mission
                  </Typography>
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="body1" paragraph>
                    To make bus travel the most accessible, reliable, and enjoyable transportation option for everyone.
                  </Typography>
                  <Typography variant="body1">
                    We believe that affordable transportation is a right, not a privilege. By connecting people with places through a seamless booking experience, we're making the world more accessible one journey at a time.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={8}>
              <Card sx={{ height: '100%' }}>
                <Box sx={{ p: 2, bgcolor: 'secondary.main', color: 'white', textAlign: 'center' }}>
                  <EmojiEvents fontSize="large" />
                  <Typography variant="h6" component="h3">
                    Our Core Values
                  </Typography>
                </Box>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Security color="primary" sx={{ mr: 1 }} />
                        <Typography variant="h6" component="h4">
                          Trust & Safety
                        </Typography>
                      </Box>
                      <Typography variant="body2">
                        We prioritize the safety of our customers and only partner with reliable operators who meet our strict standards.
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Speed color="primary" sx={{ mr: 1 }} />
                        <Typography variant="h6" component="h4">
                          Innovation
                        </Typography>
                      </Box>
                      <Typography variant="body2">
                        We continuously improve our platform and services to provide the best possible experience for our users.
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <SupportAgent color="primary" sx={{ mr: 1 }} />
                        <Typography variant="h6" component="h4">
                          Customer First
                        </Typography>
                      </Box>
                      <Typography variant="body2">
                        Every decision we make is guided by what's best for our customers. Their satisfaction is our top priority.
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <People color="primary" sx={{ mr: 1 }} />
                        <Typography variant="h6" component="h4">
                          Inclusivity
                        </Typography>
                      </Box>
                      <Typography variant="body2">
                        We believe in making travel accessible to everyone, regardless of background or budget.
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Milestones Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom color="primary" textAlign="center">
          Our Journey
        </Typography>
        <Typography variant="body1" paragraph textAlign="center" sx={{ maxWidth: 700, mx: 'auto', mb: 6 }}>
          From a small startup to a leading bus ticketing platform, here's how we've grown over the years.
        </Typography>
        
        <Box sx={{ position: 'relative' }}>
          <Box sx={{ 
            position: 'absolute', 
            left: '50%', 
            top: 0, 
            bottom: 0, 
            width: 4, 
            bgcolor: 'primary.main',
            transform: 'translateX(-50%)',
            display: { xs: 'none', md: 'block' }
          }} />
          
          <Grid container spacing={4}>
            {[
              {
                year: '2010',
                title: 'The Beginning',
                description: 'BusTickets was founded with a mission to revolutionize bus travel booking.',
                icon: <DirectionsBus />
              },
              {
                year: '2012',
                title: 'First 100 Partners',
                description: 'We reached our first milestone of 100 bus operator partnerships.',
                icon: <People />
              },
              {
                year: '2015',
                title: 'Mobile App Launch',
                description: 'We launched our mobile app, making booking even more convenient.',
                icon: <Speed />
              },
              {
                year: '2018',
                title: 'Nationwide Coverage',
                description: 'Expanded our service to cover all 50 states with over 1,000 destinations.',
                icon: <Timeline />
              },
              {
                year: '2020',
                title: 'Digital Transformation',
                description: 'Introduced contactless ticketing and real-time bus tracking.',
                icon: <Security />
              },
              {
                year: '2023',
                title: 'Today',
                description: 'Serving millions of travelers with 500+ partners and 2,000+ destinations.',
                icon: <EmojiEvents />
              }
            ].map((milestone, index) => (
              <Grid item xs={12} md={6} key={index} sx={{ position: 'relative' }}>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', md: index % 2 === 0 ? 'row' : 'row-reverse' },
                  textAlign: { xs: 'left', md: index % 2 === 0 ? 'right' : 'left' },
                  mb: 4
                }}>
                  <Box sx={{ 
                    display: { xs: 'none', md: 'flex' },
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'white',
                    zIndex: 1,
                    flexShrink: 0,
                    mx: 2
                  }}>
                    {milestone.icon}
                  </Box>
                  
                  <Paper elevation={3} sx={{ p: 3, flex: 1 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {milestone.year}
                    </Typography>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {milestone.title}
                    </Typography>
                    <Typography variant="body2">
                      {milestone.description}
                    </Typography>
                  </Paper>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      
      {/* Team Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" gutterBottom color="primary" textAlign="center">
            Meet Our Leadership Team
          </Typography>
          <Typography variant="body1" paragraph textAlign="center" sx={{ maxWidth: 700, mx: 'auto', mb: 6 }}>
            The passionate individuals behind BusTickets who work tirelessly to make your travel experience exceptional.
          </Typography>
          
          <Grid container spacing={4}>
            {[
              {
                name: 'Michael Chen',
                title: 'Co-Founder & CEO',
                image: '/images/team-1.jpg',
                bio: 'Michael has over 15 years of experience in the transportation industry and is passionate about making travel accessible to everyone.'
              },
              {
                name: 'Sarah Johnson',
                title: 'Co-Founder & COO',
                image: '/images/team-2.jpg',
                bio: 'With a background in operations and customer service, Sarah ensures that BusTickets delivers an exceptional experience to every user.'
              },
              {
                name: 'David Rodriguez',
                title: 'CTO',
                image: '/images/team-3.jpg',
                bio: 'David leads our technology team, constantly innovating to make our platform faster, more reliable, and more user-friendly.'
              },
              {
                name: 'Emily Wong',
                title: 'VP of Partnerships',
                image: '/images/team-4.jpg',
                bio: 'Emily works closely with our bus operator partners to expand our network and ensure high-quality service across all routes.'
              }
            ].map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardMedia
                    component="img"
                    height="240"
                    image={member.image}
                    alt={member.name}
                  />
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle2" color="primary" gutterBottom>
                      {member.title}
                    </Typography>
                    <Typography variant="body2">
                      {member.bio}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
      {/* Why Choose Us Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom color="primary" textAlign="center">
          Why Choose BusTickets
        </Typography>
        <Typography variant="body1" paragraph textAlign="center" sx={{ maxWidth: 700, mx: 'auto', mb: 6 }}>
          We're committed to providing the best bus travel booking experience. Here's what sets us apart.
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <List>
              {[
                {
                  title: 'Largest Network',
                  description: 'Access to 500+ bus operators and 2,000+ destinations across the country.'
                },
                {
                  title: 'Best Prices',
                  description: 'We guarantee the best prices with our price match policy and regular discounts.'
                },
                {
                  title: 'Easy Booking',
                  description: 'Book your tickets in minutes with our user-friendly website and mobile app.'
                },
                {
                  title: 'Secure Payments',
                  description: 'Multiple secure payment options with instant confirmation and e-tickets.'
                }
              ].map((item, index) => (
                <ListItem key={index} alignItems="flex-start" sx={{ px: 0 }}>
                  <ListItemIcon>
                    <CheckCircle color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography variant="h6">{item.title}</Typography>}
                    secondary={item.description}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <List>
              {[
                {
                  title: '24/7 Customer Support',
                  description: 'Our dedicated support team is available around the clock to assist you with any issues.'
                },
                {
                  title: 'Flexible Cancellation',
                  description: 'Plans change? Our flexible cancellation policy has got you covered.'
                },
                {
                  title: 'Real-time Updates',
                  description: 'Stay informed with real-time bus tracking and journey updates.'
                },
                {
                  title: 'Rewards Program',
                  description: 'Earn points with every booking and redeem them for discounts on future trips.'
                }
              ].map((item, index) => (
                <ListItem key={index} alignItems="flex-start" sx={{ px: 0 }}>
                  <ListItemIcon>
                    <CheckCircle color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography variant="h6">{item.title}</Typography>}
                    secondary={item.description}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Container>
      
      {/* CTA Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Ready to Experience Better Bus Travel?
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            Join millions of satisfied travelers who book their bus tickets with us. Start your journey today!
          </Typography>
          <Button variant="contained" color="secondary" size="large">
            Book Your Trip Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutPage;
