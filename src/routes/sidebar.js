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
    name: "Home Page", // name that appear in Sidebar
  },
  {
    path: "/app/studentmasters",
    icon: "FaUsers",
    name: "StudentMaster",
  },
  {
    path: "/app/creditsearned",
    icon: "GiReceiveMoney",
    name: "Credits Earned",
  },
  {
    path: "/app/mycourse",
    icon: "SiCoursera",
    name: "Completed Course",
  },
  {
    path: "/app/coursemaster",
    icon: "SiCoursera",
    name: "Course Master",
  },
  
];

export default routes;
