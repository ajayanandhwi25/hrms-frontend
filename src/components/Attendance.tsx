import { useState } from "react";
import { api } from "../Api/api";

export default function Attendance() {
  const [data, setData] = useState({
    employee_id: "",
    date: "",
    status: "Present",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError(null);
    setLoading(true);

    try {
      await api.post("/attendance", data);
      alert("Attendance marked successfully");
      setData({ employee_id: "", date: "", status: "Present" });
    } catch (err: any) {
      let message = "Something went wrong";

      if (err.response?.status === 422) {
        // FastAPI validation error
        const errors = err.response.data.detail;
        message = errors
          .map((e: any) => `${e.loc[e.loc.length - 1]}: invalid value`)
          .join(", ");
      } else if (err.response?.data?.detail) {
        message = err.response.data.detail;
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="section-title">Mark Attendance</h2>

      {/* ERROR POPUP */}
      {error && (
        <div className="mb-4 rounded-md border border-red-500 bg-red-900/40 px-4 py-2 text-red-300">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          className="input"
          placeholder="Employee ID"
          value={data.employee_id}
          onChange={(e) =>
            setData({ ...data, employee_id: e.target.value })
          }
        />

        <input
          type="date"
          className="input"
          value={data.date}
          onChange={(e) =>
            setData({ ...data, date: e.target.value })
          }
        />

        <select
          className="input"
          value={data.status}
          onChange={(e) =>
            setData({ ...data, status: e.target.value })
          }
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
      </div>

      <button
        type="button"
        onClick={submit}
        disabled={loading}
        className="btn-primary mt-4"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}