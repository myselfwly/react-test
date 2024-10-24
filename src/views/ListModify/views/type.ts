export type DataType = {
  name: string;
  sex: SexEnum;
  operate: (typeof WomanOperate | typeof ManOperate)[number]['value']
}
export enum SexEnum  {
  Woman,
  Man
}

export const WomanOperate = [{label:"美容",value:1}, {label:"美发",value:2}, {label:"美甲",value:3}, {label:"美脚",value:4}] 
export const ManOperate = [{ label: "篮球", value: 8 }, { label: "足球", value: 7 }, { label: "乒乓", value: 6 }, { label: "橄榄", value: 5 }] 

