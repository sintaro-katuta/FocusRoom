import { supabase } from "lib/supabaseClient";
import Header from "components/Header";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function Login() {
  return (
    <>
      <Header />
      <div className="container">
        <h2 className="text-center p-2">Sign in</h2>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            style: {
              container: { color: "#C9D6DF" },
              button: {
                backgroundColor: "#C9D6DF",
                color: "#52616B",
                border: "none",
              },
              divider: { color: "blue" },
            },
          }}
          providers={["google", "github"]}
        />
      </div>
    </>
  );
}
