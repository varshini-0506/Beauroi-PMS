import { useState } from "react";
import { Avatar, Button, CircularProgress, Fade, Grow, Slide, TextField, Typography, Box ,Card} from "@mui/material";
import { Phone, Email, CloudUpload } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
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

const TenanteditProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    id: "6808acaddb7e223ebebe1fef",
    name: "",
    avatarUrl: "",
    nationality: "",
    phone: "",
    email: "",
  });

  const [avatarPreview, setAvatarPreview] = useState(
    "https://ik.imagekit.io/varsh0506/Beauroi/profile_tenant.jpg?updatedAt=1739858483160"
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setProfile((prev) => ({
          ...prev,
          profileUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/tenantProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile)
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message || 'Failed to update profile');
        return;
      }

      // If successful, navigate to profile page
      navigate('/user/tenantProfile');
    } catch (err) {
      setError('Failed to connect to server',err);
    } finally {
      setLoading(false);
    }
  };

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
          <Typography variant="h4" sx={{
            mb: 4,
            color: colors.primary,
            fontWeight: "bold",
            textAlign: { xs: 'center', md: 'left' }
          }}>
            Edit Profile
          </Typography>
        </Grow>

        {error && (
          <Slide direction="down" in={!!error} mountOnEnter unmountOnExit>
            <Box sx={{
              backgroundColor: '#FEE2E2',
              border: '1px solid #EF4444',
              color: '#B91C1C',
              px: 4,
              py: 3,
              borderRadius: '12px',
              mb: 4,
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}>
              <Typography variant="body1">{error}</Typography>
            </Box>
          </Slide>
        )}

        <form onSubmit={handleSubmit}>
          {/* Personal Information Section */}
          <Grow in={true} timeout={600}>
            <Card sx={{
              p: 4,
              backgroundColor: colors.cardBg,
              borderRadius: "16px",
              boxShadow: 2,
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: `0 8px 24px ${colors.secondary}`,
              },
              borderTop: `3px solid ${colors.primary}`,
              mb: 4
            }}>
              <Typography variant="h5" sx={{
                mb: 3,
                color: colors.primary,
                fontWeight: "bold",
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                Personal Information
              </Typography>
              
              <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 4,
                alignItems: 'center',
                mb: 4
              }}>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2
                }}>
                  <Avatar
                    alt="Tenant Profile"
                    src={avatarPreview}
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
                  <label htmlFor="avatar-upload" style={{ cursor: 'pointer' }}>
                    <Button
                      component="span"
                      variant="outlined"
                      startIcon={<CloudUpload />}
                      sx={{
                        color: colors.primary,
                        borderColor: colors.primary,
                        '&:hover': {
                          backgroundColor: colors.secondary,
                          borderColor: colors.accent,
                          animation: `${pulse} 2s infinite`,
                        },
                      }}
                    >
                      Upload Photo
                    </Button>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      style={{ display: 'none' }}
                    />
                  </label>
                </Box>

                <Box sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                  width: '100%'
                }}>
                  <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                    gap: 3
                  }}>
                    <TextField
                      label="Full Name *"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      required
                      fullWidth
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: colors.secondary,
                          },
                          '&:hover fieldset': {
                            borderColor: colors.primary,
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: colors.primary,
                          },
                        },
                      }}
                    />
                    <TextField
                      label="Nationality *"
                      name="nationality"
                      value={profile.nationality}
                      onChange={handleChange}
                      required
                      fullWidth
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: colors.secondary,
                          },
                          '&:hover fieldset': {
                            borderColor: colors.primary,
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: colors.primary,
                          },
                        },
                      }}
                    />
                  </Box>

                  <TextField
                    label="Phone Number *"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    required
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      startAdornment: <Phone sx={{ color: colors.primary, mr: 1 }} />,
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: colors.secondary,
                        },
                        '&:hover fieldset': {
                          borderColor: colors.primary,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: colors.primary,
                        },
                      },
                    }}
                  />

                  <TextField
                    label="Email *"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    required
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      startAdornment: <Email sx={{ color: colors.primary, mr: 1 }} />,
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: colors.secondary,
                        },
                        '&:hover fieldset': {
                          borderColor: colors.primary,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: colors.primary,
                        },
                      },
                    }}
                  />
                </Box>
              </Box>
            </Card>
          </Grow>

          <Fade in={true} timeout={1000}>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  borderRadius: "12px",
                  padding: "12px 32px",
                  backgroundColor: colors.primary,
                  '&:hover': {
                    backgroundColor: colors.accent,
                    transform: 'scale(1.05)',
                    boxShadow: `0 0 15px ${colors.secondary}`
                  },
                  transition: 'all 0.3s ease',
                  minWidth: '200px'
                }}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
              >
                {loading ? 'Saving...' : 'Save Profile'}
              </Button>
            </Box>
          </Fade>
        </form>
      </Box>
    </Box>
  );
};

export default TenanteditProfile;