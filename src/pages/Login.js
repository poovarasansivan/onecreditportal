import React from "react";
import { Link, useHistory } from "react-router-dom";
import ImageLight from "../assets/img/login-office.jpeg";
import ImageDark from "../assets/img/login-office-dark.jpeg";
import { GithubIcon, TwitterIcon } from "../icons";
import { Label, Input, Button } from "@windmill/react-ui";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useState, useEffect } from "react";
import LoginImage from "../assets/image.png";

function Login() {
  const clientId =
    "761501369349-o70hbrrm16jvbm924h9vk40r7k127bq2.apps.googleusercontent.com";
  const history = useHistory(); // Initialize useHistory hook
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const onSuccess = async (res) => {
    console.log("LOGIN SUCCESS!", res.profileObj.email);
    history.push("/app");
  };

  const onFailure = (res) => {
    console.log("Login failed", res);
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={LoginImage}
              alt="Office"
            />

            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={LoginImage}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Login
              </h1>
              <Label>
                <span>Email</span>
                <Input
                  className="mt-1"
                  type="email"
                  placeholder="john@doe.com"
                />
              </Label>

              <Label className="mt-4">
                <span>Password</span>
                <Input
                  className="mt-1"
                  type="password"
                  placeholder="***************"
                />
              </Label>

              <Button className="mt-4" block tag={Link} to="/app">
                Log in
              </Button>

              <hr className="my-8" />

              <div className="flex justify-center">
                <GoogleLogin
                  clientId={clientId}
                  buttonText="Continue with Google"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy={"single_host_origin"}
                  isSignedIn={true}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Login;
