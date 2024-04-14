import { lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Forms = lazy(() => import("../pages/courseForms"));
const Cards = lazy(() => import("../pages/Cards"));
const Curriculum = lazy(() => import("../pages/curriculum"));
const Assignedcourse = lazy(() => import("../pages/assignedcourse"));
const MyCourse = lazy(()=>import("../pages/myCourses")); 
const Buttons = lazy(() => import("../pages/Buttons"));
const Modals = lazy(() => import("../pages/Modals"));
const StudentMaster = lazy(() => import("../pages/Tables"));
const Page404 = lazy(() => import("../pages/404"));
const Faculty = lazy(()=>import("../pages/faculty"))
/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  {
    path: "/courseregistration",
    component: Forms,
  },
  {
    path: "/assignedcourses",
    component: Assignedcourse,
  },
  {
    path: "/mycourse",
    component: MyCourse,
  },
  {
    path: "/studentmasters",
    component: StudentMaster,
  },
  {
    path: "/faculty",
    component: Faculty,
  },
  {
    path: "/curriculum",
    component: Curriculum,
  },
  {
    path: "/cards",
    component: Cards,
  },
  {
    path: "/modals",
    component: Modals,
  },
  {
    path: "/404",
    component: Page404,
  },
];

export default routes;
