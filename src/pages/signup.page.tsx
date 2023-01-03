import { useState } from "react";
import { FaUser } from "react-icons/fa";
import Input from "../components/Form/Input";

const SignupPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  return (
    <div className="w-full flex flex-col">
      <div className="m-auto mb-6">
        <h2 className="flex font-bold text-4xl">
          <FaUser />
          <span className="ml-4">Create an account</span>
        </h2>
      </div>

      <form className="max-w-sm w-full m-auto">
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

          <Input
            className="input"
            type="password"
            id="password-confirm"
            required
            placeholder="Confirm password"
            value={passwordConfirm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPasswordConfirm(e.target.value)
            }
          />
        </div>
        <button className="btn" type="submit">
          Create an account
        </button>
      </form>
    </div>
  );
};
export default SignupPage;
