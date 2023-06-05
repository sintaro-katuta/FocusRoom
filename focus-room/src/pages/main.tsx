import { supabase } from "lib/supabaseClient";
import Header from "components/Header";
import { useEffect, useState } from "react";
import Link from "next/link";
import dayjs, { Dayjs } from "dayjs";
import { NextServer } from "next/dist/server/next";
import { useRouter } from "next/router";

export default function Main() {
  const [rooms, setRooms]: any = useState([]);
  const [roomName, setRoomName]: any = useState()
  const [visible, setVisible] = useState(false);

  const router = useRouter()

  useEffect(() => {
    const getRooms = async () => {
      let {
        data: rooms,
        error,
        status,
      } = await supabase.from("rooms").select("*");
      setRooms(rooms);
    };
    getRooms();
  }, []);

  const GetDateDiff = (from: dayjs.Dayjs) => {
    const to = dayjs();
    let dateDiff: number | string = to.diff(from);
    dateDiff = dayjs(dateDiff).format("Mヶ月 D日 h時間 m分 s秒");

    return dateDiff;
  };

  const createRoom = async (e: any) => {
    const { data, error } = await supabase
      .from("rooms")
      .upsert({ name: roomName })
      .select();
    router.push("/main")
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row row-cols-1 g-3">
          {rooms.map((rooms: any, index: number) => (
            <div className="card p-0" key={index}>
              <div className="card-body">
                <div className="row">
                  <h5 className="card-title col">{rooms.name}</h5>
                  <Link
                    href={{ pathname: "room", query: { id: rooms.id } }}
                    as="room"
                    className="btn btn-primary col"
                  >
                    In
                  </Link>
                </div>
              </div>
              <div className="card-footer text-muted">
                {GetDateDiff(rooms.created_at)}前
              </div>
            </div>
          ))}
        </div>
        {visible
          ?
          <div>
            <input type="text" onChange={(e) => setRoomName(e.target.value)} />
            <button className="btn btn-primary" onClick={(e) => createRoom(e)}>作成</button>
          </div>
          :
          <button className="btn btn-primary" onClick={() => setVisible(!visible)}>部屋を作成</button>
        }
      </div>
    </>
  );
}
