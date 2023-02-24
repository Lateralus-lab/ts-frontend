import { FormEvent, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";

import Input from "../../components/Form/Input";
import Alert from "../../components/Alert";
import Spinner from "../../components/Spinner";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";

const Login = () => {
  const userRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLParagraphElement | null>(null);
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const [errVariant, setErrVariant] = useState<string>("hidden");

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef?.current?.focus();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userData = await login({ email, password }).unwrap();
      const accessToken = userData.access_token;

      dispatch(setCredentials({ accessToken, email }));
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } catch (err: any) {
      if (err.status === 400) {
        setErrMsg("Invalid email or password");
        setErrVariant("danger");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
        setErrVariant("danger");
      } else {
        setErrMsg("Login failed");
        setErrVariant("danger");
      }

      errRef?.current?.focus();
    }
  };

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const content = isLoading ? (
    <Spinner />
  ) : (
    <div className="w-full flex flex-col">
      <div className="m-auto mb-6">
        <h2 className="flex font-bold text-4xl">
          <FaSignInAlt />
          <span className="ml-4">Login</span>
        </h2>
      </div>

      <form className="max-w-sm w-full m-auto" onSubmit={handleSubmit}>
        <div className="mb-4">
          <Input
            className="input"
            type="email"
            id="email"
            required
            placeholder="Email"
            value={email}
            onChange={handleEmailInput}
          />

          <Input
            className="input"
            type="password"
            id="password"
            required
            placeholder="Password"
            value={password}
            onChange={handlePasswordInput}
          />
        </div>
        <button className="btn" type="submit">
          Login
        </button>
        <Alert message={errMsg} variant={errVariant} />
      </form>
    </div>
  );

  return content;
};

export default Login;
