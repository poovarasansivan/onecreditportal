import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Button,
  Pagination,
  Input,
  Label,
} from "@windmill/react-ui";
import { FaDownload } from "react-icons/fa6";
import { EditIcon } from "../icons";
import PageTitle from "../components/Typography/PageTitle";
import * as XLSX from "xlsx";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@windmill/react-ui";

const response2 = [
  {
    rollno: "7376211CS239",
    name: "Poovarasan S",
    department: "CSE",
    CoreSubject1: "Maths",
    CoreSubject2: "Physics",
    CoreSubject3: "Chemistry",
    CoreSubject4: "DSA",
    ElectiveCourse1: "Java",
    ElectiveCourse2: "PHP",
    OpenElective: "Python",
    AddonCourse: "Digital Marketing",
    HonoursCourse1: "Not Applicable",
    HonoursCourse2: "Not Applicable",
    status: "success",
    activestatus: "Active",
  },
  {
    rollno: "7376211CS240",
    name: "John Doe",
    department: "ECE",
    CoreSubject1: "Electronics",
    CoreSubject2: "Signals and Systems",
    CoreSubject3: "Digital Signal Processing",
    CoreSubject4: "Circuit Theory",
    ElectiveCourse1: "Embedded Systems",
    ElectiveCourse2: "Communication Systems",
    OpenElective: "Data Structures",
    AddonCourse: "Internet of Things",
    HonoursCourse1: "Not Applicable",
    HonoursCourse2: "Not Applicable",
    status: "success",
    activestatus: "Active",
  },
  {
    rollno: "7376211CS241",
    name: "Jane Smith",
    department: "Mechanical",
    CoreSubject1: "Thermodynamics",
    CoreSubject2: "Fluid Mechanics",
    CoreSubject3: "Strength of Materials",
    CoreSubject4: "Manufacturing Processes",
    ElectiveCourse1: "Automobile Engineering",
    ElectiveCourse2: "Robotics",
    OpenElective: "Finite Element Analysis",
    AddonCourse: "Supply Chain Management",
    HonoursCourse1: "Not Applicable",
    HonoursCourse2: "Not Applicable",
    status: "success",
    activestatus: "Active",
  },
  {
    rollno: "7376211CS242",
    name: "Alice Johnson",
    department: "EEE",
    CoreSubject1: "Electrical Machines",
    CoreSubject2: "Power Systems",
    CoreSubject3: "Control Systems",
    CoreSubject4: "Electrical Measurements",
    ElectiveCourse1: "Renewable Energy",
    ElectiveCourse2: "Power Electronics",
    OpenElective: "Machine Learning",
    AddonCourse: "Energy Management",
    HonoursCourse1: "Not Applicable",
    HonoursCourse2: "Not Applicable",
    status: "success",
    activestatus: "Active",
  },
  {
    rollno: "7376211CS243",
    name: "David Brown",
    department: "Civil",
    CoreSubject1: "Structural Analysis",
    CoreSubject2: "Geotechnical Engineering",
    CoreSubject3: "Fluid Mechanics",
    CoreSubject4: "Transportation Engineering",
    ElectiveCourse1: "Construction Management",
    ElectiveCourse2: "Environmental Engineering",
    OpenElective: "Remote Sensing and GIS",
    AddonCourse: "Project Management",
    HonoursCourse1: "Not Applicable",
    HonoursCourse2: "Not Applicable",
    status: "success",
    activestatus: "Active",
  },
];

