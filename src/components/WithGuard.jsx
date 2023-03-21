import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function WithGuard({ children }) {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  console.log(isLoggedIn);
  //   useEffect(() => {
  //     if (!isLoggedIn) {
  //       navigate("/");
  //     }
  //   }, []);
  return !isLoggedIn ? <div>Pls Log In Frist!!</div> : children;
}

export default WithGuard;
