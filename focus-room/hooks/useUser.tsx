import { useEffect, useState } from "react";
import { supabase } from "lib/supabaseClient";

export default function userUser(){
    const [session,setSession] = useState()

    useEffect(() => {
        const { data:authListener } = supabase.auth.onAuthStateChange(
            (session) => {
                setSession(session)
            }
        )

        return () => {
            authListener.unsubscript()
        }
    },[])

    function GithubSignIn(){
        supabase.auth.signInWithOAuth({
          provider: "github",
          options: {
            redirectTo: "http://localhost:3000/main",
          },
        });
    };

    function GoogleSignIn(){
        supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: "http://localhost:3000/main",
          },
        });
    };

    return {
        session,
        GithubSignIn,
        GoogleSignIn,
    }
}