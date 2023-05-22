import Header from "components/Header";
import { supabase } from "lib/supabaseClient";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState, useEffect } from "react";
import Room_Camera from "components/Room";

export default function Room() {
  const { query, isReady } = useRouter();
  const [settings, setSettings] = useState<any>();

  const router = useRouter();

  useEffect(() => {
    if (isReady) {
      GetRoom_Settings();
    }
    if (!query.id) {
      router.push("/main");
    }
  },[]);

  const GetRoom_Settings = async () => {
    let { data: room_settings } :any = await supabase
    .from("room_settings")
    .select(`seat,reader(*)`)
    .eq("id", query.id)
    .single();

    setSettings(room_settings)
  };



  return (
    <>
      <Header />
      <ul className="list-group">
        {settings && (
          <>
            <li className="list-group-item">Reader: {settings.reader.full_name}
              <Image src={settings.reader.avatarurl} className="mx-2 rounded-circle" width={30} height={30} alt="リーダアイコン"/>
            </li> 
            <li className="list-group-item">Seat: {settings.seat}</li>
          </>
          )}
      </ul>
      <Room_Camera></Room_Camera>
    </>
  );
}