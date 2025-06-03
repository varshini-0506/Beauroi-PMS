
import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

const MaintenanceManagement = () => {
    const [requests, setRequests] = useState([
        { id: 1, description: "Leaky faucet", assignedTo: "John Doe", status: "Pending" },
        { id: 2, description: "Broken AC", assignedTo: "Jane Smith", status: "In Progress" }
    ]);
    const [newRequest, setNewRequest] = useState("");
    const [assignedTo, setAssignedTo] = useState("");
    const [status, setStatus] = useState("Pending");
    const [editId, setEditId] = useState(null);
    const [editDescription, setEditDescription] = useState("");
    const [editAssignedTo, setEditAssignedTo] = useState("");

    const handleAddRequest = () => {
        if (newRequest.trim()) {
            const newReq = {
                id: requests.length + 1,
                description: newRequest,
                assignedTo: assignedTo || "Not Assigned",
                status
            };
            setRequests([...requests, newReq]);
            setNewRequest("");
            setAssignedTo("");
            setStatus("Pending");
        }
    };

    const handleStatusChange = (id, newStatus) => {
        setRequests(requests.map(request =>
            request.id === id ? { ...request, status: newStatus } : request
        ));
    };

    const handleEdit = (id, description, assigned) => {
        setEditId(id);
        setEditDescription(description);
        setEditAssignedTo(assigned);
    };

    const handleSaveEdit = (id) => {
        setRequests(requests.map(request =>
            request.id === id ? { ...request, description: editDescription, assignedTo: editAssignedTo } : request
        ));
        setEditId(null);
    };

    const handleDelete = (id) => {
        setRequests(requests.filter(request => request.id !== id));
    };

    return (
        <div className="min-h-screen w-full bg-gray-100 text-gray-900 p-6 ml-[250px] flex flex-col items-center">
            <header className="bg-blue-900 text-white p-4 ml-[250px] shadow-md w-full fixed top-0 left-0 z-10 flex justify-start">
                 <h2 className="text-xl font-semibold">Maintenance Team</h2>
          </header>

            <div className="mt-20 w-full max-w-6xl px-4">
                <h2 className="text-3xl font-bold mb-6 text-center">Maintenance Management</h2>

                <div className="bg-white p-6 shadow-md rounded-lg mb-6 flex flex-wrap gap-3 w-full">
                    <input
                        type="text"
                        value={newRequest}
                        onChange={(e) => setNewRequest(e.target.value)}
                        placeholder="Enter maintenance request"
                        className="flex-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                    <input
                        type="text"
                        value={assignedTo}
                        onChange={(e) => setAssignedTo(e.target.value)}
                        placeholder="Assign to"
                        className="flex-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <button
                        onClick={handleAddRequest}
                        className="px-6 py-3 bg-sky-400 text-white font-bold rounded-md hover:opacity-90"
                    >
                        Add
                    </button>
                </div>

                <ul className="w-full space-y-4">
                    {requests.map(request => (
                        <li key={request.id} className="bg-blue-900 text-white p-6 rounded-lg shadow-md flex flex-col gap-2">
                            {editId === request.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                        className="p-2 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                                    />
                                    <input
                                        type="text"
                                        value={editAssignedTo}
                                        onChange={(e) => setEditAssignedTo(e.target.value)}
                                        className="p-2 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                                    />
                                    <button
                                        onClick={() => handleSaveEdit(request.id)}
                                        className="px-4 py-2 bg-sky-400 text-white font-bold rounded-md hover:opacity-90"
                                    >
                                        Save
                                    </button>
                                </>
                            ) : (
                                <>
                                    <p><strong>Description:</strong> {request.description}</p>
                                    <p><strong>Assigned To:</strong> {request.assignedTo}</p>
                                    <p>
                                        <strong>Status:</strong>
                                        <select
                                            className="ml-2 p-2 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                                            value={request.status}
                                            onChange={(e) => handleStatusChange(request.id, e.target.value)}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                    </p>
                                    <div className="flex gap-3 mt-3">
                                        <button onClick={() => handleEdit(request.id, request.description, request.assignedTo)}
                                            className="px-4 py-2 bg-sky-400 text-white font-bold rounded-md hover:opacity-90 flex items-center gap-2">
                                            <Pencil size={18} /> Edit
                                        </button>
                                        <button onClick={() => handleDelete(request.id)}
                                            className="px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition-colors flex items-center gap-2">
                                            <Trash2 size={18} /> Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
      <h1>Maintenance Page</h1>
      <button onClick={() => navigate("/user/requestform")}>Go to Request Form</button>
    </div>

            <footer className="w-full text-center p-4 bg-gray-800 text-white mt-10">
                © 2025 Maintenance Management System. All Rights Reserved.
            </footer>
        </div>
    );
};

export default MaintenanceManagement;
