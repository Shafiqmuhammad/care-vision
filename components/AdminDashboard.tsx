
import React from 'react';

const InputField = ({ id, label, placeholder, type = 'text' }: { id: string, label: string, placeholder: string, type?: string }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <input
            type={type}
            id={id}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#00A79D] focus:outline-none transition bg-white"
            placeholder={placeholder}
        />
    </div>
);

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Admin Dashboard</h1>
      <div className="bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-slate-700 mb-6">Add New Doctor</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField id="doctorName" label="Doctor Name" placeholder="Enter doctor's full name" />
            <InputField id="specialization" label="Specialization" placeholder="e.g., Cardiology, Pediatrics" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField id="contactNumber" label="Contact Number" placeholder="Enter contact number" />
            <InputField id="email" label="Email" placeholder="Enter email address" type="email" />
          </div>
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-[#00A79D] text-white font-bold py-2 px-6 rounded-lg hover:bg-[#00897b] transition duration-300"
            >
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
