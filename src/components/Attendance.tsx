import { useState } from "react";
import { AttendancePayload } from "../types";
import { api } from "../Api/api";

const initialState: AttendancePayload = {
  employee_id: "",
  date: "",
  status: "Present",
};

export default function Attendance() {
  const [data, setData] = useState<AttendancePayload>(initialState);

  const submit = async () => {
    try {
      await api.post("/attendance", data);
      alert("Attendance marked");
      setData(initialState);
    } catch (err: any) {
      alert(err.response?.data?.detail || "Error marking attendance");
    }
  };

  return (
    <div>
      <h3>Mark Attendance</h3>

      <input
        placeholder="Employee ID"
        value={data.employee_id}
        onChange={(e) => setData({ ...data, employee_id: e.target.value })}
      />

      <input
        type="date"
        value={data.date}
        onChange={(e) => setData({ ...data, date: e.target.value })}
      />

      <select
        value={data.status}
        onChange={(e) => setData({ ...data, status: e.target.value as "Present" | "Absent" })}
      >
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select>

      <button onClick={submit}>Submit</button>
    </div>
  );
}
