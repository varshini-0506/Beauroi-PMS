import React, { useState, useRef, useEffect } from "react";

const PropertyManager = () => {
  const [properties, setProperties] = useState([]);
  const [property, setProperty] = useState({
    name: "",
    location: "",
    type: "",
    size: "",
    amenities: "",
    price: "",
    image: null,
    existingImage: null,
  });
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(true);

  // New state to handle enlarged image modal
  const [enlargedImage, setEnlargedImage] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/properties");
        if (!response.ok) throw new Error("Failed to fetch properties");
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Fetch error:", error);
        alert("Failed to load properties");
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setProperty({
        ...property,
        image: e.target.files[0],
        existingImage: null,
      });
    } else {
      setProperty({ ...property, [e.target.name]: e.target.value });
    }
  };

  const handleSave = async () => {
    if (!property.name || !property.location || !property.type) {
      alert("Please fill in required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", property.name);
    formData.append("location", property.location);
    formData.append("type", property.type);
    formData.append("size", property.size);
    formData.append("amenities", property.amenities);
    formData.append("price", property.price);

    if (property.image instanceof File) {
      formData.append("image", property.image);
    }

    try {
      const url = editingId
        ? `http://localhost:5000/api/properties/${editingId}`
        : "http://localhost:5000/api/properties";

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) throw new Error(response.statusText);

      const result = await response.json();
      const savedProperty = result.property;

      if (editingId) {
        setProperties(
          properties.map((p) =>
            p._id === editingId
              ? {
                  ...savedProperty,
                  image: savedProperty.image
                    ? `http://localhost:5000/uploads/properties/${savedProperty.image}`
                    : property.existingImage,
                }
              : p
          )
        );
      } else {
        setProperties([
          ...properties,
          {
            ...savedProperty,
            image: savedProperty.image
              ? `http://localhost:5000/uploads/properties/${savedProperty.image}`
              : null,
          },
        ]);
      }

      resetForm();
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save property");
    }
  };

  const handleEdit = (propertyToEdit) => {
    setProperty({
      ...propertyToEdit,
      image: null,
      existingImage: propertyToEdit.image,
    });
    setEditingId(propertyToEdit._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/properties/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      setProperties(properties.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete property");
    }
  };

  const resetForm = () => {
    setProperty({
      name: "",
      location: "",
      type: "",
      size: "",
      amenities: "",
      price: "",
      image: null,
      existingImage: null,
    });
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#FAFAFA] p-10 w-full ml-[250px] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#4F46E5] mb-4"></div>
          <p className="text-lg text-[#374151]">Loading properties...</p>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      {/* Main Content with Right Sidebar */}
      <div className="flex flex-1">
        {/* Main Content Area - Shifted right */}
        <div className="flex-1 p-10 ml-[300px] mr-[400px]">
          {/* Centered Heading */}
          <div className="flex justify-center">
            <h1
              className="text-4xl font-extrabold mb-10 cursor-default select-none text-center"
              style={{ color: "#4F46E5", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
            >
              Property Management
            </h1>
          </div>

          {/* Property Input Form */}
          <div
            className="w-full max-w-3xl mx-auto p-6 rounded-lg shadow-md"
            style={{ backgroundColor: "#FFFFFF", boxShadow: "0 4px 12px rgba(79, 70, 229, 0.15)" }}
          >
            <input
              className="w-full p-3 mb-3 rounded border border-[#E0E7FF] focus:border-[#4F46E5] focus:ring-1 focus:ring-[#6366F1] text-[#374151]"
              type="text"
              name="name"
              placeholder="Property Name *"
              value={property.name}
              onChange={handleChange}
            />
            <input
              className="w-full p-3 mb-3 rounded border border-[#E0E7FF] focus:border-[#4F46E5] focus:ring-1 focus:ring-[#6366F1] text-[#374151]"
              type="text"
              name="location"
              placeholder="Location *"
              value={property.location}
              onChange={handleChange}
            />
            <select
              className="w-full p-3 mb-3 rounded border border-[#E0E7FF] focus:border-[#4F46E5] focus:ring-1 focus:ring-[#6366F1] text-[#374151]"
              name="type"
              value={property.type}
              onChange={handleChange}
            >
              <option value="" className="text-gray-400">
                Select Type *
              </option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Office">Office</option>
            </select>
            <input
              className="w-full p-3 mb-3 rounded border border-[#E0E7FF] focus:border-[#4F46E5] focus:ring-1 focus:ring-[#6366F1] text-[#374151]"
              type="text"
              name="size"
              placeholder="Size (sq ft)"
              value={property.size}
              onChange={handleChange}
            />
            <input
              className="w-full p-3 mb-3 rounded border border-[#E0E7FF] focus:border-[#4F46E5] focus:ring-1 focus:ring-[#6366F1] text-[#374151]"
              type="text"
              name="amenities"
              placeholder="Amenities"
              value={property.amenities}
              onChange={handleChange}
            />
            <input
              className="w-full mb-4 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#E0E7FF] file:text-[#4F46E5] hover:file:bg-[#c7d0ff] transition cursor-pointer"
              type="file"
              name="image"
              ref={fileInputRef}
              onChange={handleChange}
              accept="image/*"
            />
            {property.existingImage && (
              <div
                className="mb-4 p-3 rounded border border-[#E0E7FF] flex flex-col items-start"
                style={{ backgroundColor: "#F9FAFB" }}
              >
                <p className="text-sm text-[#374151] mb-1">Current Image:</p>
                <img
                  src={property.existingImage}
                  alt="Current"
                  className="h-24 object-contain rounded border border-[#D1D5DB] shadow-sm cursor-pointer"
                  onClick={() => setEnlargedImage(property.existingImage)}
                />
              </div>
            )}
            <input
              className="w-full p-3 mb-4 rounded border border-[#E0E7FF] focus:border-[#4F46E5] focus:ring-1 focus:ring-[#6366F1] text-[#374151]"
              type="number"
              name="price"
              placeholder="Price ($)"
              value={property.price}
              onChange={handleChange}
              min="0"
            />

            <div className="flex space-x-3">
              <button
                className={`flex-1 py-3 rounded text-white font-semibold transition-transform duration-300 ${
                  editingId
                    ? "bg-[#4F46E5] hover:bg-[#6366F1] active:scale-95"
                    : "bg-[#4F46E5] hover:bg-[#6366F1] active:scale-95"
                }`}
                onClick={handleSave}
              >
                {editingId ? "Update Property" : "Add Property"}
              </button>
              {editingId && (
                <button
                  className="flex-1 py-3 rounded bg-gray-300 text-[#374151] font-semibold hover:bg-gray-400 active:scale-95 transition duration-300"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* Property Display Section */}
          <div className="w-full max-w-3xl mx-auto mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 mb-20">
            {properties.length === 0 ? (
              <div
                className="bg-[#FFFFFF] p-8 rounded-lg shadow-md text-center"
                style={{ color: "#374151" }}
              >
                <p className="text-lg">No properties found. Add your first property!</p>
              </div>
            ) : (
              properties.map((prop) => (
                <div
                  key={prop._id}
                  className="bg-[#FFFFFF] rounded-lg shadow-md cursor-pointer transition-transform duration-300 hover:scale-[1.03] hover:shadow-lg"
                  onClick={() => handleEdit(prop)}
                >
                  {prop.image && (
                    <img
                      src={prop.image}
                      alt={prop.type}
                      className="w-full h-44 object-cover rounded-t-lg cursor-pointer"
                      loading="lazy"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEnlargedImage(prop.image);
                      }}
                    />
                  )}
                  <div className="p-4">
                    <h2
                      className="text-xl font-semibold mb-2"
                      style={{ color: "#4F46E5" }}
                    >
                      {prop.name}
                    </h2>
                    <p className="text-[#374151] mb-1">
                      <strong>Location:</strong> {prop.location}
                    </p>
                    <p className="text-[#374151] mb-1">
                      <strong>Type:</strong> {prop.type}
                    </p>
                    <p className="text-[#374151] mb-1">
                      <strong>Size:</strong> {prop.size} sq ft
                    </p>
                    <p className="text-[#374151] mb-1">
                      <strong>Amenities:</strong> {prop.amenities}
                    </p>
                    <p className="text-[#374151] mb-3">
                      <strong>Price:</strong> ${prop.price}
                    </p>

                    <div className="flex space-x-3">
                      <button
                        className="flex-1 bg-[#6366F1] text-white py-2 rounded hover:bg-[#4F46E5] active:scale-95 transition duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(prop);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 active:scale-95 transition duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(prop._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="fixed right-0 top-0 w-[300px] h-full bg-white shadow-lg p-4 overflow-y-auto">
          <h2 className="text-xl font-bold text-[#4F46E5] mb-4">Recent Activities</h2>
          <div className="space-y-4">
            <div className="p-3 bg-[#F9FAFB] rounded-lg">
              <p className="text-sm text-[#374151]">New property added: Sunshine Villa</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
            <div className="p-3 bg-[#F9FAFB] rounded-lg">
              <p className="text-sm text-[#374151]">Property updated: Downtown Office</p>
              <p className="text-xs text-gray-500">5 hours ago</p>
            </div>
            <div className="p-3 bg-[#F9FAFB] rounded-lg">
              <p className="text-sm text-[#374151]">New user registered: John Doe</p>
              <p className="text-xs text-gray-500">1 day ago</p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-[#4F46E5] mt-8 mb-4">Quick Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-[#F9FAFB] rounded-lg">
              <p className="text-sm text-gray-500">Total Properties</p>
              <p className="text-lg font-bold text-[#4F46E5]">{properties.length}</p>
            </div>
            <div className="p-3 bg-[#F9FAFB] rounded-lg">
              <p className="text-sm text-gray-500">Apartments</p>
              <p className="text-lg font-bold text-[#4F46E5]">
                {properties.filter((p) => p.type === "Apartment").length}
              </p>
            </div>
            <div className="p-3 bg-[#F9FAFB] rounded-lg">
              <p className="text-sm text-gray-500">Villas</p>
              <p className="text-lg font-bold text-[#4F46E5]">
                {properties.filter((p) => p.type === "Villa").length}
              </p>
            </div>
            <div className="p-3 bg-[#F9FAFB] rounded-lg">
              <p className="text-sm text-gray-500">Offices</p>
              <p className="text-lg font-bold text-[#4F46E5]">
                {properties.filter((p) => p.type === "Office").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enlarged Image Modal */}
      {enlargedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 cursor-pointer"
          onClick={() => setEnlargedImage(null)}
        >
          <img
            src={enlargedImage}
            alt="Enlarged"
            className="max-w-[90vw] max-h-[90vh] rounded shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking the image itself
          />
          <button
            onClick={() => setEnlargedImage(null)}
            className="absolute top-4 right-4 text-white text-3xl font-bold focus:outline-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyManager;
