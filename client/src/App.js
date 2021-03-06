import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";
/*** Components ***/
import Nav from "./components/Nav";
import MainPage from "./pages/Mainpages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignupPage";
import Loading from "./pages/LoadingPage";
import Detail from "./pages/Detail";

function App() {
  const [loader, setLoader] = useState(true);
  const [userInfo, setUserInfo] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    AOS.init();
    if (window.sessionStorage.getItem("accessToken")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    console.log(isLogin);
    setTimeout(() => setLoader(false), 1000);
  }, []);

  return (
    <>
      {loader ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <header>
            <Nav />
          </header>
          <Switch>
            <Route exact path="/">
              <MainPage />
            </Route>
            <Route exact path="/login">
              <LoginPage userInfo={userInfo} setUserInfo={setUserInfo} />
            </Route>
            <Route exact path="/signup">
              <SignUpPage />
            </Route>
            <Route path="/detail/:id">
              <Detail />
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
