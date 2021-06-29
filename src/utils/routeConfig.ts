import Detail from "../page/Detail/Detail";
import Home from "../page/Home/Home";

export const RouterConfig = [
  {
    path: "/",
    component: Home,
    sceneConfig: {
      enter: "from",
      exit: "to",
    },
  },
  {
    path: "/detail",
    component: Detail,
    sceneConfig: {
      enter: "from",
      exit: "to",
    },
  },
];
