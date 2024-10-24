import {FC, useEffect, useState} from "react";
import styled from "styled-components";
/**
 * 需求
 *   需要渲染一个列表，
 *    a. 列表有单纯渲染的列 a
 *    b. 列表有需要配置的列 b
 *      1. b 的配置信息来自于api
 *    c. 列表有需要配置的列 c
 *      2. c 的配值信息来自于 api(b) 并依赖于b
 *    d. 每列修改完需要提交
 * 拆分
 *   先做一个列可以修改数据
 *   在去把每一列渲染出来
 * 风险
 *   频繁网络请求（性能问题）
 *   定制化很严重（暂不解决）
 * 解决思路
 *   前端使用map降低网络请求次数，请求次数基于b的个数
 *   服务端将整份数据返回之请求一次
 */

//先做一个列可以修改数据，单列
import {Row} from "./Row";
import {DataType} from "./type";
import {getData, getOperate, getSex} from "../api";
import {RowHeader} from "./Row/RowHeader";
// 定义列，用来决定渲染顺序
const columns = [
  {key: "name", dataIndex: "name", title: "姓名"},
  {key: "sex", dataIndex: "sex", title: "性别"},
  {key: "operate", dataIndex: "operate", title: "活动"},
];
export type ColumnsType = typeof columns;
interface ListsProps {}
export const Lists: FC<ListsProps> = (props) => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [sexConfig, setSexConfig] = useState<{label: string; value: string | number}[]>([]);
  const [operateConfig, setOperateConfig] = useState<
    Record<string | number, {label: string; value: string | number}[]>
  >({});
  useEffect(() => {
    getData().then((res) => {
      setDataSource(res.data);
    });
    getSex()
      .then((res) => {
        setSexConfig(res.data);
        return res.data;
      })
      .then((sexData) => {
        Promise.all(sexData.map((item) => getOperate(item.value))).then((res) => {
          for (let index = 0; index < res.length; index++) {
            const element = res[index].data;
            setOperateConfig((pre) => {
              const cpPre = {...pre};
              cpPre[sexData[index].value] = element;
              return cpPre;
            });
          }
        });
      });
  }, []);
  return (
    <ListsWrapper>
      <RowHeader columns={columns}></RowHeader>
      {dataSource.map((item, index) => {
        return (
          <Row
            key={"row_" + item.name}
            data={item}
            columns={columns}
            sexConfig={sexConfig}
            operateConfig={operateConfig}
            index={index}
          />
        );
      })}
    </ListsWrapper>
  );
};
//css-style
const ListsWrapper = styled.div`
  width: 100%;
  height: fit-content;
`;
