import React, { useState } from "react";
import PageTitle from "../components/Typography/PageTitle";
import { Input, Label, Select } from "@windmill/react-ui";
import { Button } from "@windmill/react-ui";

const Department = [
  {
    department: "CSE",
  },
  {
    department: "ISE",
  },
  {
    department: "CE",
  },
  {
    department: "AIDS",
  },
  {
    department: "CT",
  },
  {
    department: "CSBS",
  },
];

const Semester = [
  "Semester 4",
  "Semester 5",
  "Semester 6",
  "Semester 7",
  "Semester 8",
];

function ApplyForms() {
  const [academicYear, setAcademicYear] = useState("");
  const [semester, setSemester] = useState("");
  const [department, setDepartment] = useState("");
  const [file, setFile] = useState(null);

  const handleAcademicSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  const handleDepartmentChange = (e) => {
    const selectedDepartment = e.target.value;
    setDepartment(selectedDepartment);
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  const handleSubmit = () => {
    console.log("Academic Year:", academicYear);
    console.log("Semester:", semester);
    console.log("Department:", department);
    if (file) {
      console.log("File:", file); // Log the uploaded file
    }
  };

  return (
    <>
      <PageTitle>Apply Course Exemption</PageTitle>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label>
          <span>Roll No</span>
          <Input className="mt-1" placeholder="7376211CS239" />
        </Label>
        <Label className="mt-4">
          <span>Name</span>
          <Input className="mt-1" placeholder="Poovarasan" />
        </Label>
        <div className="mt-4">
          <Label>Semester</Label>
          <div className="mt-2">
            <Select
              className="mt-1"
              onChange={handleDepartmentChange}
              value={department}
            >
              <option value="">Select Semester</option>
              {Semester.map((Semester, index) => (
                <option key={index} value={Semester}>
                  {Semester}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="mt-4">
          <Label>Department</Label>
          <div className="mt-2">
            <Select
              className="mt-1"
              onChange={handleDepartmentChange}
              value={department}
            >
              <option value="">Select Department</option>
              {Department.map((dept, index) => (
                <option key={index} value={dept.department}>
                  {dept.department}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* File Upload Field */}
        <div className="mt-4">
          <Label className="mt-4">
            <span>Upload PDF File</span>
            <Input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="mt-1"
              placeholder="Sem 1"
            />
          </Label>
        </div>

        <div className="mt-5">
          <Button onClick={handleSubmit}>Register</Button>
        </div>
      </div>
    </>
  );
}

export default ApplyForms;
