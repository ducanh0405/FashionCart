import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { ProductDetail } from "./pages/ProductDetail";
import { VtonStudio } from "./pages/VtonStudio";
import { CommunityFeed } from "./pages/CommunityFeed";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "product/:id", Component: ProductDetail },
      { path: "vton/:id", Component: VtonStudio },
      { path: "community", Component: CommunityFeed },
    ],
  },
]);
