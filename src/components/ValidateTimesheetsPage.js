import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ValidateTimesheetsPage = ({ user }) => {
  const navigate = useNavigate();

  const [pastTimesheets, setPastTimesheets] = useState([]);
  const [selectedTimesheet, setSelectedTimesheet] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    const storedTimesheets =
      JSON.parse(localStorage.getItem("timesheets")) || [];
    setPastTimesheets(storedTimesheets);
  }, []);

  const handleApprove = (id) => {
    const updatedTimesheets = pastTimesheets.map((timesheet) => {
      if (timesheet.id === id) {
        return { ...timesheet, status: "Approved" };
      }
      return timesheet;
    });
    setPastTimesheets(updatedTimesheets);
    localStorage.setItem("timesheets", JSON.stringify(updatedTimesheets));
  };

  const handleReject = (id) => {
    const timesheetToReject = pastTimesheets.find(
      (timesheet) => timesheet.id === id
    );
    setSelectedTimesheet(timesheetToReject);
    setShowRejectModal(true);
  };

  const handleRejectConfirm = () => {
    const updatedTimesheets = pastTimesheets.map((timesheet) => {
      if (timesheet.id === selectedTimesheet.id) {
        return {
          ...timesheet,
          status: "Rejected",
          rejectionReason: rejectionReason,
        };
      }
      return timesheet;
    });
    setPastTimesheets(updatedTimesheets);
    localStorage.setItem("timesheets", JSON.stringify(updatedTimesheets));
    setShowRejectModal(false);
    setRejectionReason("");
  };

  const handleRejectCancel = () => {
    setShowRejectModal(false);
    setRejectionReason("");
  };

  const handleClearRecords = () => {
    setPastTimesheets([]);
    localStorage.removeItem("timesheets");
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Validate Timesheets</h2>
        <div className="flex justify-end mb-4">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleClearRecords}
          >
            Clear Records
          </button>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <div className="max-h-[400px] overflow-y-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="px-4 py-3">Employee</th>
                  <th className="px-4 py-3">Employee ID</th>
                  <th className="px-4 py-3">Project</th>
                  <th className="px-4 py-3">From Date</th>
                  <th className="px-4 py-3">To Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Hours</th>
                  <th className="px-4 py-3">Actions</th>
                  <th className="px-4 py-3">Rejection Reason</th>
                </tr>
              </thead>
              <tbody>
                {pastTimesheets.map((timesheet) => (
                  <tr
                    key={timesheet.id}
                    className="border-b hover:bg-gray-100 transition-colors duration-300"
                  >
                    <td className="px-4 py-3">{timesheet.employee}</td>
                    <td className="px-4 py-3">{timesheet.employeeId}</td>
                    <td className="px-4 py-3">{timesheet.project}</td>
                    <td className="px-4 py-3">{timesheet.fromDate}</td>
                    <td className="px-4 py-3">{timesheet.toDate}</td>
                    <td className="px-4 py-3">{timesheet.status}</td>
                    <td className="px-4 py-3">{timesheet.hours}</td>
                    <td className="px-4 py-3">
                      {timesheet.status === "Pending" && (
                        <div className="flex space-x-2">
                          <button
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleApprove(timesheet.id)}
                          >
                            Approve
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleReject(timesheet.id)}
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {timesheet.status === "Rejected" && (
                        <span>{timesheet.rejectionReason}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate("/dashboard")}
          >
            Go Back to Dashboard
          </button>
        </div>

        {showRejectModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <div className="flex justify-end">
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={handleRejectCancel}
                >
                  &times;
                </button>
              </div>
              <h2 className="text-2xl font-bold mb-4">Reject Timesheet</h2>
              <p className="mb-4">
                Please provide a reason for rejecting this timesheet:
              </p>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter rejection reason..."
              ></textarea>
              <div className="flex justify-end space-x-2">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
                  onClick={handleRejectCancel}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  onClick={handleRejectConfirm}
                >
                  Confirm Reject
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidateTimesheetsPage;
