import { Card, Avatar, Typography, Box, Divider, Button, CircularProgress, Fade, Grow, Slide } from "@mui/material";
import { Phone, Email, House, Payment, CalendarToday, Pets, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { keyframes } from "@emotion/react";

// Define color theme
const colors = {
  primary: '#4F46E5',       // Indigo
  secondary: '#E0E7FF',     // Lavender Mist
  background: '#FAFAFA',     // Snow White
  cardBg: '#FFFFFF',         // Pure White
  text: '#374151',           // Slate
  accent: '#6366F1',         // Vibrant Indigo
};

// Custom pulse animation
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const TenantProfile = () => {
  const defaultProfile = {
    avatarUrl: "https://ik.imagekit.io/varsh0506/Beauroi/profile_tenant.jpg?updatedAt=1739858483160",
    address: "1234, Sample Street, Apartment 123",
    unit_number: "123",
    pet_policy: "Allowed",
    tenant_duration: "12 months",
    renewal: "1 month notice",
    lease_status: "Active",
    payment_preference: "Online",
    monthly_rent: "Rs 10,000",
    last_payment: "01/01/2022",
    security_deposit: "Paid",
  };
  const [tenantProfile, setTenantProfile] = useState(defaultProfile);
  const [lease, setLease] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  useEffect(() => {
    const fetchTenantProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/displayTenantProfile/6808acaddb7e223ebebe1fef', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        
        if (!data.success) {
          setError(data.message);
        } else {
          setTenantProfile(prevdata => ({...prevdata,...data.data.profile}));
          setLease(data.data.leases);
        }
      } catch (err) {
        setError('Failed to fetch profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchTenantProfile();
  }, []);

  if (loading) {
    return (
      <Box 
        sx={{ 
          minHeight: "100vh", 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center",
          marginLeft: "250px",
          backgroundColor: colors.background
        }}
      >
        <Fade in={true} timeout={500}>
          <CircularProgress sx={{ color: colors.primary }} size={60} />
        </Fade>
      </Box>
    );
  }

  if (error) {
    return (
      <Box 
        sx={{ 
          minHeight: "100vh", 
          display: "flex", 
          flexDirection: "column",
          gap: 2,
          justifyContent: "center", 
          alignItems: "center",
          width: "100%",
          backgroundColor: colors.background,
          marginLeft: "250px"
        }}
      >
        <Slide direction="down" in={true} mountOnEnter unmountOnExit>
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </Slide>
        <Grow in={true} timeout={1000}>
          <Link to="/user/tenanteditProfile">
            <Button 
              variant="contained" 
              sx={{
                backgroundColor: colors.primary,
                '&:hover': {
                  backgroundColor: colors.accent,
                  animation: `${pulse} 2s infinite`,
                },
              }}
              startIcon={<Edit />}
            >
              Create Profile
            </Button>
          </Link>
        </Grow>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      display: "flex", 
      p: 3, 
      marginLeft: "250px", 
      width: "100%", 
      backgroundColor: colors.background,
      transition: 'background 0.5s ease'
    }}>
      <Box sx={{ 
        maxWidth: 1200, 
        width: "100%", 
        p: 3,
        '& > *': {
          transition: 'all 0.3s ease'
        }
      }}>
        <Grow in={true} timeout={500}>
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            mb: 4, 
            justifyContent: "space-evenly", 
            width: "100%",
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3
          }}>
            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 4,
              flexDirection: { xs: 'column', sm: 'row' },
              textAlign: { xs: 'center', sm: 'left' }
            }}>
              <Avatar
                alt="Tenant Profile"
                src={tenantProfile.profileUrl}
                sx={{
                  width: 150,
                  height: 150,
                  border: `4px solid ${colors.primary}`,
                  boxShadow: 3,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: `0 0 20px ${colors.secondary}`,
                  },
                }}
              />
              <Box>
                <Typography variant="h4" fontWeight="bold" color={colors.primary}>
                  {tenantProfile.name}
                </Typography>
                <Typography variant="h6" color={colors.text}>
                  {tenantProfile.nationality}
                </Typography>
              </Box>
            </Box>

            <Slide direction="up" in={true} timeout={800}>
              <Box
                sx={{
                  textAlign: "left",
                  p: 4,
                  boxShadow: 2,
                  borderRadius: "12px",
                  backgroundColor: colors.cardBg,
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  width: "100%",
                  maxWidth: "500px",
                  mt: 2,
                  borderLeft: `4px solid ${colors.primary}`,
                  '&:hover': {
                    boxShadow: `0 5px 15px ${colors.secondary}`,
                  }
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Phone sx={{ color: colors.primary }} />
                  <Typography variant="body1" color={colors.text}>
                    <span style={{ fontWeight: 600 }}>Phone Number:</span> {tenantProfile.phone}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Email sx={{ color: colors.primary }} />
                  <Typography variant="body1" color={colors.text}>
                    <span style={{ fontWeight: 600 }}>Email:</span> {tenantProfile.email}
                  </Typography>
                </Box>
              </Box>
            </Slide>
          </Box>
        </Grow>

        <Divider sx={{ my: 3, borderColor: colors.secondary }} />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Grow in={true} timeout={600}>
            <Card sx={{ 
              p: 3, 
              backgroundColor: colors.cardBg, 
              borderRadius: "16px", 
              boxShadow: 2, 
              transition: "all 0.3s ease", 
              "&:hover": { 
                boxShadow: `0 8px 24px ${colors.secondary}`,
                transform: 'translateY(-5px)'
              },
              borderTop: `3px solid ${colors.primary}`
            }}>
              <Typography variant="h6" sx={{ 
                mb: 2, 
                color: colors.primary, 
                fontWeight: "bold",
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <House sx={{ color: colors.primary }} />
                Lease Details
              </Typography>
              <Box sx={{ display: 'flex', gap: 5, flexDirection: { xs: 'column', md: 'row' } }}>
                <Box sx={{ flex: 1 }}>
                  <img 
                    src={lease.propertyImage} 
                    alt="Property" 
                    style={{ 
                      width: '100%', 
                      height: '250px', 
                      objectFit: 'cover', 
                      borderRadius: '12px',
                      boxShadow: `0 4px 12px ${colors.secondary}`
                    }} 
                  />
                </Box>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center', 
                  alignItems: 'flex-start', 
                  gap: 2, 
                  width: { xs: '100%', md: '50%' }
                }}>
                  <Typography variant="body1" color={colors.text} sx={{ mb: 1 }}>
                    <House sx={{ mr: 1, color: colors.primary }} />
                    <span style={{ fontWeight: 600 }}>Address:</span> {lease.propertyAddress}
                  </Typography>
                  <Typography variant="body1" color={colors.text} sx={{ mb: 1 }}>
                    <House sx={{ mr: 1, color: colors.primary }} />
                    <span style={{ fontWeight: 600 }}>Unit Number:</span> {tenantProfile.unit_number}
                  </Typography>
                  <Typography variant="body1" color={colors.text} sx={{ mb: 1 }}>
                    <Pets sx={{ mr: 1, color: colors.primary }} />
                    <span style={{ fontWeight: 600 }}>Pet Policy:</span> {tenantProfile.pet_policy}
                  </Typography>
                  <Typography variant="body1" color={colors.text} sx={{ mb: 1 }}>
                    <CalendarToday sx={{ mr: 1, color: colors.primary }} />
                    <span style={{ fontWeight: 600 }}>Lease Duration:</span> {new Date(lease.startDate).toLocaleDateString()} to {new Date(lease.endDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1" color={colors.text} sx={{ mb: 1 }}>
                    <CalendarToday sx={{ mr: 1, color: colors.primary }} />
                    <span style={{ fontWeight: 600 }}>Renewal Terms:</span> {tenantProfile.renewal}
                  </Typography>
                  <Typography variant="body1" color={colors.text} sx={{ mb: 1 }}>
                    <CalendarToday sx={{ mr: 1, color: colors.primary }} />
                    <span style={{ fontWeight: 600 }}>Lease Status:</span> 
                    <span style={{ 
                      backgroundColor: '#10B981', 
                      color: 'white', 
                      padding: '4px 12px', 
                      borderRadius: '12px',
                      marginLeft: '8px',
                      fontSize: '0.875rem'
                    }}>
                      {lease.status}
                    </span>
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grow>

          <Grow in={true} timeout={800}>
            <Card sx={{ 
              p: 3, 
              backgroundColor: colors.cardBg, 
              borderRadius: "16px", 
              boxShadow: 2, 
              transition: "all 0.3s ease", 
              "&:hover": { 
                boxShadow: `0 8px 24px ${colors.secondary}`,
                transform: 'translateY(-5px)'
              },
              borderTop: `3px solid ${colors.primary}`
            }}>
              <Typography variant="h6" sx={{ 
                mb: 2, 
                color: colors.primary, 
                fontWeight: "bold",
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <Payment sx={{ color: colors.primary }} />
                Payment Details
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="body1" color={colors.text}>
                  <Payment sx={{ mr: 1, color: colors.primary }} />
                  <span style={{ fontWeight: 600 }}>Payment Preference:</span> {tenantProfile.payment_preference}
                </Typography>
                <Typography variant="body1" color={colors.text}>
                  <Payment sx={{ mr: 1, color: colors.primary }} />
                  <span style={{ fontWeight: 600 }}>Monthly Rent:</span> {tenantProfile.monthly_rent}
                </Typography>
                <Typography variant="body1" color={colors.text}>
                  <Payment sx={{ mr: 1, color: colors.primary }} />
                  <span style={{ fontWeight: 600 }}>Last Payment:</span> {tenantProfile.last_payment}
                </Typography>
                <Typography variant="body1" color={colors.text}>
                  <Payment sx={{ mr: 1, color: colors.primary }} />
                  <span style={{ fontWeight: 600 }}>Security Deposit Status:</span> 
                  <span style={{ 
                    backgroundColor: '#10B981', 
                    color: 'white', 
                    padding: '4px 12px', 
                    borderRadius: '12px',
                    marginLeft: '8px',
                    fontSize: '0.875rem'
                  }}>
                    {tenantProfile.security_deposit}
                  </span>
                </Typography>
              </Box>
            </Card>
          </Grow>
        </Box>

        <Divider sx={{ my: 3, borderColor: colors.secondary }} />
        
        <Fade in={true} timeout={1200}>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Link to="/user/tenanteditProfile">
              <Button 
                variant="contained" 
                sx={{ 
                  borderRadius: "12px", 
                  padding: "10px 28px", 
                  backgroundColor: colors.primary,
                  '&:hover': {
                    backgroundColor: colors.accent,
                    transform: 'scale(1.05)',
                    boxShadow: `0 0 15px ${colors.secondary}`
                  },
                  transition: 'all 0.3s ease'
                }} 
                startIcon={<Edit />}
              >
                Edit Profile
              </Button>
            </Link>
          </Box>
        </Fade>
      </Box>
    </Box>
  );
};

export default TenantProfile;