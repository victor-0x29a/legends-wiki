import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "./not-found";
import { CreateEntityPage } from "./pages/Entity/CreateEntityPage";
import { AuthenticationPage } from "./pages/Authentication/AuthenticationPage";
import { PrivateRoute } from "./private-route";
import { RedirectPage } from "./pages/Dashboard/RedirectPage";
import { ListEntityPage } from "./pages/Entity/ListEntityPage";
import Layout from "./layout";
import { ViewEntityPage } from "./pages/Entity/ViewEntityPage";
import { LogoutPage } from "./pages/Authentication/LogoutPage";
import { EditEntityPage } from "./pages/Entity/EditEntityPage";
import { ListUserPage } from "./pages/User/ListUserPage";
import { CreateUserPage } from "./pages/User/CreateUserPage";
import { EditUserPage } from "./pages/User/EditUserPage";

export const router = createBrowserRouter([
    {
        path: "*",
        element: <Layout>
            <NotFound />
        </Layout>
    },
    {
        path: "logout",
        element: <LogoutPage />
    },
    {
        path: "users",
        element: <Layout />,
        children: [
            {
                path: "",
                element: <PrivateRoute forProtect={true}>
                    <ListUserPage />
                </PrivateRoute>
            },
            {
                path: "create",
                element: <PrivateRoute forProtect={true}>
                    <CreateUserPage />
                </PrivateRoute>
            },
            {
                path: "edit/:id",
                element: <PrivateRoute forProtect={true}>
                    <EditUserPage />
                </PrivateRoute>
            }
        ]
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
            },
            {
                path: ":type/:id",
                element: <ViewEntityPage />
            },
            {
                path: "edit/:id",
                element: <PrivateRoute forProtect={true}>
                    <EditEntityPage />
                </PrivateRoute>
            }
        ]
    },
    {
        path: "auth",
        element: <Layout />,
        children: [
            {
                path: "dashboard",
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
