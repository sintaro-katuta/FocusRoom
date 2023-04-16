import { useState } from "react";
import { supabase } from "lib/supabaseClient";
import Link from "next/link";
import Header from "components/Header";
import useUser from "hooks/useUser";
import * as Icon from "react-bootstrap-icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { session, GithubSignIn, GoogleSignIn } = useUser();

  const doLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log(email, password);
      alert(error);
    }
    console.log(data, error);
  };

  return (
    <>
      <Header />
      <div className="container">
        <h2 className="text-center p-2">Login</h2>
        <form>
          <div className="form-floating mb-3">
            <input
              type="text"
              name="email"
              id="floatingInput"
              className="form-control my-4"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email" className="form-label">
              Email <Icon.Envelope />
            </label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              name="password"
              id="floatingPassword"
              className="form-control my-4"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password" className="form-label">
              Password <Icon.Key />
            </label>
          </div>
        </form>
        <div className="d-grid gap-3">
          <button className="btn btn-primary" onClick={() => doLogin()}>
            Login
          </button>
          <div className="border"></div>
          <button className="btn btn-danger" onClick={() => GoogleSignIn()}>
            Login with Google
            <span>
              <Icon.Google className="mx-2" />
            </span>
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              GithubSignIn();
            }}
          >
            Login with GitHub
            <span>
              <Icon.Github className="mx-2" />
            </span>
          </button>
          <Link href="/signUp" className="text-center">
            Create an account?
          </Link>
        </div>
      </div>
    </>
  );
}
