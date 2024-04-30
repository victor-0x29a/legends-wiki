import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "./not-found";
import { CreateEntityPage } from "./pages/Entity/CreateEntityPage";
import { AuthenticationPage } from "./pages/Authentication/AuthenticationPage";

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
    },
    {
        path: "auth",
        children: [
            {
                path: "login",
                element: <AuthenticationPage />
            }
        ]
    }
])