function Assignedcourse() {
  const [dataTable2, setDataTable2] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [rowDataToEdit, setRowDataToEdit] = useState(null); // State to store data of the row being edited
  const [editedData, setEditedData] = useState({}); // State to track edited data

  const resultsPerPage = 8;
  const totalResults = response2.length;

  const [pageTable2, setPageTable2] = useState(1);
  useEffect(() => {
    setDataTable2(
      response2.slice(
        (pageTable2 - 1) * resultsPerPage,
        pageTable2 * resultsPerPage
      )
    );
  }, [pageTable2]);

  function openEditModal(rowData) {
    setRowDataToEdit(rowData); // Set the data of the row being edited
    setIsEditModalOpen(true);
  }

  function closeEditModal() {
    setIsEditModalOpen(false);
  }
  function openDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  //   useEffect(() => {
  //     setFilteredData(
  //       dataTable2.filter(
  //         (user.rollno &&
  //             user.rollno.toLowerCase().includes(searchTerm.toLowerCase())) ||
  //           (user.name &&
  //             user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
  //           (user.department &&
  //             user.department.toLowerCase().includes(searchTerm.toLowerCase())) ||
  //           (user.CoreSubject1 &&
  //             user.CoreSubject1.toLowerCase().includes(
  //               searchTerm.toLowerCase()
  //             )) ||
  //           (user.CoreSubject2 &&
  //             user.CoreSubject2.toLowerCase().includes(
  //               searchTerm.toLowerCase()
  //             )) ||
  //           (user.CoreSubject3 &&
  //             user.CoreSubject3.toLowerCase().includes(
  //               searchTerm.toLowerCase()
  //             )) ||
  //           (user.CoreSubject4 &&
  //             user.CoreSubject4.toLowerCase().includes(
  //               searchTerm.toLowerCase()
  //             )) ||
  //           (user.ElectiveCourse1 &&
  //             user.ElectiveCourse1.toLowerCase().includes(
  //               searchTerm.toLowerCase()
  //             )) ||
  //           (user.ElectiveCourse2 &&
  //             user.ElectiveCourse2.toLowerCase().includes(
  //               searchTerm.toLowerCase()
  //             )) ||
  //           (user.OpenElective &&
  //             user.OpenElective.toLowerCase().includes(
  //               searchTerm.toLowerCase()
  //             )) ||
  //           (user.AddonCourse &&
  //             user.AddonCourse.toLowerCase().includes(
  //               searchTerm.toLowerCase()
  //             )) ||
  //           (user.HonoursCourse1 &&
  //             user.HonoursCourse1.toLowerCase().includes(
  //               searchTerm.toLowerCase()
  //             )) ||
  //           (user.HonoursCourse2 &&
  //             user.HonoursCourse2.toLowerCase().includes(
  //               searchTerm.toLowerCase()
  //             ))
  //         )
  //     );
  //   }, [searchTerm, dataTable2]);

  function onPageChangeTable2(p) {
    setPageTable2(p);
  }

  function handleSearchTermChange(event) {
    setSearchTerm(event.target.value);
  }

  const fileInputRef = useRef(null); // Ref for file input element

  function handleImportButtonClick() {
    fileInputRef.current.click(); // Simulate click on file input
  }
  function handleImportFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileName = file.name;
      const fileExtension = fileName.split(".").pop().toLowerCase();
      if (fileExtension === "xlsx" || fileExtension === "xls") {
        try {
          const importedData = parseExcelData(event.target.result);
          console.log("Imported Excel data:", importedData);
          setDataTable2(importedData);
        } catch (error) {
          console.error("Error parsing Excel data:", error);
        }
      } else if (fileExtension === "csv") {
        try {
          const importedData = parseCSVData(event.target.result);
          console.log("Imported CSV data:", importedData);
          setDataTable2(importedData);
        } catch (error) {
          console.error("Error parsing CSV data:", error);
        }
      } else {
        console.error("Unsupported file format");
      }
    };
    reader.readAsBinaryString(file);
  }

  useEffect(() => {
    setFilteredData(
      dataTable2.filter(
        (user) =>
          (user.rollno &&
            user.rollno.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (user.name &&
            user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (user.department &&
            user.department.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (user.CoreSubject1 &&
            user.CoreSubject1.toLowerCase().includes(
              searchTerm.toLowerCase()
            )) ||
          (user.CoreSubject2 &&
            user.CoreSubject2.toLowerCase().includes(
              searchTerm.toLowerCase()
            )) ||
          (user.CoreSubject3 &&
            user.CoreSubject3.toLowerCase().includes(
              searchTerm.toLowerCase()
            )) ||
          (user.CoreSubject4 &&
            user.CoreSubject4.toLowerCase().includes(
              searchTerm.toLowerCase()
            )) ||
          (user.ElectiveCourse1 &&
            user.ElectiveCourse1.toLowerCase().includes(
              searchTerm.toLowerCase()
            )) ||
          (user.ElectiveCourse2 &&
            user.ElectiveCourse2.toLowerCase().includes(
              searchTerm.toLowerCase()
            )) ||
          (user.OpenElective &&
            user.OpenElective.toLowerCase().includes(
              searchTerm.toLowerCase()
            )) ||
          (user.AddonCourse &&
            user.AddonCourse.toLowerCase().includes(
              searchTerm.toLowerCase()
            )) ||
          (user.HonoursCourse1 &&
            user.HonoursCourse1.toLowerCase().includes(
              searchTerm.toLowerCase()
            )) ||
          (user.HonoursCourse2 &&
            user.HonoursCourse2.toLowerCase().includes(
              searchTerm.toLowerCase()
            ))
      )
    );
  }, [searchTerm, dataTable2]);

  function parseExcelData(excelData) {
    const workbook = XLSX.read(excelData, { type: "binary" });
    const sheetName = workbook.SheetNames[0]; // Assuming there's only one sheet
    const sheet = workbook.Sheets[sheetName];
    // Convert the sheet data into an array of objects
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    // Assuming the first row contains headers
    const headers = data[0];
    // Start from the second row to parse data
    const parsedData = data.slice(1).map((row) => {
      const rowData = {};
      row.forEach((value, index) => {
        rowData[headers[index]] = value;
      });
      return rowData;
    });
    console.log(parsedData);
    return parsedData;
  }
  function parseCSVData(csvData) {
    const rows = csvData.split("\n"); // Split CSV data by newline to get rows
    const headers = rows[0].split(","); // Assuming the first row contains headers
    const parsedData = [];
    // Start from the second row to parse data
    for (let i = 1; i < rows.length; i++) {
      const rowData = {};
      const values = rows[i].split(",");
      // Assign each value to its corresponding header
      headers.forEach((header, index) => {
        rowData[header] = values[index];
      });
      parsedData.push(rowData);
    }
    return parsedData;
  }

  function handleExportData() {
    // Logic to export data as a CSV file
    // This depends on the format of your data and how you want to export it
    // Example logic:
    let csvContent =
      "Roll no,Name,Department,CoreSubject1, CourseSubject2,CoreSubject3,CoreSubject4,ElectiveCourse1,ElectiveCourse2,OpenElective,AddonCourse,HonoursCourse1,HonoursCourse2 \n";
    dataTable2.forEach((user) => {
      // Check if user object has all required properties
      if (
        user.rollno &&
        user.name &&
        user.department &&
        user.CoreSubject1 &&
        user.CoreSubject2 &&
        user.CoreSubject3 &&
        user.CoreSubject4 &&
        user.ElectiveCourse1 &&
        user.ElectiveCourse2 &&
        user.OpenElective &&
        user.AddonCourse &&
        user.HonoursCourse1 &&
        user.HonoursCourse2
      ) {
        csvContent += `${user.rollno},${user.name},${user.department},${user.CoreSubject1},${user.CoreSubject2},${user.CoreSubject3},${user.CoreSubject4},${user.ElectiveCourse1},${user.ElectiveCourse2},${user.OpenElective},${user.AddonCourse},${user.HonoursCourse1},${user.HonoursCourse2}\n`;
      }
    });
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "assigned_course.csv";
    a.click();
    URL.revokeObjectURL(url);
  }
  console.log(dataTable2);
  function handleInputChange(event) {
    const { name, value } = event.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  function handleUpdate() {
    // Find the index of the row to be updated
    const rowIndex = dataTable2.findIndex(
      (row) => row.rollno === rowDataToEdit.rollno
    );
    if (rowIndex !== -1) {
      // Update the row data with edited values
      const updatedRowData = { ...dataTable2[rowIndex], ...editedData };
      const updatedDataTable = [...dataTable2];
      updatedDataTable[rowIndex] = updatedRowData;
      setDataTable2(updatedDataTable);
      closeEditModal(); // Close the modal after updating
    }
  }
  return (
    <>
      <PageTitle>Assigned Course</PageTitle>

      <TableContainer className="mb-8">
        <div className="m-4 flex justify-between items-center">
          <div className="flex justify-start items-center">
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </div>
          <div className="flex justify-end items-center">
            <Button onClick={handleImportButtonClick}>Import</Button>
            <input
              type="file"
              accept=".xlsx, .xls, .csv"
              onChange={handleImportFile}
              id="import-file"
              style={{ display: "none" }}
              ref={fileInputRef} // Associate ref with file input
            />

            {/* Add a gap between import and download button */}
            <div style={{ width: "15px" }}></div>
            <Button onClick={handleExportData}>
              <FaDownload className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <hr className="border-t-1 w-full" />

        <Table>
          <TableHeader>
            <tr>
              <TableCell>S no</TableCell>
              <TableCell>Roll no</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>CoreSubject1</TableCell>
              <TableCell>CoreSubject2</TableCell>
              <TableCell>CoreSubject3</TableCell>
              <TableCell>CoreSubject4</TableCell>
              <TableCell>ElectiveCourse1</TableCell>
              <TableCell>ElectiveCourse2</TableCell>
              <TableCell>OpenElective</TableCell>
              <TableCell>AddonCourse</TableCell>
              <TableCell>HonoursCourse1</TableCell>
              <TableCell>HonoursCourse2</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {filteredData.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  {" "}
                  <span className="text-sm">
                    {(pageTable2 - 1) * resultsPerPage + i + 1}
                  </span>
                </TableCell>{" "}
                {/* Calculate S.no */}
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{user.rollno}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.name}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.department}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.CoreSubject1}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.CoreSubject2}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.CoreSubject3}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.CoreSubject4}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.ElectiveCourse1}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.ElectiveCourse2}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.OpenElective}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.AddonCourse}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.HonoursCourse1}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.HonoursCourse2}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button
                      layout="link"
                      size="icon"
                      aria-label="Edit"
                      onClick={() => openEditModal(user)}
                    >
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    {/* <Button
                      layout="link"
                      size="icon"
                      aria-label="Delete"
                      onClick={openDeleteModal}
                    >
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button> */}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable2}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
      <div></div>
      <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
        <ModalHeader>Assigned Course Details</ModalHeader>
        <ModalBody className="overflow-y-auto max-h-22">
          {rowDataToEdit && (
            <>
              <p>Student Rollno : {rowDataToEdit.rollno}</p>

              <Label className="mt-4">
                <span>ElectiveCourse1</span>
                <Input
                  className="mt-1"
                  name="ElectiveCourse1"
                  placeholder="XML Web Services"
                  value={editedData.ElectiveCourse1 || ""}
                  onChange={handleInputChange}
                />
              </Label>
              <Label className="mt-4">
                <span>ElectiveCourse2</span>
                <Input
                  className="mt-1"
                  name="ElectiveCourse2"
                  placeholder="Modern Cryptography"
                  value={editedData.ElectiveCourse2 || ""}
                  onChange={handleInputChange}
                />
              </Label>
              <Label className="mt-4">
                <span>OpenElective</span>
                <Input
                  className="mt-1"
                  name="OpenElective"
                  placeholder="Java Fundamentals"
                  value={editedData.OpenElective || ""}
                  onChange={handleInputChange}
                />
              </Label>
              <Label className="mt-4">
                <span>AddonCourse</span>
                <Input
                  className="mt-1"
                  name="AddonCourse"
                  placeholder="Digital Marketing"
                  value={editedData.AddonCourse || ""}
                  onChange={handleInputChange}
                />
              </Label>
              <Label className="mt-4">
                <span>HonoursCourse1</span>
                <Input
                  className="mt-1"
                  name="HonoursCourse1"
                  placeholder="Big Data Analytics"
                  value={editedData.HonoursCourse1 || ""}
                  onChange={handleInputChange}
                />
              </Label>
              <Label className="mt-4">
                <span>HonoursCourse2</span>
                <Input
                  className="mt-1"
                  name="HonoursCourse2"
                  placeholder="Cloud Computing"
                  value={editedData.HonoursCourse2 || ""}
                  onChange={handleInputChange}
                />
              </Label>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeEditModal}>
              Cancel
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button onClick={handleUpdate}>Accept</Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button
              block
              size="large"
              layout="outline"
              onClick={closeEditModal}
            >
              Cancel
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" onClick={handleUpdate}>
              Update
            </Button>
          </div>
        </ModalFooter>
      </Modal>
      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        <ModalHeader>Student Deletion</ModalHeader>
        <ModalBody>Your Deleting student Data</ModalBody>
        <ModalFooter>
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeDeleteModal}>
              Cancel
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button>Delete</Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button
              block
              size="large"
              layout="outline"
              onClick={closeDeleteModal}
            >
              Cancel
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large">
              Accept
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Assignedcourse;
