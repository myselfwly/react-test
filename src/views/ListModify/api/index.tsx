import {DataType, ManOperate, SexEnum, WomanOperate} from "../views/type";

export const getData = () => {
  // 辅助函数生成随机整数
  const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // 生成随机名字
  const getRandomName = (length: number): string => {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let name = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = getRandomInt(0, characters.length - 1);
      name += characters[randomIndex];
    }
    return name;
  };

  // 生成不重复名字列表
  const generateUniqueNames = (count: number, length: number): string[] => {
    const names = new Set<string>();
    while (names.size < count) {
      names.add(getRandomName(length));
    }
    return Array.from(names);
  };

  // 生成测试数据
  const generateTestData = (): DataType[] => {
    const data: DataType[] = [];
    const uniqueNames = generateUniqueNames(10, 5); // 生成10个不重复的长度为5的名字

    for (const name of uniqueNames) {
      const sex = getRandomInt(0, 1) as SexEnum;

      const operate =
        sex === SexEnum.Woman
          ? WomanOperate[getRandomInt(0, WomanOperate.length - 1)].value
          : ManOperate[getRandomInt(0, ManOperate.length - 1)].value;

      data.push({
        name,
        sex,
        operate,
      });
    }

    return data;
  };
  return new Promise<{data: DataType[]}>((resolve, reject) => {
    // 使用生成的测试数据
    resolve({data: generateTestData()});
  });
};

export const getSex = () => {
  return new Promise<{data: [{label: "男"; value: SexEnum.Man}, {label: "女"; value: SexEnum.Woman}]}>(
    (resolve, reject) => {
      resolve({
        data: [
          {label: "男", value: SexEnum.Man},
          {label: "女", value: SexEnum.Woman},
        ],
      });
    },
  );
};

export const getOperate = (sex: SexEnum) => {
  return new Promise<{data: typeof WomanOperate | typeof ManOperate}>((resolve, reject) => {
    resolve({data: sex === SexEnum.Man ? ManOperate : WomanOperate});
  });
};

/**服务端优化 */
export const getConfig = () => {
  return new Promise<{
    data: [
      {label: "男"; value: SexEnum.Man; children: typeof ManOperate},
      {label: "女"; value: SexEnum.Woman; children: typeof WomanOperate},
    ];
  }>((resolve, reject) => {
    resolve({
      data: [
        {label: "男", value: SexEnum.Man, children: ManOperate},
        {label: "女", value: SexEnum.Woman, children: WomanOperate},
      ],
    });
  });
};
