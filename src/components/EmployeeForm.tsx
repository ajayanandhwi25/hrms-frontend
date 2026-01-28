import { useState } from "react";
import { api } from "../Api/api";
import { Employee } from "../types";

interface Props {
  refresh: () => void;
}

const initialState: Employee = {
  employee_id: "",
  full_name: "",
  email: "",
  department: "",
};

export default function EmployeeForm({ refresh }: Props) {
  const [form, setForm] = useState<Employee>(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    try {
      setLoading(true);
      await api.post("/employees", form);
      refresh();
      setForm(initialState);
    } catch (err: any) {
      alert(err.response?.data?.detail || "Error adding employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Add Employee</h3>

      <input name="employee_id" placeholder="Employee ID" value={form.employee_id} onChange={handleChange} />
      <input name="full_name" placeholder="Full Name" value={form.full_name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="department" placeholder="Department" value={form.department} onChange={handleChange} />

      <button onClick={submit} disabled={loading}>
        {loading ? "Saving..." : "Add Employee"}
      </button>
    </div>
  );
}