import React, { useContext, useRef, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import MyContainer from "../components/MyContainer";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Signin = () => {
  const [show, setShow] = useState(false);
  const emailRef = useRef(null);

  const {
    signInWithEmailAndPasswordFunc,
    signInWithEmailFunc,
    sendPassResetEmailFunc,
    setLoading,
    setUser,
    user,
  } = useContext(AuthContext);
  const location = useLocation();
  const from = location.state || "/";
  const navigate = useNavigate();

  if (user) {
    navigate("/");
    return;
  }

  console.log(location);

  // const [email, setEmail] = useState(null);

  const handleSignin = (e) => {
    e.preventDefault();
    const email = e.target.email?.value;
    const password = e.target.password?.value;
    console.log({ email, password });
    signInWithEmailAndPasswordFunc(email, password)
      .then((res) => {
        console.log(res);
        setLoading(false);

        if (!res.user?.emailVerified) {
          toast.error("Your email is not verified.");
          return;
        }
        setUser(res.user);
        toast.success("Signin successful");
        navigate(from);
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.message);
      });
  };

  const handleGoogleSignin = () => {
    console.log("google signin");
    signInWithEmailFunc()
      .then((res) => {
        console.log(res);
        setLoading(false);
        setUser(res.user);
        navigate(from);
        toast.success("Signin successful");
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.message);
      });
  };

  const handleForgetPassword = () => {
    console.log();
    const email = emailRef.current.value;
    sendPassResetEmailFunc(email)
      .then(() => {
        setLoading(false);
        toast.success("Check your email to reset password");
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  // console.log();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "20px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          maxWidth: "450px",
          width: "100%",
          padding: "40px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h2
            style={{
              fontSize: "32px",
              fontWeight: "700",
              color: "#333",
              marginBottom: "8px",
            }}
          >
            Welcome Back
          </h2>
          <p style={{ color: "#666", fontSize: "14px" }}>
            Sign in to continue to Social Events
          </p>
        </div>

        <form onSubmit={handleSignin}>
          {/* Email Input */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#333",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Email Address
            </label>
            <input
              ref={emailRef}
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "2px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "14px",
                transition: "border-color 0.3s",
                outline: "none",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#667eea")}
              onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
            />
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: "10px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#333",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={show ? "text" : "password"}
                name="password"
                required
                placeholder="Enter your password"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  paddingRight: "45px",
                  border: "2px solid #e0e0e0",
                  borderRadius: "8px",
                  fontSize: "14px",
                  transition: "border-color 0.3s",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#666",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {show ? <IoEyeOff size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </div>

          {/* Forget Password */}
          <div style={{ textAlign: "right", marginBottom: "20px" }}>
            <button
              type="button"
              onClick={handleForgetPassword}
              style={{
                background: "none",
                border: "none",
                color: "#667eea",
                fontSize: "13px",
                cursor: "pointer",
                padding: "0",
                textDecoration: "none",
                fontWeight: "500",
              }}
              onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
              onMouseOut={(e) => (e.target.style.textDecoration = "none")}
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              marginBottom: "20px",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 10px 20px rgba(102, 126, 234, 0.4)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "20px 0",
          }}
        >
          <div style={{ flex: 1, height: "1px", background: "#e0e0e0" }}></div>
          <span
            style={{
              padding: "0 15px",
              color: "#999",
              fontSize: "13px",
              fontWeight: "500",
            }}
          >
            OR
          </span>
          <div style={{ flex: 1, height: "1px", background: "#e0e0e0" }}></div>
        </div>

        {/* Google Sign In */}
        <button
          type="button"
          onClick={handleGoogleSignin}
          style={{
            width: "100%",
            padding: "12px",
            background: "white",
            color: "#333",
            border: "2px solid #e0e0e0",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            transition: "all 0.3s",
            marginBottom: "20px",
          }}
          onMouseOver={(e) => {
            e.target.style.borderColor = "#667eea";
            e.target.style.background = "#f8f9ff";
          }}
          onMouseOut={(e) => {
            e.target.style.borderColor = "#e0e0e0";
            e.target.style.background = "white";
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M19.8055 10.2292C19.8055 9.55156 19.7501 8.86719 19.6323 8.19531H10.2002V12.0492H15.6014C15.3775 13.2911 14.6571 14.3898 13.6025 15.0875V17.5867H16.8251C18.7174 15.8449 19.8055 13.2728 19.8055 10.2292Z"
              fill="#4285F4"
            />
            <path
              d="M10.2002 20.0008C12.9517 20.0008 15.2719 19.1152 16.8294 17.5867L13.6068 15.0875C12.7096 15.6973 11.5502 16.0434 10.2044 16.0434C7.54496 16.0434 5.28931 14.2828 4.50324 11.9094H1.17969V14.4816C2.77875 17.6633 6.31103 20.0008 10.2002 20.0008Z"
              fill="#34A853"
            />
            <path
              d="M4.49906 11.9094C4.08277 10.6675 4.08277 9.33672 4.49906 8.09484V5.52266H1.17969C-0.195557 8.24687 -0.195557 11.7564 1.17969 14.4806L4.49906 11.9094Z"
              fill="#FBBC04"
            />
            <path
              d="M10.2002 3.95766C11.6253 3.93594 13.0007 4.47203 14.036 5.45594L16.8933 2.60188C15.1858 0.990313 12.9355 0.107812 10.2002 0.133594C6.31103 0.133594 2.77875 2.47109 1.17969 5.65672L4.49906 8.22891C5.28097 5.85109 7.54077 3.95766 10.2002 3.95766Z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>

        {/* Register Link */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p style={{ color: "#666", fontSize: "14px" }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#667eea",
                textDecoration: "none",
                fontWeight: "600",
              }}
              onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
              onMouseOut={(e) => (e.target.style.textDecoration = "none")}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
