import { createBrowserRouter } from "react-router";
import { Home } from "./Home";
import { StyleGallery } from "./StyleGallery";
import { StyleDetail } from "./StyleDetail";
import { SymbolsGallery } from "./SymbolsGallery";
import { SymbolDetail } from "./SymbolDetail";
import { RingDetail } from "./RingDetail";
import { History } from "./History";
import { Material } from "./Material";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/style",
    Component: StyleGallery,
  },
  {
    path: "/style/:styleId",
    Component: StyleDetail,
  },
  {
    path: "/symbols",
    Component: SymbolsGallery,
  },
  {
    path: "/symbols/:symbolType",
    Component: SymbolDetail,
  },
  {
    path: "/ring/:ringId",
    Component: RingDetail,
  },
  {
    path: "/history",
    Component: History,
  },
  {
    path: "/material",
    Component: Material,
  },
]);