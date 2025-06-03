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

  // Fetch properties from backend on component mount
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/properties');
        if (!response.ok) throw new Error('Failed to fetch properties');
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error('Fetch error:', error);
        alert('Failed to load properties');
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
        existingImage: null
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
    formData.append('name', property.name);
    formData.append('location', property.location);
    formData.append('type', property.type);
    formData.append('size', property.size);
    formData.append('amenities', property.amenities);
    formData.append('price', property.price);
    
    if (property.image instanceof File) {
      formData.append('image', property.image);
    }

    try {
      const url = editingId 
        ? `http://localhost:5000/api/properties/${editingId}`
        : 'http://localhost:5000/api/properties';

      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) throw new Error(response.statusText);

      const result = await response.json();
      const savedProperty = result.property;

      if (editingId) {
        setProperties(properties.map(p => 
          p._id === editingId ? {
            ...savedProperty,
            image: savedProperty.image 
              ? `http://localhost:5000/uploads/properties/${savedProperty.image}`
              : property.existingImage
          } : p
        ));
      } else {
        setProperties([...properties, {
          ...savedProperty,
          image: savedProperty.image 
            ? `http://localhost:5000/uploads/properties/${savedProperty.image}`
            : null
        }]);
      }

      resetForm();
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save property');
    }
  };

  const handleEdit = (propertyToEdit) => {
    setProperty({
      ...propertyToEdit,
      image: null,
      existingImage: propertyToEdit.image
    });
    setEditingId(propertyToEdit._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/properties/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to delete');
      
      setProperties(properties.filter(p => p._id !== id));
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete property');
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
      existingImage: null
    });
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-100 p-10 w-full ml-[250px] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-lg text-gray-700">Loading properties...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-10 w-full flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-900 mb-10 transform hover:scale-105 transition duration-300">
        Property Management
      </h1>

      {/* Property Input Form */}
      <div className="bg-white w-full max-w-3xl mx-auto p-5 rounded-lg shadow-md hover:shadow-lg transition duration-300">
        <input 
          className="w-full p-2 border rounded mb-2 hover:border-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition"
          type="text" 
          name="name" 
          placeholder="Property Name" 
          value={property.name} 
          onChange={handleChange} 
        />
        <input 
          className="w-full p-2 border rounded mb-2 hover:border-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition"
          type="text" 
          name="location" 
          placeholder="Location" 
          value={property.location} 
          onChange={handleChange} 
        />
        <select 
          className="w-full p-2 border rounded mb-2 hover:border-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition"
          name="type" 
          value={property.type} 
          onChange={handleChange}
        >
          <option value="">Select Type</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
          <option value="Office">Office</option>
        </select>
        <input 
          className="w-full p-2 border rounded mb-2 hover:border-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition"
          type="text" 
          name="size" 
          placeholder="Size (sq ft)" 
          value={property.size} 
          onChange={handleChange} 
        />
        <input 
          className="w-full p-2 border rounded mb-2 hover:border-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition"
          type="text" 
          name="amenities" 
          placeholder="Amenities" 
          value={property.amenities} 
          onChange={handleChange} 
        />
        <input 
          className="w-full p-2 border rounded mb-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
          type="file" 
          name="image" 
          ref={fileInputRef} 
          onChange={handleChange} 
        />
        {property.existingImage && (
          <div className="mb-2 transition duration-300 hover:bg-gray-50 p-2 rounded">
            <p className="text-sm text-gray-600">Current Image:</p>
            <img 
              src={property.existingImage} 
              alt="Current" 
              className="h-20 object-contain rounded border hover:shadow-md transition" 
            />
          </div>
        )}
        <input 
          className="w-full p-2 border rounded mb-2 hover:border-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition"
          type="number" 
          name="price" 
          placeholder="Price ($)" 
          value={property.price} 
          onChange={handleChange} 
          min="0" 
        />

        <div className="flex space-x-2">
          <button 
            className={`flex-1 py-2 rounded transition duration-300 ${editingId ? 
              'bg-green-500 hover:bg-green-600 hover:scale-105 active:scale-95' : 
              'bg-blue-500 hover:bg-blue-600 hover:scale-105 active:scale-95'}`}
            onClick={handleSave}
          >
            {editingId ? "Update Property" : "Add Property"}
          </button>
          {editingId && (
            <button 
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 hover:scale-105 active:scale-95 transition duration-300"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Property Display Section */}
      <div className="w-full max-w-3xl mx-auto mt-6 flex flex-col items-center">
        {properties.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center w-full hover:shadow-lg transition duration-300">
            <p className="text-gray-500 text-lg">No properties found. Add your first property!</p>
          </div>
        ) : (
          properties.map((prop) => (
            <div 
              key={prop._id} 
              className="bg-white w-full p-4 rounded-lg shadow-md mb-4 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.99] cursor-pointer"
              onClick={() => handleEdit(prop)}
            >
              {prop.image && (
                <img 
                  src={prop.image} 
                  alt={prop.type} 
                  className="w-full h-48 object-cover rounded mb-3 hover:brightness-95 transition duration-300"
                />
              )}
              <h2 className="text-lg font-bold hover:text-blue-600 transition">{prop.name}</h2>
              <p className="hover:bg-gray-50 p-1 rounded"><strong>Location:</strong> {prop.location}</p>
              <p className="hover:bg-gray-50 p-1 rounded"><strong>Type:</strong> {prop.type}</p>
              <p className="hover:bg-gray-50 p-1 rounded"><strong>Size:</strong> {prop.size} sq ft</p>
              <p className="hover:bg-gray-50 p-1 rounded"><strong>Amenities:</strong> {prop.amenities}</p>
              <p className="hover:bg-gray-50 p-1 rounded"><strong>Price:</strong> ${prop.price}</p>

              <div className="mt-3 flex space-x-2">
                <button 
                  className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition duration-300 hover:scale-105 active:scale-95"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(prop);
                  }}
                >
                  Edit
                </button>
                <button 
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition duration-300 hover:scale-105 active:scale-95"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(prop._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PropertyManager;