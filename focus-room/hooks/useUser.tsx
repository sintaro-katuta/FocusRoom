import { useEffect, useState } from "react";
import { supabase } from "lib/supabaseClient";

export default function useUser(){
    const [session,setSession] = useState()

    useEffect(() => {
        const { data:authListener } = supabase.auth.onAuthStateChange(
            (session: any) => {
                setSession(session)
            }
        )

        return () => {
            authListener?.unsubscribe();
        }
    },[])

    async function GithubSignIn(){
       const {data,error} = await supabase.auth.signInWithOAuth({
          provider: "github",
          options: {
            redirectTo: "http://localhost:3000/main",
          },
        });
    };
    
    async function GoogleSignIn(){
        const {data,error} = await supabase.auth.signInWithOAuth({
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