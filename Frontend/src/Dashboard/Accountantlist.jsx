import { useState } from 'react';
import { FaSearch, FaUserTie, FaEdit, FaTrash } from 'react-icons/fa';

const initialAccountants = [
  { id: 1, name: "John Doe", email: "john@mail.com", contact: "7775552214", image: "https://via.placeholder.com/40", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@mail.com", contact: "7896547855", image: "https://via.placeholder.com/40", status: "Inactive" },
  { id: 3, name: "Robert Johnson", email: "robert@mail.com", contact: "9856321470", image: "https://via.placeholder.com/40", status: "Active" },
  { id: 4, name: "Emily Clark", email: "emily@mail.com", contact: "8765432190", image: "https://via.placeholder.com/40", status: "Active" },
  { id: 5, name: "Michael Brown", email: "michael@mail.com", contact: "7654321890", image: "https://via.placeholder.com/40", status: "Inactive" },
  { id: 6, name: "Sophia Wilson", email: "sophia@mail.com", contact: "6543210987", image: "https://via.placeholder.com/40", status: "Active" }
];

const AccountantList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [accountants, setAccountants] = useState(initialAccountants);

  const filteredAccountants = accountants.filter(acc =>
    acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    acc.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    acc.contact.includes(searchTerm)
  );

  const deleteAccountant = (id) => {
    setAccountants(accountants.filter(acc => acc.id !== id));
  };

  return (
    <div className="bg-white shadow-lg rounded-3xl p-8 w-full transition-all">

      <div className="bg-white shadow-lg rounded-3xl p-8 w-full max-w-8xl">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8 flex items-center gap-3">
          <FaUserTie className="text-blue-600 text-3xl" />
          Accountant Directory
        </h2>

        {/* Search Input */}
        <div className="relative mb-8">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search by name, email, or contact..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl shadow-md">
          <table className="min-w-full bg-white rounded-xl">
            <thead>
              <tr className="bg-blue-100 text-gray-700 text-sm font-semibold">
                <th className="px-6 py-4 text-left">#</th>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Contact</th>
                <th className="px-6 py-4 text-left">Image</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccountants.map((acc, index) => (
                <tr key={acc.id} className="border-t hover:bg-blue-50 transition-colors text-sm">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">{acc.name}</td>
                  <td className="px-6 py-4 text-gray-600">{acc.email}</td>
                  <td className="px-6 py-4">{acc.contact}</td>
                  <td className="px-6 py-4">
                    <img
                      src={acc.image}
                      alt={acc.name}
                      className="w-10 h-10 rounded-full object-cover border border-gray-300"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${acc.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"}`}>
                      {acc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center justify-center gap-4 text-lg">
                    <button className="text-indigo-500 hover:text-indigo-700">
                      <FaEdit />
                    </button>
                    <button onClick={() => deleteAccountant(acc.id)} className="text-rose-500 hover:text-rose-700">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredAccountants.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-6 text-center text-gray-500">
                    No accountants found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccountantList;
