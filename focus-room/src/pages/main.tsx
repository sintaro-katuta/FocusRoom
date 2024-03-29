import { supabase } from "lib/supabaseClient";
import Header from "components/Header";
import { useEffect, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import ja from 'dayjs/locale/ja';
import { NextServer } from "next/dist/server/next";
import { useRouter } from "next/router";

export default function Main() {
  const [rooms, setRooms]: any = useState([]);
  const [roomName, setRoomName]: any = useState()
  const [visible, setVisible] = useState(false);

  const router = useRouter()

  dayjs.locale(ja);
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault("Asia/Tokyo");

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

  const GetDateDiff = (to: dayjs.Dayjs) => {
    to = dayjs(to).tz()
    const from = dayjs().tz();
    const year = from.diff(to, 'year')
    const month = from.diff(to, 'month')
    const day = from.diff(to, 'day')
    const hour = from.diff(to, 'hour')
    const minute = from.diff(to, 'minute')
    const second = from.diff(to, 'second')
    let dateDiff: string = ''
    if (month >= 12) {
      dateDiff = `${year}年`
    } else if (day >= 30) {
      dateDiff = `${month}ヶ月`
    } else if (hour >= 24) {
      dateDiff = `${day}日`
    } else if (minute >= 60) {
      dateDiff = `${hour}時間`
    } else if (second >= 60) {
      dateDiff = `${minute}分`
    } else {
      dateDiff = `${second}秒`
    }
    return dateDiff;

  };

  const createRoom = async (e: any) => {
    const { data, error } = await supabase
      .from("rooms")
      .upsert({ name: roomName })
      .select();
    router.reload()
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row row-cols-1 g-3">
          {visible
            ?
            <div className="input-group">
              <input type="text" className="form-control" placeholder="部屋名" aria-label="部屋名" aria-describedby="input-group-button-right" onChange={(e) => setRoomName(e.target.value)} />
              <button type="button" className="btn btn-outline-secondary" id="input-group-button-right" onClick={(e) => createRoom(e)}>作成</button>
            </div>
            :
            <button className="btn btn-primary" onClick={() => setVisible(!visible)}>部屋を作成</button>
          }
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
      </div>
    </>
  );
}
