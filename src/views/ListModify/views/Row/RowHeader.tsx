import {FC} from "react";
import styled from "styled-components";
import {ColumnsType} from "..";
import {RowWrapper} from ".";
import {Cell} from "./Cell";
interface RowHeaderProps {
  columns: ColumnsType;
}
/**
 *
 */
export const RowHeader: FC<RowHeaderProps> = ({columns}) => {
  return (
    <RowHeaderWrapper className="header list_header">
      {columns.map((item) => {
        return <Cell key={"h_" + item.key}>{item.title}</Cell>;
      })}
    </RowHeaderWrapper>
  );
};
//css-style
const RowHeaderWrapper = styled(RowWrapper)`
  background-color: #fff;
  font-weight: 600;
  &.header.list_header {
    border-bottom: 1px solid #333333;
  }
`;
