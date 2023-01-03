import { FormEvent, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useOutletContext, useNavigate } from "react-router-dom";
import Input from "../components/Form/Input";
import Alert from "../components/Alert";

type IsError = {
  isError: boolean;
  setIsError: (isError: boolean) => void;
};

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { setAccessToken } = useOutletContext<any>();
  const { isError, setIsError } = useOutletContext<IsError>();
  const { toggleRefresh } = useOutletContext<any>();

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let payload = {
      email,
      password,
    };

    const requestOptions: any = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    };

    fetch(`/authenticate`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setIsError(true);
        } else {
          setAccessToken(data.access_token);
          toggleRefresh(true);
          navigate("/dashboard");
        }
      })
      .catch((e) => {
        console.log(e);
        setIsError(true);
      });
  };

  return (
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />

          <Input
            className="input"
            type="password"
            id="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </div>
        <button className="btn" type="submit">
          Login
        </button>
        {isError ? (
          <Alert message={"Invalid credentials"} variant={"danger"} />
        ) : null}
      </form>
    </div>
  );
};

export default LoginPage;
