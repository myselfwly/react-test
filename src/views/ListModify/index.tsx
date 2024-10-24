import {FC} from "react";
import styled from "styled-components";
import {Lists} from "./views";
interface ListModifyProps {}
/**
 *
 */
export const ListModify: FC<ListModifyProps> = (props) => {
  return (
    <ListModifyWrapper>
      <Lists />
    </ListModifyWrapper>
  );
};
//css-style
const ListModifyWrapper = styled.div`
  width: 70%;
  height: 100%;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
`;
