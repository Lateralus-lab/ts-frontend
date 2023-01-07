import { FormEvent, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import Input from "../components/Form/Input";
import Alert from "../components/Alert";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      </form>
    </div>
  );
};

export default LoginPage;
