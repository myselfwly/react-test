//APP.tsx
import React, {FC, useCallback, useContext, useEffect, useRef, useState} from "react";
import {Interval, secToTime} from "../libs/utils";
import styled from "styled-components";
import {ConfigItemType} from "./Configs/type";
import {GlobalContext} from "../store";
import {Button} from "antd";
export const TimePage: FC<{config?: ConfigItemType}> = ({config}) => {
  const timeRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const value = useContext(GlobalContext);
  const [timeRemaining, setTimeRemaining] = useState(config?.timeLong ?? 0);
  const interval = useRef<Interval>();
  const fullscreenchange = useCallback((e: Event) => {
    setOpen(!openRef.current);
    openRef.current = !openRef.current;
  }, []);
  const openStart = async () => {
    await timeRef.current?.requestFullscreen();
  };

  useEffect(() => {
    if (!config) return;

    setTimeRemaining(config.timeLong);
    interval.current = new Interval(1000);
    config?.events?.forEach((item) => {
      const trigger = (cur: number) => {
        return cur === item.timeCurrent;
      };
      const callback = (cur: number) => {
        console.log(item);

        const audio = item?.audio;
        if (audio) {
          const music = new Audio(audio);
          music.play();
        }
      };
      interval.current?.addEvent(trigger, callback);
    });
    if (!timeRef.current) {
      return;
    }
    timeRef.current.addEventListener("fullscreenchange", fullscreenchange);
    return () => {
      if (!timeRef.current) {
        return;
      }
      timeRef.current.removeEventListener("fullscreenchange", fullscreenchange);
    };
  }, [config?.id]);
  const whiteSpace = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setStart(true);
        interval.current?.start(config?.timeLong ?? 0, setTimeRemaining);
      }
    },
    [config],
  );
  useEffect(() => {
    if (open) {
      window.addEventListener("keydown", whiteSpace);
    } else {
      setStart(false);
      interval.current?.stop();
      setTimeRemaining(config?.timeLong ?? 0);
      window.removeEventListener("keydown", whiteSpace);
    }
  }, [open]);
  useEffect(() => {
    return () => {
      window.removeEventListener("keydown", whiteSpace);
    };
  }, []);
  return !config ? (
    <></>
  ) : (
    <TimePageWrapper
      ref={timeRef}
      className={open ? "open" : ""}
    >
      {value?.backImg && (
        <img
          draggable={false}
          id="back_img"
          src={value.backImg}
        />
      )}
      <div style={{fontSize: value?.fontSize, fontWeight: "bold", color: value?.fontColor}}>
        {secToTime(timeRemaining).join(":")}
      </div>
      {!start && <div>按下空格键开始计时</div>}
      {!open && (
        <Button
          type="primary"
          onClick={() => {
            openStart();
          }}
        >
          开始
        </Button>
      )}
    </TimePageWrapper>
  );
};
const TimePageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: static;
  left: 0;
  right: 0;
  color: aliceblue;
  #back_img {
    display: none;
  }
  &.open {
    width: 100vw;
    height: 100vh;
    position: fixed;
    #back_img {
      display: block;
      z-index: -1;
    }
  }
`;
