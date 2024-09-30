import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import AllArticles from "../Pages/AllArticles/AllArticles/AllArticles";
import AddArticles from "../Pages/AddArticles/AddArticles";
import PremiumArticles from "../Pages/PremiumArticles/PremiumArticles";
import MyArticles from "../Pages/MyArticles/MyArticles";
import UpdateArticle from "../Pages/UpdateArticle/UpdateArticle";
import ArticleDetails from "../Pages/AllArticles/ArticleDetails/ArticleDetails";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Dash from "../Layout/Dash";
import Users from "../Pages/Dashboard/Users/Users";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard/AdminDashboard";
import PendingArticles from "../Pages/Dashboard/PendingArticles/PendingArticles"
import AdminRoute from "../Routes/AdminRoute/AdminRoute"
import Publishers from "../Pages/Dashboard/Publishers/Publishers";
import AddPublishers from "../Pages/Dashboard/AddPublishers/AddPublishers";
import Plans from "../Pages/Home/Plans/Plans";
import Profile from "../Components/Profile/Profile";
import Subscription from "../Pages/Subscription/Subscription";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/allArticles",
        element: <AllArticles></AllArticles>
      },
      {
        path: "/addArticles",
        element: <PrivateRoute><AddArticles></AddArticles></PrivateRoute>
      },
      {
        path: "/premiumArticles",
        element: <PrivateRoute><PremiumArticles></PremiumArticles></PrivateRoute>
      },
      {
        path: "/myArticles",
        element: <PrivateRoute><MyArticles></MyArticles></PrivateRoute>
      },
      {
        path: "/updateArticle/:id",
        element: <PrivateRoute><UpdateArticle></UpdateArticle></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/article/${params.id}`)
      },
      {
        path: "/articleDetails/:id",
        element: <PrivateRoute><ArticleDetails></ArticleDetails></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/article/${params.id}`)
      },
      {
        path: "/plans",
        element: <Plans></Plans>
      },
      {
        path: "/subscriptions",
        element: <PrivateRoute><Subscription></Subscription></PrivateRoute>
      },
      {
        path: "/profile",
        element: <PrivateRoute><Profile></Profile></PrivateRoute>
      }
    ]
  },
  {
    path: "dashboard",
    element: <PrivateRoute><AdminRoute><Dash></Dash></AdminRoute></PrivateRoute>,
    children: [
      {
        path: "adminHome",
        element: <AdminDashboard></AdminDashboard>
      },
      {
        path: "users",
        element: <Users></Users>
      },
      {
        path: "pendingArticles",
        element: <PendingArticles></PendingArticles>
      },
      {
        path: "addPublishers",
        element: <AddPublishers></AddPublishers>
      },
      {
        path: "publishers",
        element: <Publishers></Publishers>
      }
    ]
  }
]);