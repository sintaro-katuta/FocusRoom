import { useState } from "react";
import { supabase } from "lib/supabaseClient";
import Link from "next/link";
import Header from "components/Header";
import useUser from "hooks/useUser";
import * as Icon from "react-bootstrap-icons";
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared";

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
        <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              style: {
                container: {color:'#C9D6DF'},
                button: {backgroundColor:'#C9D6DF',color:"#52616B",border:'none'},
                divider: { color: 'blue' }
              }
            }}
            providers={['google','github']}
          />
      </div>
    </>
  );
}
