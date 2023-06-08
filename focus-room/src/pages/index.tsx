import type { NextPage } from "next";
import { supabase } from "lib/supabaseClient";
import * as Icon from "react-bootstrap-icons";
import Router from "next/router";
import Header from "components/Header";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <Head>
        <title>Focus Room</title>
      </Head>
      <div className="container-lg">
        <div className="row">
          <div className="col">
            <div id="primary-content" className="row">
              <h2 className="fw-light">Focus Room とは</h2>
              <h3 className="mt-2 ms-3 fw-light">-どんな人向け？</h3>
              <ul className="my-4 ms-4 list-group list-group-horizontal-sm">
                <li className="list-group-item secondary-background-color">
                  集中して作業したいけど集中してできない😒
                </li>
                <li className="list-group-item secondary-background-color">
                  複数人でしたいけど専用のアプリが無い😥
                </li>
                <li className="list-group-item secondary-background-color">
                  スマホの通知やゲームの誘惑に負けてしまう😵‍💫
                </li>
                <li className="list-group-item secondary-background-color">
                  BGMをかけたいけど、BGMのほうが気になって集中できない😫
                </li>
              </ul>

              <Icon.ArrowDown className="my-2" width={30} height={30} />

              <div className="ms-4 mt-3 border border-dark">
                <h3 className="mt-2 fw-light text-center">
                  そんな方々に向けた<span className="fw-bold">超集中</span>
                  プラットフォーム
                </h3>
                <h3 className="mt-2 ms-4 py-3 py-2 fw-light text-center">
                  Focus Room
                </h3>
              </div>

              <h3 className="mt-2 ms-3 fw-light">-集中</h3>
              <p className="mt-2 py-4 ms-4 h6 fw-light rounded secondary-background-color">
                集中して作業に取り組みたいとき一人でするよりも友達としたり、カフェでしたほうがはかどりませんか？
                一人でも複数人でも集中できるそんな
                <span className="fw-bold">部屋</span>を共有することができます
              </p>

              <h3 className="mt-2 ms-3 fw-light">-部屋</h3>
              <p className="mt-2 py-4 ms-4 h6 fw-light rounded secondary-background-color">
                それぞれの部屋では音楽をかけたり、他の人と話しながら作業をできます。
                部屋のリーダーがかける音楽を決めたり、制限をつける事ができます。
              </p>
            </div>
            <div id="secondary-content" className="row">
              <h2 className="fw-light">Focus Room の 使い方</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
