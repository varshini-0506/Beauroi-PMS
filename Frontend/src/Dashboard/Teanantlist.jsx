import { useState, useEffect } from 'react';
import { FaSearch, FaUser } from 'react-icons/fa';

const TenantList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tenants, setTenants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tenantsPerPage = 5;

  // Fetch tenants from API
  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await fetch('http://localhost:5000/displayTenantProfile'); // Adjust the URL as needed
        const data = await response.json();
        setTenants(data.data);
      } catch (error) {
        console.error('Failed to fetch tenants:', error);
      }
    };

    fetchTenants();
  }, []);

  // Search filtering
  const filteredTenants = tenants.filter(tenant =>
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.contact.includes(searchTerm)
  );

  // Pagination logic
  const indexOfLastTenant = currentPage * tenantsPerPage;
  const indexOfFirstTenant = indexOfLastTenant - tenantsPerPage;
  const currentTenants = filteredTenants.slice(indexOfFirstTenant, indexOfLastTenant);
  const totalPages = Math.ceil(filteredTenants.length / tenantsPerPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen ml-[30px]">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <FaUser className="mr-2 text-blue-500" />
          Tenant List
        </h2>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or contact"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tenant Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-6 py-3 border border-gray-300">#</th>
                <th className="px-6 py-3 border border-gray-300">Name</th>
                <th className="px-6 py-3 border border-gray-300">Email</th>
                <th className="px-6 py-3 border border-gray-300">Contact</th>
                <th className="px-6 py-3 border border-gray-300">Image</th>
                <th className="px-6 py-3 border border-gray-300">Property</th>
                <th className="px-6 py-3 border border-gray-300">Rent Status</th>
              </tr>
            </thead>
            <tbody>
              {currentTenants.map((tenant, index) => (
                <tr key={tenant.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 border border-gray-300">{indexOfFirstTenant + index + 1}</td>
                  <td className="px-6 py-4 border border-gray-300">{tenant.name}</td>
                  <td className="px-6 py-4 border border-gray-300">{tenant.email}</td>
                  <td className="px-6 py-4 border border-gray-300">{tenant.phone}</td>
                  <td className="px-6 py-4 border border-gray-300">
                    <img src={tenant.profileUrl?tenant.profileUrl:"https://ik.imagekit.io/varsh0506/Beauroi/profile_female.jfif?updatedAt=1742465364791"} alt={tenant.name} className="w-10 h-10 rounded-full mx-auto" />
                  </td>
                  <td className="px-6 py-4 border border-gray-300">{tenant.property}</td>
                  <td className="px-6 py-4 border border-gray-300">
                    <span className={tenant.rentPaid ? "text-green-500" : "text-red-500"}>
                      {tenant.rentPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="mt-6 flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TenantList;
