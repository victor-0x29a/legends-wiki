import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "./not-found";
import { CreateEntityPage } from "./pages/Entity/CreateEntityPage";
import { AuthenticationPage } from "./pages/Authentication/AuthenticationPage";
import { PrivateRoute } from "./private-route";
import { RedirectPage } from "./pages/Dashboard/RedirectPage";
import { ListEntityPage } from "./pages/Entity/ListEntityPage";

export const router = createBrowserRouter([
    {
        path: "*",
        element: <NotFound />
    },
    {
        path: "entity",
        children: [
            {
                path: "",
                element: <PrivateRoute forProtect={true}>
                    <ListEntityPage />
                </PrivateRoute>
            },
            {
                path: "create",
                element: <PrivateRoute forProtect={true}>
                    <CreateEntityPage />
                </PrivateRoute>
            }
        ]
    },
    {
        path: "auth",
        children: [
            {
                path: "",
                element: <PrivateRoute forProtect={true}>
                    <RedirectPage />
                </PrivateRoute>
            },
            {
                path: "login",
                element: <PrivateRoute>
                    <AuthenticationPage />
                </PrivateRoute>
            }
        ]
    }
])
