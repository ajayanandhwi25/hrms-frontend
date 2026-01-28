import { api } from "../Api/api";
import { Employee } from "../types";

interface Props {
  employees: Employee[];
  refresh: () => void;
}

export default function EmployeeList({ employees, refresh }: Props) {
  const remove = async (employee_id: string) => {
    if (!confirm("Delete employee?")) return;
    await api.delete(`/employees/${employee_id}`);
    refresh();
  };

  if (employees.length === 0) {
    return <p>No employees found.</p>;
  }

  return (
    <ul>
      {employees.map((emp) => (
        <li key={emp.employee_id}>
          <strong>{emp.full_name}</strong> — {emp.department}
          <button onClick={() => remove(emp.employee_id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
