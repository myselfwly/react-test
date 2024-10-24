import {FC, useCallback, useState} from "react";
import styled from "styled-components";
import {DataType} from "../type";
import {ColumnsType} from "..";
import {Cell} from "./Cell";
import {Select} from "antd";
interface RowProps {
  data: DataType;
  columns: ColumnsType;
  sexConfig: {
    label: string;
    value: string | number;
  }[];
  operateConfig: Record<
    string | number,
    {
      label: string;
      value: string | number;
    }[]
  >;
  index: number;
}
/**
 *
 */
export const Row: FC<RowProps> = ({data, columns, sexConfig, operateConfig}) => {
  const [record, setRecord] = useState(data);
  const cellRender = useCallback(
    (data: DataType, item: ColumnsType[number]) => {
      if (item.dataIndex === "name") {
        return <Cell>{data?.[item.dataIndex as keyof DataType]}</Cell>;
      }
      if (item.dataIndex === "sex") {
        return (
          <Select
            value={data.sex}
            size="small"
            options={sexConfig}
            onSelect={(value) => {
              setRecord((pre) => {
                const cpPre = {...pre};
                if (value !== pre.sex) {
                  cpPre.operate = operateConfig[value][0].value as any;
                }

                cpPre.sex = value;
                console.log(`post data:`, cpPre);
                return cpPre;
              });
            }}
          />
        );
      }
      if (item.dataIndex === "operate") {
        return (
          <Select
            value={data.operate}
            size="small"
            options={operateConfig[data.sex]}
            onSelect={(value) => {
              setRecord((pre) => {
                const cpPre = {...pre, operate: value};
                console.log(`post data:`, cpPre);
                return cpPre;
              });
            }}
          />
        );
      }
    },
    [record, sexConfig, operateConfig],
  );
  return (
    <RowWrapper>
      {columns.map((item) => {
        return <Cell key={`cell_${record[item.key as unknown as keyof DataType]}`}>{cellRender(record, item)}</Cell>;
      })}
    </RowWrapper>
  );
};
//css-style
export const RowWrapper = styled.div`
  width: 100%;
  height: 36px;
  border-bottom: 1px solid #a3a3a3;
  background-color: #b8b8b8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:last-child {
    border: none;
  }
`;
