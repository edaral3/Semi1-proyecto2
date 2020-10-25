import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";
import { DefaultLayout2 } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";
import SignUp from "./SignUp/SignUp"
import Login from "./SignIn/SignIn";
import Perfil from "./Perfil/Perfil";
import ChatsBot from "./chatBot/chats";
import Chats from "./chat/chats";

export default [{
        path: "/",
        exact: true,
        layout: DefaultLayout,
        component: () => < Redirect to = "/SignUp" / >
    },
    {
        path: "/inicio",
        layout: DefaultLayout,
        component: BlogOverview
    },
    {
        path: "/user-profile-lite",
        layout: DefaultLayout,
        component: UserProfileLite
    },
    {
        path: "/chat",
        layout: DefaultLayout,
        component: Chats
    },
    {
        path: "/errors",
        layout: DefaultLayout,
        component: Errors
    },
    {
        path: "/components-overview",
        layout: DefaultLayout,
        component: ComponentsOverview
    },
    {
        path: "/tables",
        layout: DefaultLayout,
        component: Tables
    },
    {
        path: "/AddFriend",
        layout: DefaultLayout,
        component: BlogPosts
    },
    {
        path: "/SignUp",
        layout: DefaultLayout2,
        component: SignUp
    },
    {
        path: "/Login",
        layout: DefaultLayout2,
        component: Login
    },
    {
        path: "/Perfil",
        layout: DefaultLayout,
        component: Perfil
    },
    {
        path: "/chatBot",
        layout: DefaultLayout,
        component: ChatsBot
    }
];