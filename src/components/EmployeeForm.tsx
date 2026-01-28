import { useState } from "react";
import { api } from "../Api/api";
import { Employee } from "../types";

const initialState: Employee = {
  employee_id: "",
  full_name: "",
  email: "",
  department: "",
};

export default function EmployeeForm({ refresh }: { refresh: () => void }) {
  const [form, setForm] = useState<Employee>(initialState);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError(null);
    setLoading(true);

    try {
      await api.post("/employees", form);
      refresh();
      setForm(initialState);
    } catch (err: any) {
      // FastAPI error message
      const message =
        err?.response?.data?.detail || "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="section-title">Add Employee</h2>

      {/* 🔴 ERROR POPUP */}
      {error && (
        <div className="mb-4 rounded-md border border-red-500 bg-red-900/40 px-4 py-2 text-red-300">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="input" placeholder="Employee ID"
          value={form.employee_id}
          onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
        />
        <input className="input" placeholder="Full Name"
          value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
        />
        <input className="input" placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input className="input" placeholder="Department"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        />
      </div>

      <button
        type="button"
        onClick={submit}
        disabled={loading}
        className="btn-primary mt-4"
      >
        {loading ? "Saving..." : "Add Employee"}
      </button>
    </div>
  );
}