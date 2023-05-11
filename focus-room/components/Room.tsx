import { Grid } from "@nextui-org/react";
import { useEffect, useState, useCallback } from "react";
import MyVideo from "./MyVideo";

export default function Room() {
  const [devices, setDevices] = useState([]);

  //  デバイス情報を更新しています。
  const refreshDevices = useCallback(async () => {
    // ここでオーディオのあるデバイスをフィルタリングしています。
    const latestDevices = (
      // ここでデバイスの情報を取得しています。
      await navigator.mediaDevices.enumerateDevices()
    ).filter((d) => d.kind === "audiooutput");
    setDevices(latestDevices);
  }, []);

  useEffect(() => {
    refreshDevices(); // デバイス情報を更新
    //デバイスが変更されたときに、デバイスを初期化するようにしています。
    navigator.mediaDevices.addEventListener("devicechange", refreshDevices);
    return () => {
      navigator.mediaDevices.removeEventListener(
        "devicechange",
        refreshDevices
      );
    };
  }, []);
  return (
    <Grid.Container gap={2} justify="center">
      <Grid xs={12} sm={4}>
        <MyVideo
            device={devices[0]}
        />
      </Grid>
    </Grid.Container>
  );
}