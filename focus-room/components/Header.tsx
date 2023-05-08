import { supabase } from "lib/supabaseClient";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Router from "next/router";

function Header() {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    getUser();
    supabase.auth.onAuthStateChange((_event, session) => {
      getUser();
    });
  }, [setUser]);

  const getUser = async () => {
    //ログインのセッションを取得
    const { data } = await supabase.auth.getSession();
    //セッションがあるとき現在ログインしているユーザを取得
    if (data.session) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user.user_metadata.name);
      setAvatar(user.user_metadata.avatar_url);
      setSession(data);
    }else{
      setAvatar("/guest_icon.png");
      setSession(null);
    }
  };

  async function signout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      setUser(null);
      setSession(null);
      setAvatar("/guest_icon.png");
      await Router.push("/");
    } catch {
      alert("error");
    }
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark primary-background-color">
      <div className="container-fluid">
        <Link className="navbar-brand text-dark" href="/">
          Focus Room
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse show" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link
              className="nav-link active text-dark"
              aria-current="page"
              href="/"
            >
              Home
            </Link>
            <Link
              href="main"
              className="nav-link active text-dark"
              aria-current="page"
            >
              Main
            </Link>
          </div>
        </div>
        <div className="d-flex">
          <p className="mt-4" style={{ color: "#52616B" }}>
            {user}
          </p>
          <Image
            src={avatar}
            width={70}
            height={70}
            alt=""
            className="d-inline-block align-text-top border border-dark rounded-circle bg-white mx-2"
          />
          {session && (
            //ユーザデータがあったらサインアウトを表示
            <button className="btn btn-danger my-2" onClick={() => signout()}>
              Sign Out
            </button>
          )}

          {session == null && (
            //ユーザデータがなかったらサインインを表示
            <button
              className="btn btn-primary my-2"
              onClick={() => Router.push("/signIn")}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
