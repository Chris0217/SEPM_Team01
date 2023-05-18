import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const LOGIN_URL = "/login";


function Login() {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");

    const [errMsg, setErrMsg] = useState("");

    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);
    useEffect(() => {
        setErrMsg("");
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { "Content-Type": "application/json" }
                }
            ); 

            setSuccess(true);
            setUser("");
            setPwd("");
            sessionStorage.setItem('name', user);
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 400) {
                setErrMsg("Username not found");
            } else if (err.response?.status === 401) {
                setErrMsg("Wrong password");
            } else {
                setErrMsg("Login Failed");
            }
            errRef.current.focus();
        }
      );

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a><Link to="/home">Go to Home</Link></a>
                    </p>
                </section>
            ) : (
                <section>
                    <p
                        ref={errRef}
                        className={errMsg ? "errmsg" : "offscreen"}
                        aria-live="assertive"
                    >
                        {errMsg}
                    </p>
                    <a style={{ textAlign: "center" }}>
                        <img
                            src={require("../images/Mearie_Logo_nw.png")}
                            className="logo"
                            alt="Mearie"
                        />
                    </a>
                    <h1
                        style={{
                            textAlign: "center",
                            color: "rgb(106, 110, 136)",
                        }}
                    >
                        Log in
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

  //여기는 레지스터랑 거의 똑같아용~~~~ 밑에 루트 링크만 서로 이어지게 해줬숩니댭! 글고 Home 루트도 일단 임시로 그냥 href 로 놔뒀어용!
  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="#">Go to Home</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <a style={{ textAlign: "center" }}>
            <img
              src={require("../images/Mearie_Logo_nw.png")}
              className="logo"
              alt="Mearie"
            />
          </a>
          <h1
            style={{
              textAlign: "center",
              color: "rgb(106, 110, 136)",
            }}
          >
            Log in
          </h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button>Sign In</button>
          </form>
          <p style={{ textAlign: "center" }}>
            New to Mearie?
            <br />
            <span className="line">
              <Link
                to="/register"
                style={{
                  textDecoration: "none",
                  fontWeight: 650,
                }}
              >
                Make an account
              </Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;
