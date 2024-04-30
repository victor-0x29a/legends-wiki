import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "./not-found";
import { CreateEntityPage } from "./pages/Entity/CreateEntityPage";

export const router = createBrowserRouter([
    {
        path: "*",
        element: <NotFound />
    },
    {
        path: "entity",
        children: [
            {
                path: "create",
                element: <CreateEntityPage />
            }
        ]
    }
])
