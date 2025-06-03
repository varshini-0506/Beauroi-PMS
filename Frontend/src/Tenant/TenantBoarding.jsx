import { useState } from "react";
import { TextField, Button, Typography, Paper, Modal, Box, IconButton, InputAdornment } from "@mui/material";
import {
  AddCircleOutline,
  DeleteOutline,
  CloudUpload,
  PersonOutline, // For Tenant Name
  EmailOutlined, // For Email
  PhoneOutlined, // For Phone
  DateRangeOutlined, // For Lease Start Date
  AttachMoneyOutlined, // For Rent Amount
  HomeOutlined, // For Property Name
  ApartmentOutlined, // For Unit Number
  LocationOnOutlined, // For Property Address
} from "@mui/icons-material";

const TenantBoarding = () => {
  const [tenants, setTenants] = useState([]);
  const [tenant, setTenant] = useState({
    name: "",
    email: "",
    phone: "",
    leaseStart: "",
    rent: "",
    propertyName: "",
    unitNumber: "",
    address: "",
    documents: null,
  });
  const [offboardId, setOffboardId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTenant({ ...tenant, [name]: value });
  };

  const handleFileChange = (e) => {
    setTenant({ ...tenant, documents: e.target.files[0] });
  };

  const handleOnboard = () => {
    if (!tenant.name || !tenant.email || !tenant.phone || !tenant.propertyName || !tenant.unitNumber || !tenant.address) {
      alert("Please fill all fields");
      return;
    }
    setTenants([...tenants, { ...tenant, id: Date.now() }]);
    setTenant({ name: "", email: "", phone: "", leaseStart: "", rent: "", propertyName: "", unitNumber: "", address: "", documents: null });
  };

  const handleOffboard = (id) => {
    setTenants(tenants.filter((t) => t.id !== id));
    setOffboardId(null);
  };

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", p: 4, marginLeft: "250px" }}>
      <Paper elevation={3} sx={{ maxWidth: "1200px", mx: "auto", p: 5, bgcolor: "#ffffff", borderRadius: 3, boxShadow: 5 }}>
        <Typography variant="h4" sx={{ color: "#1976d2", mb: 4, fontWeight: "bold", textAlign: "center" }}>
          Tenant Onboarding
        </Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 3 }}>
          <TextField
            name="name"
            value={tenant.name}
            onChange={handleChange}
            label="Tenant Name"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutline sx={{ color: "#003366" }} /> 
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="email"
            value={tenant.email}
            onChange={handleChange}
            label="Email"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined sx={{ color: "#003366" }} /> 
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="phone"
            value={tenant.phone}
            onChange={handleChange}
            label="Phone"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneOutlined sx={{ color: "#003366" }} /> 
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="leaseStart"
            value={tenant.leaseStart}
            onChange={handleChange}
            type="date"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DateRangeOutlined sx={{ color: "#003366" }} /> 
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="rent"
            value={tenant.rent}
            onChange={handleChange}
            label="Rent Amount"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoneyOutlined sx={{ color: "#003366" }} /> 
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="propertyName"
            value={tenant.propertyName}
            onChange={handleChange}
            label="Property Name"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HomeOutlined sx={{ color: "#003366" }} /> 
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="unitNumber"
            value={tenant.unitNumber}
            onChange={handleChange}
            label="Unit Number"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ApartmentOutlined sx={{ color: "#003366" }} /> 
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="address"
            value={tenant.address}
            onChange={handleChange}
            label="Property Address"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnOutlined sx={{ color: "#003366" }} /> 
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <div className="flex flex-col justify-center items-center mt-5">
        <Button
  component="label"
  variant="contained"
  startIcon={<CloudUpload style={{ color: "#ffffff" }} />}
  sx={{
    width: "20%",
    gridColumn: "1 / -1",
    textTransform: "none",
    bgcolor: "#2196f3",
    "&:hover": { bgcolor: "#1976d2" },
  }}
>
  Upload Documents
  <input type="file" hidden onChange={handleFileChange} />
</Button>

<Button
  onClick={handleOnboard}
  variant="contained"
  startIcon={<AddCircleOutline style={{ color: "#ffffff" }} />}
  sx={{
    mt: 4,
    width: "20%",
    bgcolor:"#4caf50",
    "&:hover": { bgcolor: "#388e3c" },
  }}
>
  Add Tenant
</Button>
        </div>
<Typography variant="h4" sx={{ color: "#1976d2", mt: 6, mb: 4, fontWeight: "bold", textAlign: "center" }}>
          Tenant List
        </Typography>
        <Box>
          {tenants.length === 0 ? (
            <Typography variant="body1" sx={{ color: "#757575", textAlign: "center" }}>
              No tenants onboarded yet.
            </Typography>
          ) : (
            tenants.map((t) => (
              <Paper
                key={t.id}
                sx={{
                  p: 3,
                  mb: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: 3,
                  borderRadius: 2,
                  width: "60%",
                  mx: "auto",
                  bgcolor: "#f5f5f5", // Light gray background
                }}
              >
                <Box>
                  <Typography variant="h6" sx={{ color: "#0d47a1" }}>{t.name}</Typography>
                  <Typography variant="body2" sx={{ color: "#757575" }}>{t.email} | {t.phone}</Typography>
                  <Typography variant="body2" sx={{ color: "#f44336" }}>Rent: ₹{t.rent}</Typography> {/* Red */}
                  <Typography variant="body2" sx={{ color: "#4caf50" }}>Property: {t.propertyName}, Unit {t.unitNumber}</Typography> {/* Green */}
                  <Typography variant="body2" sx={{ color: "#9c27b0" }}>Address: {t.address}</Typography> {/* Purple */}
                </Box>
                <IconButton onClick={() => setOffboardId(t.id)} sx={{ color: "#d32f2f" }}>
                  <DeleteOutline />
                </IconButton>
              </Paper>
            ))
          )}
        </Box>
      </Paper>

      <Modal open={Boolean(offboardId)} onClose={() => setOffboardId(null)}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ color: "#d32f2f", mb: 2 }}>Confirm Offboarding</Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>Are you sure you want to offboard this tenant?</Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button onClick={() => handleOffboard(offboardId)} variant="contained" sx={{ bgcolor: "#d32f2f", "&:hover": { bgcolor: "#b71c1c" } }}>Yes, Offboard</Button>
            <Button onClick={() => setOffboardId(null)} variant="outlined">Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default TenantBoarding;