import React, { useState } from "react";
import PageTitle from "../components/Typography/PageTitle";
import { Input, Label, Select } from "@windmill/react-ui";
import { Button } from "@windmill/react-ui";

const Department = [
  {
    department: "CSE",
    courses: ["Course 1", "Course 2", "Course 3"],
  },
  {
    department: "ISE",
    courses: ["Course 4", "Course 5", "Course 6"],
  },
  {
    department: "CE",
    courses: ["Course 7", "Course 8", "Course 9"],
  },
];

function Forms() {
  const [academicYear, setAcademicYear] = useState("");
  const [semester, setSemester] = useState("");
  const [department, setDepartment] = useState("");
  const [selectedCourse1, setSelectedCourse1] = useState("");
  const [selectedCourse2, setSelectedCourse2] = useState("");
  const [honoursMinors, setHonoursMinors] = useState(""); // New state for honours/minors registration
  const [courses, setCourses] = useState([]);
  const [openElective, setopenElective] = useState("");
  const [addonCourse, setAddonCourse] = useState("");
  const handleAcademicYearChange = (e) => {
    setAcademicYear(e.target.value);
  };

  const handleAcademicSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  const handleDepartmentChange = (e) => {
    const selectedDepartment = e.target.value;
    setDepartment(selectedDepartment);
    // Find the selected department object
    const departmentObj = Department.find(
      (dep) => dep.department === selectedDepartment
    );
    // Set courses for the selected department
    setCourses(departmentObj ? departmentObj.courses : []);
  };

  const handleCourseChange = (courseIndex, courseValue) => {
    if (courseIndex === 1) {
      setSelectedCourse1(courseValue);
    } else if (courseIndex === 2) {
      setSelectedCourse2(courseValue);
    }
  };

  const handleHonoursMinorsChange = (e) => {
    setHonoursMinors(e.target.value);
  };
  const handleopenElectiveChange = (e) => {
    setopenElective(e.target.value);
  };
  const handleAddonCourseChange = (e) => {
    setAddonCourse(e.target.value);
  };
  const getSemesterOptions = () => {
    if (academicYear === "2021-2025") {
      return ["Semester 6", "Semester 7"];
    } else if (academicYear === "2022-2026") {
      return ["Semester 7", "Semester 8"];
    } else {
      return [];
    }
  };

  const handleSubmit = () => {
    // Logging all the input data
    console.log("Academic Year:", academicYear);
    console.log("Semester:", semester);
    console.log("Department:", department);
    console.log("Selected Course 1:", selectedCourse1);
    console.log("Selected Course 2:", selectedCourse2);
    console.log("Honours/Minors:", honoursMinors);
    console.log("Open Elective:", openElective);
    console.log("Addon Course:", addonCourse);
  };

  return (
    <>
      <PageTitle>Course Registration</PageTitle>
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
          <Label>Academic year</Label>
          <div className="mt-2">
            <Label radio>
              <Input
                type="radio"
                value="2021-2025"
                name="academicYear"
                checked={academicYear === "2021-2025"}
                onChange={handleAcademicYearChange}
              />
              <span className="ml-2">2023-2024</span>
            </Label>
            <Label className="ml-6" radio>
              <Input
                type="radio"
                value="2022-2026"
                name="academicYear"
                checked={academicYear === "2022-2026"}
                onChange={handleAcademicYearChange}
              />
              <span className="ml-2">2024-2025</span>
            </Label>
          </div>
        </div>

        {academicYear && (
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
        )}
        {department && (
          <div className="mt-4">
            <Label>Semester</Label>
            <div className="mt-2">
              {getSemesterOptions().map((semester, index) => (
                <Label key={index} radio className="mr-6">
                  <Input
                    type="radio"
                    value={semester}
                    name="semester"
                    onChange={handleAcademicSemesterChange}
                  />
                  <span className="ml-2">{semester}</span>
                </Label>
              ))}
            </div>
          </div>
        )}

        {semester && (
          <div className="mt-4">
            <Label>Honour/Minors Registered</Label>
            <div className="mt-2">
              <Select
                className="mt-1"
                onChange={handleHonoursMinorsChange}
                value={honoursMinors}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Select>
            </div>
          </div>
        )}

        {(honoursMinors === "Yes" || honoursMinors === "No") && (
          <div className="mt-4">
            <Label>Course 1</Label>
            <div className="mt-2">
              <Select
                className="mt-1"
                value={selectedCourse1}
                onChange={(e) => handleCourseChange(1, e.target.value)}
              >
                <option value="">Select Course</option>
                {courses.map((course, index) => (
                  <option key={index} value={course}>
                    {course}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        )}

        {(honoursMinors === "Yes" || honoursMinors === "No") && (
          <div className="mt-4">
            <Label>Course 2</Label>
            <div className="mt-2">
              <Select
                className="mt-1"
                value={selectedCourse2}
                onChange={(e) => handleCourseChange(2, e.target.value)}
              >
                <option value="">Select Course</option>
                {courses.map((course, index) => (
                  <option key={index} value={course}>
                    {course}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        )}

        {(honoursMinors === "Yes" || honoursMinors === "No") && (
          <div className="mt-4">
            <Label>Open Elective Course</Label>
            <div className="mt-2">
              <Select
                className="mt-1"
                value={openElective}
                onChange={handleopenElectiveChange}
              >
                <option value="">Select Course</option>
                {courses.map((course, index) => (
                  <option key={index} value={course}>
                    {course}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        )}

        {honoursMinors === "No" && courses.length > 0 && (
          <div className="mt-4">
            <Label>Addon Course </Label>
            <div className="mt-2">
              <Select
                className="mt-1"
                value={addonCourse}
                onChange={handleAddonCourseChange}
              >
                <option value="">Select Course</option>
                {courses.map((course, index) => (
                  <option key={index} value={course}>
                    {course}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        )}

        <Label className="mt-6" check>
          <Input type="checkbox" />
          <span className="ml-2">
            I agree to the{" "}
            <span className="text-gray-500">terms and conditions.</span>
          </span>
        </Label>
        <div className="mt-5">
          <Button onClick={handleSubmit}>Register</Button>
        </div>
      </div>
    </>
  );
}

export default Forms;
