
import React, { useState, useCallback } from 'react';
import { summarizeReport } from '../services/geminiService';
import { UploadIcon } from './icons/UploadIcon';

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

const FileUpload: React.FC<{ file: File | null, setFile: (file: File | null) => void }> = ({ file, setFile }) => {
    const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.currentTarget.classList.add('border-[#00A79D]');
    };
    const onDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.currentTarget.classList.remove('border-[#00A79D]');
    };
    const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.currentTarget.classList.remove('border-[#00A79D]');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <div>
            <label htmlFor="reportFile" className="block text-sm font-medium text-slate-700 mb-1">Report File</label>
            <label 
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className="flex flex-col items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-slate-300 border-dashed rounded-lg appearance-none cursor-pointer hover:border-slate-400 focus:outline-none">
                <UploadIcon className="w-8 h-8 text-slate-400"/>
                <span className="flex items-center space-x-2 mt-2">
                    <span className="font-medium text-[#00A79D]">Choose Files</span>
                    <span className="text-slate-500">or drag and drop</span>
                </span>
                <span className="text-xs text-slate-500 mt-1">
                    {file ? file.name : "No file chosen"}
                </span>
                <input id="reportFile" type="file" className="hidden" onChange={onFileChange}/>
            </label>
        </div>
    );
};

const ManagementDashboard: React.FC = () => {
    const [reportFile, setReportFile] = useState<File | null>(null);
    const [summary, setSummary] = useState<string>('');
    const [isSummarizing, setIsSummarizing] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleSummarize = useCallback(async () => {
        if (!reportFile) return;

        setIsSummarizing(true);
        setError('');
        setSummary('');

        const reader = new FileReader();
        reader.readAsDataURL(reportFile);
        reader.onload = async () => {
            try {
                const base64String = (reader.result as string).split(',')[1];
                const result = await summarizeReport(base64String, reportFile.type);
                setSummary(result);
            } catch (e) {
                setError(e instanceof Error ? e.message : 'An unknown error occurred.');
            } finally {
                setIsSummarizing(false);
            }
        };
        reader.onerror = () => {
            setError('Failed to read the file.');
            setIsSummarizing(false);
        };
    }, [reportFile]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Management Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Add Patient Card */}
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-slate-700 mb-6">Add Patient</h2>
          <form className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField id="patientName" label="Name" placeholder="Enter patient name" />
                <InputField id="patientAge" label="Age" placeholder="Enter patient age" type="number" />
            </div>
            <InputField id="patientAddress" label="Address" placeholder="Enter patient address" />
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField id="patientContact" label="Contact" placeholder="Enter patient contact" />
                <div>
                     <label htmlFor="gender" className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                     <select id="gender" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#00A79D] focus:outline-none transition bg-white">
                         <option>Male</option>
                         <option>Female</option>
                         <option>Other</option>
                     </select>
                </div>
            </div>
            <div className="flex justify-start pt-4">
              <button type="submit" className="bg-[#00A79D] text-white font-bold py-2 px-6 rounded-lg hover:bg-[#00897b] transition">
                Add Patient
              </button>
            </div>
          </form>
        </div>

        {/* Upload Reports Card */}
        <div className="bg-white p-8 rounded-xl shadow-md space-y-6">
          <h2 className="text-2xl font-semibold text-slate-700">Upload Reports</h2>
          <form className="space-y-6">
            <InputField id="patientId" label="Patient ID" placeholder="Enter patient ID" />
            <FileUpload file={reportFile} setFile={setReportFile} />
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button type="button" className="bg-[#00A79D] text-white font-bold py-2 px-6 rounded-lg hover:bg-[#00897b] transition">
                Upload Reports
              </button>
               <button type="button" onClick={handleSummarize} disabled={!reportFile || isSummarizing} className="bg-slate-700 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-600 transition disabled:bg-slate-300 disabled:cursor-not-allowed">
                {isSummarizing ? 'Summarizing...' : 'Summarize with AI'}
              </button>
            </div>
          </form>
          {summary && (
              <div className="mt-6 p-4 bg-teal-50 border border-teal-200 rounded-lg">
                  <h3 className="font-semibold text-teal-800 mb-2">AI Summary</h3>
                  <p className="text-sm text-slate-700 whitespace-pre-wrap">{summary}</p>
              </div>
          )}
          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        </div>

      </div>
    </div>
  );
};

export default ManagementDashboard;
