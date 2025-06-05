import { useState } from 'react';
import { FaSearch, FaUserTie, FaEdit, FaTrash } from 'react-icons/fa';

const initialAccountants = [
  { id: 1, name: "John Doe", email: "john@mail.com", contact: "7775552214", image: "https://ik.imagekit.io/varsh0506/Beauroi/profile_female.jfif?updatedAt=1742465364791", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@mail.com", contact: "7896547855", image: "https://ik.imagekit.io/varsh0506/Beauroi/profile_make.jfif?updatedAt=1742465364781", status: "Inactive" },
  { id: 3, name: "Robert Johnson", email: "robert@mail.com", contact: "9856321470", image: "https://ik.imagekit.io/varsh0506/Beauroi/profile_female.jfif?updatedAt=1742465364791", status: "Active" },
  { id: 4, name: "Emily Clark", email: "emily@mail.com", contact: "8765432190", image: "https://ik.imagekit.io/varsh0506/Beauroi/profile_make.jfif?updatedAt=1742465364781", status: "Active" },
  { id: 5, name: "Michael Brown", email: "michael@mail.com", contact: "7654321890", image: "https://ik.imagekit.io/varsh0506/Beauroi/profile_make.jfif?updatedAt=1742465364781", status: "Inactive" },
  { id: 6, name: "Sophia Wilson", email: "sophia@mail.com", contact: "6543210987", image: "https://ik.imagekit.io/varsh0506/Beauroi/profile_female.jfif?updatedAt=1742465364791", status: "Active" }
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
    <div className=" p-8 w-full bg-gray-50 min-h-screen transition-all ml-[250px]">
      <div className="bg-white shadow-xl rounded-2xl p-8 transition-transform hover:scale-[1.01] duration-300 ease-in-out">
        <h2 className="text-3xl font-bold text-slate-700 mb-8 flex items-center gap-3">
          <FaUserTie className="text-indigo-600 text-3xl" />
          Accountant Directory
        </h2>

        {/* Search Input */}
        <div className="relative mb-6">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg" />
          <input
            type="text"
            placeholder="Search by name, email, or contact..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 bg-white"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl shadow-lg">
          <table className="min-w-full bg-white rounded-xl">
            <thead>
              <tr className="bg-indigo-100 text-slate-700 text-sm font-semibold">
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
                <tr
                  key={acc.id}
                  className="border-t border-gray-200 hover:bg-indigo-50 transition duration-200 ease-in-out text-sm"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-medium text-slate-800">{acc.name}</td>
                  <td className="px-6 py-4 text-slate-600">{acc.email}</td>
                  <td className="px-6 py-4">{acc.contact}</td>
                  <td className="px-6 py-4">
                    <img
                      src={acc.image}
                      alt={acc.name}
                      className="w-10 h-10 rounded-full object-cover mx-auto border border-gray-200"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        acc.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {acc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center justify-center gap-4 text-lg">
                    <button className="text-indigo-600 hover:text-indigo-800 transition">
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteAccountant(acc.id)}
                      className="text-rose-500 hover:text-rose-700 transition"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredAccountants.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-6 text-center text-slate-500">
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