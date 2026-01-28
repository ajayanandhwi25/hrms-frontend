import { Employee } from "../types";
import { api } from "../Api/api";

export default function EmployeeList({
  employees,
  refresh,
}: {
  employees: Employee[];
  refresh: () => void;
}) {
  const remove = async (id: string) => {
    if (!confirm("Delete employee?")) return;
    await api.delete(`/employees/${id}`);
    refresh();
  };

 return (
  <div className="card">
    <h2 className="section-title">Employees</h2>

    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-700 text-left">
            <th className="p-3">ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Department</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e.employee_id} className="border-t border-gray-700">
              <td className="p-3">{e.employee_id}</td>
              <td className="p-3">{e.full_name}</td>
              <td className="p-3">{e.department}</td>
              <td className="p-3 text-center">
                <button
                  className="btn-danger"
                  onClick={() => remove(e.employee_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

}