
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

const TextareaField = ({ id, label, placeholder, rows = 3 }: { id: string, label: string, placeholder: string, rows?: number }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <textarea
            id={id}
            rows={rows}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#00A79D] focus:outline-none transition bg-white resize-y"
            placeholder={placeholder}
        ></textarea>
    </div>
);

const DoctorDashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Doctor Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        
        {/* Add New Follow-up Section */}
        <div className="lg:col-span-3 bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-slate-700 mb-6">Add New Follow-up</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField id="patientId" label="Patient ID" placeholder="Enter Patient ID" />
              <InputField id="doctorId" label="Doctor ID" placeholder="Enter Doctor ID" />
            </div>
            <TextareaField id="notes" label="Notes" placeholder="Enter Notes" rows={4} />
            <TextareaField id="recommendations" label="Recommendations" placeholder="Enter Recommendations" rows={4} />
            <TextareaField id="futurePlan" label="Future Plan" placeholder="Enter Future Plan" rows={4} />
            <div className="flex justify-start pt-4">
              <button
                type="submit"
                className="bg-[#00A79D] text-white font-bold py-2 px-6 rounded-lg hover:bg-[#00897b] transition"
              >
                Add Follow-up
              </button>
            </div>
          </form>
        </div>

        {/* View Patient History Section */}
        <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-slate-700 mb-6">View Patient History</h2>
          <form className="space-y-6">
            <InputField id="filterFollowUpId" label="Optional Follow-up ID to filter" placeholder="Enter Follow-up ID" />
             <div className="flex flex-col sm:flex-row gap-4 pt-2">
               <button
                type="button"
                className="flex-1 bg-white text-[#00A79D] border border-[#00A79D] font-bold py-2 px-6 rounded-lg hover:bg-[#e0f2f1] transition"
              >
                View Previous Follow-ups
              </button>
              <button
                type="button"
                className="flex-1 bg-white text-[#00A79D] border border-[#00A79D] font-bold py-2 px-6 rounded-lg hover:bg-[#e0f2f1] transition"
              >
                View Patient Reports
              </button>
            </div>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default DoctorDashboard;
