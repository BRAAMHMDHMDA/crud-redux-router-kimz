import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
// import EditPost from "./pages/EditPost";
// import AddPost from "./pages/AddPost";
// import Details from "./pages/Details";
import Index from "./pages/Index";
import ErrorPage from "./pages/ErrorPage";
import { Provider } from "react-redux";
import store from "./state";
import WithGuard from "./components/WithGuard";

//Lazy Loading
const AddPost = React.lazy(() => import("./pages/AddPost"));
const EditPost = React.lazy(() => import("./pages/EditPost"));
const Details = React.lazy(() => import("./pages/Details"));

const postParamHandler = ({ params }) => {
  if (isNaN(params.id)) {
    throw new Response("Bad Request", {
      statusText: "Pls make sure to insert correct post ID.. ",
      status: 400,
    });
  }
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "post",
        element: <Index />,
      },
      {
        path: "post/add",
        element: (
          // <WithGuard>
          <Suspense fallback={<div>Loading...</div>}>
            <AddPost />
          </Suspense>
          // </WithGuard>
        ),
      },
      {
        path: "post/:id/edit",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <EditPost />
          </Suspense>
        ),
        loader: postParamHandler,
      },
      {
        path: "post/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Details />
          </Suspense>
        ),
        loader: postParamHandler,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
  // </React.StrictMode>
);
