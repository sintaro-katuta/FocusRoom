import { useState } from "react";
import { Auth, Typography, Button } from "@supabase/ui";
import { supabase } from "@/../lib/supabaseClient";
import { useForm } from "react-hook-form";
import Header from "components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Icon from "react-bootstrap-icons";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const doRegister = async () => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw new Error(error.message);
    console.log(data);
  };
  const GoogleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };
  const GithubSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    console.log(data);
  };
  return (
    <>
      <Header />
      <div className="container">
        <form>
          <label htmlFor="email" className="form-label">
            Email <Icon.Envelope />
          </label>
          <input
            type="text"
            name="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className="form-label">
            Password <Icon.Key />
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        <div className="col-6 mx-auto">
          <div className="row">
            <button
              className="btn btn-primary row my-2"
              onClick={() => doRegister()}
            >
              Create an Account
            </button>
          </div>
          <div className="border-bottom border" style={{ width: 450 }}></div>
          <div className="row">
            <button
              className="btn btn-danger row my-3"
              onClick={() => GoogleSignIn()}
            >
              Create an Account with Google
              <span>
                <Icon.Google className="" />
              </span>
            </button>
            <button
              className="btn btn-secondary row my-2"
              onClick={() => {
                GithubSignIn();
              }}
            >
              Create an Account with GitHub
              <span>
                <Icon.Github className="" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
