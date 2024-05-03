import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "./not-found";
import { CreateEntityPage } from "./pages/Entity/CreateEntityPage";
import { AuthenticationPage } from "./pages/Authentication/AuthenticationPage";
import { PrivateRoute } from "./private-route";
import { RedirectPage } from "./pages/Dashboard/RedirectPage";
import { ListEntityPage } from "./pages/Entity/ListEntityPage";
import Layout from "./layout";

export const router = createBrowserRouter([
    {
        path: "*",
        element: <NotFound />
    },
    {
        path: "entity",
        element: <Layout />,
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
        element: <Layout />,
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
