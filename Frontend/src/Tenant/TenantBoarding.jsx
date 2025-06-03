import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Modal,
  Box,
  IconButton,
  InputAdornment,
  Fade,
} from "@mui/material";
import {
  AddCircleOutline,
  DeleteOutline,
  CloudUpload,
  PersonOutline,
  EmailOutlined,
  PhoneOutlined,
  DateRangeOutlined,
  AttachMoneyOutlined,
  HomeOutlined,
  ApartmentOutlined,
  LocationOnOutlined,
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
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: "#FAFAFA", p: 4, ml: { sm: "250px" } }}>
      <Fade in timeout={700}>
        <Paper elevation={3} sx={{ maxWidth: "1200px", mx: "auto", p: 5, bgcolor: "#FFFFFF", borderRadius: 4, boxShadow: 4 }}>
          <Typography variant="h4" sx={{ color: "#4F46E5", mb: 4, fontWeight: "bold", textAlign: "center" }}>
            Tenant Onboarding
          </Typography>

          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 3 }}>
            {[{
              name: "name", label: "Tenant Name", icon: <PersonOutline />
            }, {
              name: "email", label: "Email", icon: <EmailOutlined />
            }, {
              name: "phone", label: "Phone", icon: <PhoneOutlined />
            }, {
              name: "leaseStart", label: "", icon: <DateRangeOutlined />, type: "date"
            }, {
              name: "rent", label: "Rent Amount", icon: <AttachMoneyOutlined />
            }, {
              name: "propertyName", label: "Property Name", icon: <HomeOutlined />
            }, {
              name: "unitNumber", label: "Unit Number", icon: <ApartmentOutlined />
            }, {
              name: "address", label: "Property Address", icon: <LocationOnOutlined />
            }].map(({ name, label, icon, type }) => (
              <TextField
                key={name}
                name={name}
                value={tenant[name]}
                onChange={handleChange}
                label={label || undefined}
                type={type || "text"}
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {icon}
                    </InputAdornment>
                  )
                }}
              />
            ))}
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 5, gap: 2 }}>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUpload />}
              sx={{
                textTransform: "none",
                bgcolor: "#6366F1",
                color: "#fff",
                width: { xs: "100%", sm: "40%" },
                '&:hover': { bgcolor: "#4F46E5" }
              }}
            >
              Upload Documents
              <input type="file" hidden onChange={handleFileChange} />
            </Button>

            <Button
              onClick={handleOnboard}
              variant="contained"
              startIcon={<AddCircleOutline />}
              sx={{
                bgcolor: "#4CAF50",
                width: { xs: "100%", sm: "40%" },
                '&:hover': { bgcolor: "#388E3C" }
              }}
            >
              Add Tenant
            </Button>
          </Box>

          <Typography variant="h4" sx={{ color: "#4F46E5", mt: 6, mb: 4, fontWeight: "bold", textAlign: "center" }}>
            Tenant List
          </Typography>

          {tenants.length === 0 ? (
            <Typography variant="body1" sx={{ color: "#6B7280", textAlign: "center" }}>
              No tenants onboarded yet.
            </Typography>
          ) : (
            tenants.map((t) => (
              <Fade in timeout={500} key={t.id}>
                <Paper
                  sx={{
                    p: 3,
                    mb: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: 2,
                    borderRadius: 3,
                    bgcolor: "#E0E7FF",
                    width: "90%",
                    mx: "auto",
                  }}
                >
                  <Box>
                    <Typography variant="h6" sx={{ color: "#374151" }}>{t.name}</Typography>
                    <Typography variant="body2" sx={{ color: "#6B7280" }}>{t.email} | {t.phone}</Typography>
                    <Typography variant="body2" sx={{ color: "#EF4444" }}>Rent: ₹{t.rent}</Typography>
                    <Typography variant="body2" sx={{ color: "#10B981" }}>Property: {t.propertyName}, Unit {t.unitNumber}</Typography>
                    <Typography variant="body2" sx={{ color: "#8B5CF6" }}>Address: {t.address}</Typography>
                  </Box>
                  <IconButton onClick={() => setOffboardId(t.id)} sx={{ color: "#DC2626" }}>
                    <DeleteOutline />
                  </IconButton>
                </Paper>
              </Fade>
            ))
          )}
        </Paper>
      </Fade>

      <Modal open={Boolean(offboardId)} onClose={() => setOffboardId(null)}>
        <Fade in={Boolean(offboardId)}>
          <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "#FFFFFF", boxShadow: 24, p: 4, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ color: "#DC2626", mb: 2 }}>Confirm Offboarding</Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>Are you sure you want to offboard this tenant?</Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button onClick={() => handleOffboard(offboardId)} variant="contained" sx={{ bgcolor: "#DC2626", '&:hover': { bgcolor: "#B91C1C" } }}>Yes, Offboard</Button>
              <Button onClick={() => setOffboardId(null)} variant="outlined">Cancel</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default TenantBoarding;
