import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "./not-found";

export const router = createBrowserRouter([
    {
        path: "*",
        element: <NotFound/>
    }
])