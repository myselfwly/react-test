import React, {useCallback, useEffect, useState} from "react";

export const useGlobal = () => {
  const [fontSize, changeFontSize] = useState<number>(154);
  const [fontColor, changeFontColor] = useState<string>("#cfcfcf");
  const [backImg, changeBackImg] = useState<string>();
  const [videos, changeVideos] = useState<{key: string; name: string; value: string}[]>([]);
  const setFontSize = useCallback((size: number) => {
    window.sessionStorage.setItem("fontSize", size.toString());
    changeFontSize(size);
  }, []);
  const setBackImg = useCallback((img: string) => {
    window.sessionStorage.setItem("backImg", img);
    changeBackImg(img);
  }, []);
  const setVideos = useCallback((videos: {key: string; name: string; value: string}[]) => {
    window.sessionStorage.setItem("videos", JSON.stringify(videos));
    changeVideos(videos);
  }, []);
  const setFontColor = useCallback((color: string) => {
    window.sessionStorage.setItem("fontColor", color);
    changeFontColor(color);
  }, []);
  useEffect(() => {
    const cacheVideos = window.sessionStorage.getItem("videos");
    const cacheFontSize = window.sessionStorage.getItem("fontSize");
    const cacheBackImg = window.sessionStorage.getItem("backImg");
    const fontColor = window.sessionStorage.getItem("fontColor");
    if (cacheVideos) {
      setVideos(JSON.parse(cacheVideos));
    }
    if (cacheFontSize && !Number.isNaN(+cacheFontSize)) {
      setFontSize(+cacheFontSize);
    }
    if (cacheBackImg) {
      setBackImg(cacheBackImg);
    }
    if (fontColor) {
      setFontColor(fontColor);
    }
  }, []);
  return {
    fontSize,
    backImg,
    videos,
    fontColor,
    setBackImg,
    setFontSize,
    setVideos,
    setFontColor,
  };
};
export const GlobalContext = React.createContext<ReturnType<typeof useGlobal>>({
  fontSize: 154,
  backImg: undefined,
  videos: [],
  fontColor: "#cfcfcf",
  setBackImg: () => {},
  setFontSize: () => {},
  setVideos: () => {},
  setFontColor: () => {},
});
