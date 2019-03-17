import Home from "../newviews/Home/Home.jsx";

const routes = [
  {
    path: "/home",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Home
  },
  { redirect: true, path: "/", to: "/home", name: "Dashboard" }
];

export default routes;