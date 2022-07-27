import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect } from "react-router";
import Loading from "../Utils/Loading";
import { getCompanyAction } from "../../Actions/ActionsAuth";
import io from "socket.io-client";
const PrivateRoute = ({ component: Component, ...props }) => {
  let dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const authCompany = async () => {
      await dispatch(getCompanyAction(token));
    };
    authCompany();
    const socket = io("http://localhost:4000");
    socket.emit("notifications", {
      message: "Hello",
      username: "World",
    });
  }, [dispatch]);
  const { auth } = useSelector((state) => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (!auth) {
      router.push("/login");
    }
  }, [auth]);
  return <p>Redirecting...</p>;
};

export default PrivateRoute;
