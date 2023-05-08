import { useState } from "react";
import { supabase } from "lib/supabaseClient";
import Link from "next/link";
import Header from "components/Header";
import * as Icon from "react-bootstrap-icons";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const doRegister = async () => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw new Error(error.message);
    console.log(data);
  };
  return (
    <>
      <Header />
      <div className="container">
        <h2 className="text-center p-2">Sign Up</h2>
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
          <div className="d-grid gap-3">
            <button className="btn btn-primary" onClick={() => doRegister()}>
              Creat an Account
            </button>
            <Link href="/signIn" className="text-center">
              Sign in?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
