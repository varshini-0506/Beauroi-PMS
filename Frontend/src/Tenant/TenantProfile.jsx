import { Card, Avatar, Typography, Box, Divider, Button,CircularProgress } from "@mui/material";
import { Phone, Email, House, Payment, CalendarToday, Pets, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

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
            // Add authorization header if needed
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });
        const data = await response.json();
        
        if (!data.success) {
          setError(data.message);
        } else {
          // Merge the fetched data with default profile
          // fetched data will override default values where they exist
          setTenantProfile(prevdata=>({...prevdata,...data.data.profile}));
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
          marginLeft: "250px"
        }}
      >
        <CircularProgress />
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
          "width": "100%",
        }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
        <Link to="/user/tenanteditProfile">
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<Edit />}
          >
            Create Profile
          </Button>
        </Link>
      </Box>
    );
  }
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", p: 3, marginLeft: "250px", width: "100%", backgroundColor: "#f0f2f5" }}>
      <Box sx={{ maxWidth: 1200, width: "100%", p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4, justifyContent: "space-evenly", width: "100%" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Avatar
              alt="Tenant Profile"
              src={tenantProfile.profileUrl}
              sx={{
                width: 150,
                height: 150,
                border: "4px solid #1976d2",
                boxShadow: 3,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            />
            <Box>
              <Typography variant="h4" fontWeight="bold" color="primary">
                {tenantProfile.name}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {tenantProfile.nationality}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              textAlign: "left",
              p: 4,
              boxShadow: 3,
              borderRadius: "8px",
              backgroundColor: "#ffffff",
              display: "flex",
              flexDirection: "column",
              gap: 3,
              width: "100%",
              maxWidth: "500px",
              mt: 2,
            }}
          >
            {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Cake color="primary" />
              <Typography variant="body1" color="text.primary">
                <span className="font-semibold">Date of Birth:</span> {tenantProfile.dob}
              </Typography>
            </Box> */}

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Phone color="primary" />
              <Typography variant="body1" color="text.primary">
              <span className="font-semibold">Phone Number:</span> {tenantProfile.phone}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Email color="primary" />
              <Typography variant="body1" color="text.primary">
              <span className="font-semibold">Email:</span> {tenantProfile.email}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <div className="flex flex-col gap-6">
          <Card sx={{ p: 3, backgroundColor: "#ffffff", borderRadius: "12px", boxShadow: 3, transition: "all 0.3s ease", "&:hover": { boxShadow: 6 } }}>
            <Typography variant="h6" color="primary" fontWeight="bold" sx={{ mb: 2 }}>
              Lease Details
            </Typography>
            <div className="flex gap-5 justify-between">
              <Box sx={{ flex: 1 }}>
                <img src={lease.propertyImage} alt="Property" className="w-full h-52 object-cover rounded-lg" />
              </Box>
              <Box className="flex flex-col justify-center items-start gap-2 w-[50%]">
                <Typography variant="body1" color="text.primary" sx={{ mb: 1 }}>
                  <House sx={{ mr: 1, color: "#1976d2" }} />
                  <span className="font-semibold">Address:</span> {lease.propertyAddress}
                </Typography>
                <Typography variant="body1" color="text.primary" sx={{ mb: 1 }}>
                  <House sx={{ mr: 1, color: "#1976d2" }} />
                  <span className="font-semibold">Unit Number:</span> {tenantProfile.unit_number}
                </Typography>
                <Typography variant="body1" color="text.primary" sx={{ mb: 1 }}>
                  <Pets sx={{ mr: 1, color: "#1976d2" }} />
                  <span className="font-semibold">Pet Policy:</span> {tenantProfile.pet_policy}
                </Typography>
                <Typography variant="body1" color="text.primary" sx={{ mb: 1 }}>
                  <CalendarToday sx={{ mr: 1, color: "#1976d2" }} />
                  <span className="font-semibold">Lease Duration:</span> {new Date(lease.startDate).toLocaleDateString()} to {new Date(lease.endDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" color="text.primary" sx={{ mb: 1 }}>
                  <CalendarToday sx={{ mr: 1, color: "#1976d2" }} />
                  <span className="font-semibold">Renewal Terms:</span> {tenantProfile.renewal}
                </Typography>
                <Typography variant="body1" color="text.primary" sx={{ mb: 1 }}>
                  <CalendarToday sx={{ mr: 1, color: "#1976d2" }} />
                  <span className="font-semibold">Lease Status:</span> <span className="bg-green-600 text-white p-2 px-4 rounded-lg">{lease.status}</span>
                </Typography>
              </Box>
            </div>
          </Card>

          {/* Payment Details Card */}
          <Card sx={{ p: 3, backgroundColor: "#ffffff", borderRadius: "12px", boxShadow: 3, transition: "all 0.3s ease", "&:hover": { boxShadow: 6 } }}>
            <Typography variant="h6" color="primary" fontWeight="bold" sx={{ mb: 2 }}>
              Payment Details
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" color="text.primary" sx={{ mb: 1 }}>
                <Payment sx={{ mr: 1, color: "#1976d2" }} />
                <span className="font-semibold">Payment Preference:</span> {tenantProfile.payment_preference}
              </Typography>
              <Typography variant="body1" color="text.primary" sx={{ mb: 1 }}>
                <Payment sx={{ mr: 1, color: "#1976d2" }} />
                <span className="font-semibold">Monthly Rent:</span> {tenantProfile.monthly_rent}
              </Typography>
              <Typography variant="body1" color="text.primary" sx={{ mb: 1 }}>
                <Payment sx={{ mr: 1, color: "#1976d2" }} />
                <span className="font-semibold">Last Payment:</span> {tenantProfile.last_payment}
              </Typography>
              <Typography variant="body1" color="text.primary" sx={{ mb: 1 }}>
                <Payment sx={{ mr: 1, color: "#1976d2" }} />
                <span className="font-semibold">Security Deposit Status:</span> <span className="bg-green-600 text-white p-2 px-4 rounded-lg">{tenantProfile.security_deposit}</span>
              </Typography>
            </Box>
          </Card>
        </div>

        <Divider sx={{ my: 3 }} />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Link to="/user/tenanteditProfile" >
          <Button variant="contained" color="primary" sx={{ borderRadius: "8px", padding: "8px 24px" }} startIcon={<Edit />}>
            Edit Profile
          </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default TenantProfile;