import { useState } from "react";
import { Avatar, Button } from "@mui/material";
import { Phone, Email } from "@mui/icons-material";
import { useNavigate} from "react-router-dom";

const TenanteditProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    id:"6808acaddb7e223ebebe1fef",
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
          // Add authorization header if needed
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
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
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex p-6 ml-[250px] w-full bg-gray-100">
      <div className="max-w-6xl w-full p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Edit Profile</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-blue-600 mb-4">Personal Information</h2>
            
            <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
              <div className="flex flex-col items-center">
                <Avatar
                  alt="Tenant Profile"
                  src={avatarPreview}
                  sx={{
                    width: 150,
                    height: 150,
                    border: "4px solid #1976d2",
                    boxShadow: 3,
                    marginBottom: 2,
                  }}
                />
                <label className="cursor-pointer bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                  Upload Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nationality *</label>
                    <input
                      type="text"
                      name="nationality"
                      value={profile.nationality}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <div className="flex items-center">
                    <Phone className="text-blue-500 mr-2" />
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <div className="flex items-center">
                    <Email className="text-blue-500 mr-2" />
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              className="rounded-lg py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
            >
              {loading ? 'Saving...' : 'Save Profile'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TenanteditProfile;