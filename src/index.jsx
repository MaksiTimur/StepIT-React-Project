import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import ErrorPage from "./error-page";
import Task, {
  loader as taskLoader,
} from "./routes/task";
import EditTask, {
  action as editAction,
} from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import Index from "./routes/index";
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      
      {
        index: true,
        element: <Index />
      },
      {
        path: "tasks/:taskId",
        element: <Task />,
        loader: taskLoader,
      },
      {
        path: "tasks/:taskId/edit",
        element: <EditTask />,
        loader: taskLoader,
        action: editAction,
      },
      {
        path: "tasks/:taskId/destroy",
        action: destroyAction,
        errorElement: <div>Oops! There was an error.</div>,
      },
    ],
  },
  {
    path: "tasks/:taskId",
    element: <Task />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);