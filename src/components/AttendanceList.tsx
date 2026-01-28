import { useState } from "react";
import { api } from "../Api/api";

interface Attendance {
  id: number;
  date: string;
  status: "Present" | "Absent";
}

export default function AttendanceList() {
  const [employeeId, setEmployeeId] = useState("");
  const [records, setRecords] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAttendance = async () => {
    if (!employeeId) {
      setError("Please enter Employee ID");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await api.get(`/attendance/${employeeId}`);
      setRecords(res.data);
    } catch (err: any) {
      setError(
        err?.response?.data?.detail || "Failed to fetch attendance"
      );
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="section-title">Attendance Records</h2>

      {/* Input */}
      <div className="flex gap-3 mb-4">
        <input
          className="input"
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />
        <button
          type="button"
          onClick={fetchAttendance}
          className="btn-primary"
        >
          View
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-3 rounded border border-red-500 bg-red-900/40 px-3 py-2 text-red-300">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && <p className="text-gray-400">Loading...</p>}

      {/* Records */}
      {!loading && records.length === 0 && (
        <p className="text-gray-400">No attendance records found.</p>
      )}
      {records.length > 0 && (
        <table className="w-full border-collapse mt-3">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id} className="border-t border-gray-700">
                <td className="p-2">{r.date}</td>
                <td className="p-2">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}