import { useRouter } from "next/router";
import { useState } from "react";
import { axiosClient } from "../config/axios";
const useResetPassword = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const sendTokentoEmail = async (email) => {
    try {
      const res = await axiosClient.post("/api/auth/reset-password", { email });
      setAlert({ msg: res.data.msg, type: res.data.type });
    } catch (error) {
      const res = error.response;
      setAlert({ msg: res.data.msg, type: res.data.type });
    }
  };
  const changePassword = async ({ token, newPassword }) => {
    try {
      const res = await axiosClient.post(`/api/auth/reset-password/${token}`, {
        newPassword,
      });
      setAlert({ msg: res.data.msg, type: res.data.type });
      setTimeout(() => (window.location = "/login"), 3000);
    } catch (error) {
      const res = error.response;
      setAlert({ msg: res.data.msg, type: res.data.type });
    }
  };
  const handleEmail = async (email) => {
    setLoading(true);
    await sendTokentoEmail(email);
    setLoading(false);
  };
  return { handleEmail, alert, setAlert, loading, changePassword };
};

export default useResetPassword;
