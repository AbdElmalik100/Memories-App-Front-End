import * as React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Layout from "../layouts";
import Login from "../pages/Login";
import { useSelector } from "react-redux";

const AppRouter = () => {
    const user = useSelector(state => state.users.user)

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <Layout>
                    <Home />
                </Layout>
            ),
        },
        {
            path: "login",
            element: (
                <Layout>
                    {user ? <Navigate to='/' replace={true} /> : <Login />}
                </Layout>
            ),
        },
        {
            path: "signup",
            element: (
                <Layout>
                    {user ? <Navigate to='/' replace={true} /> : <Signup />}
                </Layout>
            ),
        },
    ]);

    return router
}



export default AppRouter
