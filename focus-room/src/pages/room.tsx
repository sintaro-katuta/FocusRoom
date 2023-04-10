import Header from "components/Header";
import { supabase } from "lib/supabaseClient";
import { useRouter } from "next/router";
import Router from "next/router";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Room() {
  const { query, isReady } = useRouter();
  const [settings, setSettings] = useState(null);
  const [reader, setReader] = useState(null);
  const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    if (isReady) {
      GetRoom_Settings();
      if (settings) {
        GetUser(settings.reader);
      }
    }
    if (!query.id) {
      Router.push("/main");
    }
  }, [setSettings]);

  const GetRoom_Settings = async () => {
    let {
      data: room_settings,
      error,
      status,
    } = await supabase
      .from("room_settings")
      .select("*")
      .eq("id", query.id)
      .single();
    //データベースのデータが取得できていたら設定を格納
    if (room_settings !== null) {
      setSettings(room_settings);
    } else {
      setSettings(null);
    }
  };

  const GetUser = async (id) => {
    let {
      data: profiles,
      error,
      status,
    } = await supabase.from("profiles").select("*").eq("id", id).single();
    //データベースのデータが取得できていたら設定を格納
    if (profiles !== null) {
      setReader(profiles);
    } else {
      setReader(null);
    }
  };

  return (
    <>
      <Header />
      <ul className="list-group">
        <li className="list-group-item">
          {reader && (
            <>
              Reader:
              {reader.full_name}
              <Image
                className="border border-dark rounded-circle mx-2"
                src={reader.avatar_url}
                width={40}
                height={40}
                alt=""
              />
            </>
          )}
        </li>
        <li className="list-group-item">Seat: {settings && settings.seat}</li>
      </ul>
    </>
  );
}
