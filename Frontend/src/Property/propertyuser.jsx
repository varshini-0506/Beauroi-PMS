import React, { useState, useEffect } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";

const PropertyUser = ({ properties: initialProperties = [] }) => {
  const [properties, setProperties] = useState(initialProperties);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/properties');
        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }
        const data = await response.json();
        setProperties(data);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if no initial properties were passed
    if (initialProperties.length === 0) {
      fetchProperties();
    } else {
      setLoading(false);
    }
  }, [initialProperties]);

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6 text-center">
        <p>Loading properties...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6 text-center text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-blue-900 mb-6 text-center ml-50">
        Select Your Property
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-50 gap-y-20 ml-30">
        {properties.length > 0 ? (
          properties.map((property, index) => (
            <Card 
              key={property._id || index} 
              variant="outlined" 
              sx={{ 
                width: 320, 
                cursor: "pointer", 
                transition: "0.3s", 
                "&:hover": { transform: "scale(1.05)" } 
              }}
            >
              <CardOverflow>
                <AspectRatio ratio="2">
                  <img
                    src={property.image || "https://via.placeholder.com/320"}
                    alt={property.name || "Property Image"}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/320";
                    }}
                  />
                </AspectRatio>
              </CardOverflow>
              <CardContent>
                <Typography level="title-md">{property.name || "Unnamed Property"}</Typography>
                <Typography level="body-sm">
                  <strong>Location:</strong> {property.location || "N/A"}
                </Typography>
                <Typography level="body-sm">
                  <strong>Type:</strong> {property.type || "N/A"}
                </Typography>
                <Typography level="body-sm">
                  <strong>Size:</strong> {property.size ? `${property.size} sq ft` : "N/A"}
                </Typography>
                <Typography level="body-sm">
                  <strong>Amenities:</strong> {property.amenities || "N/A"}
                </Typography>
                <Typography level="body-sm">
                  <strong>Price:</strong> ${property.price || "N/A"}
                </Typography>
              </CardContent>
              <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
                <Divider inset="context" />
                <CardContent orientation="horizontal">
                  <Typography level="body-xs" textColor="text.secondary" sx={{ fontWeight: "md" }}>
                    {new Date(property.createdAt).toLocaleDateString() || "Listed recently"}
                  </Typography>
                </CardContent>
              </CardOverflow>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No properties available.
          </p>
        )}
      </div>
    </div>
  );
};

export default PropertyUser;