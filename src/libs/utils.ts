export class Interval {
  timeStep: number;
  stopStatus: boolean;
  timeLong: number;
  events: {
    trigger: (currentTime: number) => boolean;
    callback: (currentTime: number) => any;
  }[];
  constructor(timeStep: number) {
    this.timeStep = timeStep;
    this.stopStatus = true;
    this.timeLong = 0;
    this.events = [];
  }
  stop() {
    this.stopStatus = true;
  }
  start(timeLong: number, callback: (sec: number) => any) {
    if (this.stopStatus === false) return;
    this.timeLong = timeLong;
    this.stopStatus = false;
    this.interval(callback);
  }
  interval(callback: (sec: number) => any) {
    const start: number = document.timeline ? (document.timeline.currentTime as number) : performance.now();
    const timer1 = (time: number) => {
      const gaps = time - start;
      const seconds = Math.round(gaps / this.timeStep);
      const timeRemaining = this.timeLong - seconds;
      if (timeRemaining < 0) this.stop();
      if (this.stopStatus) return;
      this.events.forEach((item) => {
        if (item.trigger(timeRemaining)) {
          item.callback(timeRemaining);
        }
      });
      callback(timeRemaining);
      const targetNext = (seconds + 1) * this.timeStep + start; // 算出下次interval开始的时间
      const delay: number = document.timeline ? (document.timeline.currentTime as number) : performance.now(); // 取出更新完UI的时间
      setTimeout(
        () => {
          requestAnimationFrame(timer1.bind(this)); // requestAnimationFrame 执行回调函数的时刻 当作参数，传入到callback
        },
        targetNext - delay, // 算出距离下次interval开始时间
      );
    };
    timer1.apply(this, [start]);
  }
  addEvent(trigger: (currentTime: number) => boolean, callback: (currentTime: number) => any) {
    this.events.push({trigger, callback});
  }
  removeEvents(trigger: (currentTime: number) => boolean, callback: (currentTime: number) => any) {
    const removeIndex = this.events.findIndex((item) => item.trigger === trigger && item.callback === callback);
    if (removeIndex !== -1) {
      this.events.splice(removeIndex, 1);
    }
  }
}
export async function fileToBase64(file: File, callback?: Function) {
  return await new Promise((res) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      callback && callback(e.target?.result as string);
      res(e.target?.result);
    };
    reader.readAsDataURL(file);
  });
}

export const secToTime = (sec: number) => {
  const hour = Math.floor(sec / 3600);
  const min = Math.floor((sec - hour * 3600) / 60);
  const secs = Math.floor(sec % 60);
  return [hour < 10 ? "0" + hour : hour, min < 10 ? "0" + min : min, secs < 10 ? "0" + secs : secs];
};
export const timeToSec = (time: number[]) => {
  return time[0] * 3600 + time[1] * 60 + time[2];
};

export const createId = () => {
  return "id_" + Math.random().toString(36).slice(2, 9) + "_" + Date.now().toString(36).slice(2, 9);
};
