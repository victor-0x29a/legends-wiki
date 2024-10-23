import { createBrowserRouter } from "react-router-dom";
import { CreateEntityPage } from "./pages/Entity/CreateEntityPage";
import { AuthenticationPage } from "./pages/Authentication/AuthenticationPage";
import { PrivateRoute } from "./private-route";
import { RedirectPage } from "./pages/Dashboard/RedirectPage";
import { ListEntityPage } from "./pages/Entity/ListEntityPage";
import { ViewEntityPage } from "./pages/Entity/ViewEntityPage";
import { LogoutPage } from "./pages/Authentication/LogoutPage";
import { EditEntityPage } from "./pages/Entity/EditEntityPage";
import { ListUserPage } from "./pages/User/ListUserPage";
import { CreateUserPage } from "./pages/User/CreateUserPage";
import { EditUserPage } from "./pages/User/EditUserPage";
import { HomePage } from "./pages/Home/HomePage";
import { EntitiesVisualization } from "./pages/Home/EntitiesVisualization";

import { NotFound } from "./not-found";
import Layout from "./layout";

export const router = createBrowserRouter([
    {
        path: "*",
        element: <Layout>
            <NotFound />
        </Layout>
    },
    {
        path: "",
        element: <Layout isFreeSizes={true}>
            <HomePage />
        </Layout>
    },
    {
        path: ":entityType",
        element: <Layout isFreeSizes={true}>
            <EntitiesVisualization />
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
