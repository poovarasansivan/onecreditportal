import React from "react";
import PageTitle from "../components/Typography/PageTitle";
import { Card, CardBody } from "@windmill/react-ui";
import RoundIcon from "../components/RoundIcon";
import { GrTechnology } from "react-icons/gr";
import { FaBook, FaCode, FaDatabase } from "react-icons/fa";

const curriculum = [
  {
    id: 1,
    icon: FaDatabase,
    name: "Database Management Systems",
    completedsemester:"6"
  },
  {
    id: 2,
    icon: FaCode,
    name: "Data Structures",
    completedsemester:"7"
  },
  {
    id: 3,
    icon: FaBook,
    name: "Computer Architecture",
    completedsemester:"4"
  },
  {
    id: 4,
    icon: GrTechnology,
    name: "Internet Of Things",
    completedsemester:"7"
  },
];

function Mycourse() {
  return (
    <>
      <PageTitle>My One Credit Course History</PageTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        {curriculum.map((course) => (
          <Card key={course.id}>
            <CardBody className="flex flex-col items-center">
              <RoundIcon
                icon={course.icon}
                iconColorClass="text-orange-500 dark:text-orange-100"
                bgColorClass="bg-orange-100 dark:bg-orange-500"
                className="mx-auto mb-4"
              />
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  {course.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400"> Semester:{" "}
                  {course.completedsemester}
                </p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Mycourse;
