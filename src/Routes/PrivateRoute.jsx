import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { baseURL, token } from "../Api/Axios";
import { useDispatch } from "react-redux";
import Loading from "../pages/Loading";
import { Navigate } from "react-router-dom";
import { setUser } from "../Redux/authSlice";

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const storageref = useRef(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  useEffect(() => {
    setLoading(true);
    setSuccess(false);
    setFail(false);
    axios
      .get(`${baseURL}/login_with_token`, {
        headers: { token:'Bearer '+ storageref.current },
      })
      .then((res) => {
        dispatch(setUser( res.data.data));
        setLoading(false);
        setSuccess(true);
        setFail(false);
      })
      .catch((err) => {
        setLoading(false);
        setSuccess(false);
        setFail(true);
      });
  }, [storageref.current]);

  if (storageref.current) {
    if (loading) {
      return <Loading />;
    }
    if (!loading && success) {
      return children;
    }
      if (!loading && fail) {
        return <Navigate to="/login" />;
      }
    } else {
      return <Navigate to="/login" />;
  }
};

export default PrivateRoute