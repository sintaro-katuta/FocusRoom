import { supabase } from "lib/supabaseClient";
import Header from "components/Header";
import { useEffect, useState } from "react";
import Router from "next/router";
import Link from "next/link";
import dayjs, { Dayjs } from "dayjs";
import { NextServer } from "next/dist/server/next";

export default function Main() {
  const [rooms, setRooms] = useState([]);
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
  });
  const GetDateDiff = (from :dayjs.Dayjs) => {
    const to = dayjs();
    let dateDiff: number | string = to.diff(from);
    dateDiff = dayjs(dateDiff).format("Mヶ月 D日 h時間 m分 s秒");

    return dateDiff;
  };
  return (
    <>
      <Header />
      <div className="container">
        <div className="row row-cols-1 g-3">
          {rooms.map((rooms, index) => (
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
