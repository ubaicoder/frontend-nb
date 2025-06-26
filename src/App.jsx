import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CustomerLogin from "./components/CustLogin";
import BankerLogin from "./components/BankLogin";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Cdashboard from "./components/CustomerDashboard";
import Bankers from "./components/Bankers";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Home />
        </>
      ),
    },
    {
      path: "/CustomerLogin",
      element: (
        <>
          <CustomerLogin />
        </>
      ),
    },
    {
      path: "/BankerLogin",
      element: (
        <>
          <BankerLogin />
        </>
      ),
    },
    {
      path: "/CustomerSignup",
      element: (
        <>
        <Signup />
        </>
      ),
    },
    {
      path: "/BankerSignup",
      element: (
        <>
        <Signup />
        </>
      ),
    },
    {
      path: "/custdashboard",
      element: (
        <>
        <Cdashboard />
        </>
      )
    },
    {
      path: "/bankers",
      element: (
        <>
        <Bankers />
        </>
      )
    }
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
