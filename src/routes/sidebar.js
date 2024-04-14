/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: "/app/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/app/studentmasters",
    icon: "TablesIcon",
    name: "StudentMaster",
  },
  {
    path: "/app/assignedcourses",
    icon: "SiCoursera",
    name: "Assigned Courses",
  },
  {
    path: "/app/mycourse",
    icon: "SiCoursera",
    name: "MyCourse",
  },
  {
    path: "/app/courseregistration",
    icon: "FormsIcon",
    name: "CourseRegistration",
  },
  {
    path: "/app/faculty",
    icon: "FaChalkboardTeacher",
    name: "Faculty Mapping",
  },
  {
    path: "/app/curriculum",
    icon: "FormsIcon",
    name: "Curriculum",
  },
  // {
  //   path: '/app/modals',
  //   icon: 'TablesIcon',
  //   name: 'Modals',
  // },
  // {
  //   path: '/app/studentmasters',
  //   icon: 'TablesIcon',
  //   name: 'StudentMaster',
  // },
  // {
  //   path: "/app/studentmaster", // the url
  //   icon: "HomeIcon", // the component being exported from icons/index.js
  //   name: "Dashboard", // name that appear in Sidebar
  // },
  // {
  //   path: "/app/cards",
  //   icon: "CardsIcon",
  //   name: "Cards",
  // },
];

export default routes;
