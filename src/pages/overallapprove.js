import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Button,
  Pagination,
  Input,
} from "@windmill/react-ui";
import { FaDownload } from "react-icons/fa6";
import { EditIcon, TrashIcon } from "../icons";
import PageTitle from "../components/Typography/PageTitle";
import response from "../utils/demo/tableData";
import * as XLSX from "xlsx";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@windmill/react-ui";
import { Label } from "@windmill/react-ui";

const response2 = [
  {
    rollno: "7376211CS239",
    name: "Murshitha K",
    department: "CSE",
    semester: "Semester 6",
    coursename: "XML And Web Services",
    completedsem: "Semester 4",
    proof: "7376211CS239.pdf",
    approvestatus: 1,
    eligiblestatus: 1,
  },
  {
    rollno: "7376212AD239",
    name: "Sharmilaa G C",
    department: "AIDS",
    semester: "Semester 6",
    coursename: "XML And Web Services",
    completedsem: "Semester 4",
    proof: "7376212AD239.pdf",
    approvestatus: 2,
    eligiblestatus: 2,
  },
  {
    rollno: "7376211CS245",
    name: "Pooja P",
    department: "CSE",
    semester: "Semester 6",
    coursename: "XML And Web Services",
    completedsem: "Semester 4",
    proof: "7376211CS239.pdf",
    approvestatus: 3,
    eligiblestatus: 1,
  },
  {
    rollno: "7376212AD177",
    name: "RatKavi S",
    department: "AIDS",
    semester: "Semester 6",
    coursename: "XML And Web Services",
    completedsem: "Semester 4",
    proof: "7376212AD177.pdf",
    approvestatus: 2,
    eligiblestatus: 1,
  },
];

function ApproveCertifications() {
  const [dataTable2, setDataTable2] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [rowDataToEdit, setRowDataToEdit] = useState(null);
  const [editedData, setEditedData] = useState({});

  const resultsPerPage = 8;
  const totalResults = response.length;

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
    setRowDataToEdit(rowData);
    setIsEditModalOpen(true);
  }

  function closeEditModal() {
    setIsEditModalOpen(false);
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
          (user.semester &&
            user.semester.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (user.coursename &&
            user.coursename.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (user.completedsem &&
            user.completedsem
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (user.proof &&
            user.proof.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    );
  }, [searchTerm, dataTable2]);

  function onPageChangeTable2(p) {
    setPageTable2(p);
  }

  function handleSearchTermChange(event) {
    setSearchTerm(event.target.value);
  }

  const fileInputRef = useRef(null);

  function handleImportButtonClick() {
    fileInputRef.current.click();
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
          setDataTable2(importedData);
        } catch (error) {
          console.error("Error parsing Excel data:", error);
        }
      } else if (fileExtension === "csv") {
        try {
          const importedData = parseCSVData(event.target.result);
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
          (user.semester &&
            user.semester.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (user.coursename &&
            user.coursename.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (user.completedsem &&
            user.completedsem
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (user.proof &&
            user.proof.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    );
  }, [searchTerm, dataTable2]);

  function parseExcelData(excelData) {
    const workbook = XLSX.read(excelData, { type: "binary" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const headers = data[0];
    const parsedData = data.slice(1).map((row) => {
      const rowData = {};
      row.forEach((value, index) => {
        rowData[headers[index]] = value;
      });
      return rowData;
    });
    return parsedData;
  }

  function parseCSVData(csvData) {
    const rows = csvData.split("\n");
    const headers = rows[0].split(",");
    const parsedData = [];
    for (let i = 1; i < rows.length; i++) {
      const rowData = {};
      const values = rows[i].split(",");
      headers.forEach((header, index) => {
        rowData[header] = values[index];
      });
      parsedData.push(rowData);
    }
    return parsedData;
  }

  function handleExportData() {
    let csvContent =
      "Roll no,Name,Department,CourseName,Proof,Completed Semester,Status\n";
    dataTable2.forEach((user) => {
      csvContent += `${user.rollno},${user.name},${user.department},${
        user.coursename
      },${user.proof},${user.completedsem},${
        user.approvestatus === 1
          ? "Pending"
          : user.approvestatus === 2
          ? "Approved"
          : "Rejected"
      }\n`;
    });
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "student_details.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleUpdate() {
    const rowIndex = dataTable2.findIndex(
      (row) => row.rollno === rowDataToEdit.rollno
    );
    if (rowIndex !== -1) {
      const updatedRowData = { ...dataTable2[rowIndex], ...editedData };
      const updatedDataTable = [...dataTable2];
      updatedDataTable[rowIndex] = updatedRowData;
      setDataTable2(updatedDataTable);
      closeEditModal();
    }
  }

  return (
    <>
      <PageTitle>One Credits Request Master</PageTitle>
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
              ref={fileInputRef}
            />
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
              <TableCell>Semester</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Course Name</TableCell>
              <TableCell>Completed Semester</TableCell>
              <TableCell>Proof</TableCell>
              <TableCell>Approval Status</TableCell>
              <TableCell>Eligibility Status</TableCell>
              <TableCell>Actions</TableCell>
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
                </TableCell>
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
                  <span className="text-sm">{user.semester}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.department}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.coursename}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.completedsem}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.proof}</span>
                </TableCell>
                <TableCell>
                  <Badge
                    type={
                      user.approvestatus === 1
                        ? "warning"
                        : user.approvestatus === 2
                        ? "success"
                        : "danger"
                    }
                  >
                    {user.approvestatus === 1
                      ? "Pending"
                      : user.approvestatus === 2
                      ? "Approved"
                      : "Rejected"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    type={user.approvestatus === 1 ? "warning" : "success"}
                  >
                    {user.approvestatus === 1 ? "Not Eligible" : "Eligible"}
                  </Badge>
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
        <ModalHeader>Course Details</ModalHeader>
        <ModalBody>
          {rowDataToEdit && (
            <>
              <div className="flex flex-col">
                <div className="flex justify-start mb-2">
                  <Label className="mr-2">
                    <span className="font-semibold">Roll No:</span>
                  </Label>
                  <p>{rowDataToEdit.rollno}</p>
                </div>
                <div className="flex justify-start mb-2">
                  <Label className="mr-2">
                    <span className="font-semibold">Name:</span>
                  </Label>
                  <p>{rowDataToEdit.name}</p>
                </div>

                <div className="flex justify-start mb-2">
                  <Label className="mr-2">
                    <span className="font-semibold">Department:</span>
                  </Label>
                  <p>{rowDataToEdit.department}</p>
                </div>
                <div className="flex justify-start mb-2">
                  <Label className="mr-2">
                    <span className="font-semibold">Course Name:</span>
                  </Label>
                  <p>{rowDataToEdit.coursename}</p>
                </div>
                <div className="flex justify-start mb-2">
                  <Label className="mr-2">
                    <span className="font-semibold">Completed Semester:</span>
                  </Label>
                  <p>{rowDataToEdit.completedsem}</p>
                </div>
                <div className="flex justify-start">
                  <Label className="mr-2">
                    <span className="font-semibold">Proof:</span>
                  </Label>
                  <p>{rowDataToEdit.proof}</p>
                </div>
              </div>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block">
            <Button onClick={handleUpdate}>Approve</Button>
          </div>
          <div className="hidden sm:block">
            <Button onClick={handleUpdate}>Reject</Button>
          </div>

          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeEditModal}>
              Cancel
            </Button>
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
    </>
  );
}

export default ApproveCertifications;
