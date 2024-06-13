import {Button} from "antd";
import {FC, useState} from "react";
import {useAsyncState} from "src/hooks/useAsyncState";
import styled from "styled-components";
interface TestProps {}
/**
 *
 */
export const Test: FC<TestProps> = (props) => {
  const [page, setNum] = useAsyncState(1);
  const [param, setState] = useState(2);
  /* const changeNum: React.Dispatch<React.SetStateAction<number>> = (data) => {
       setTimeout(() => {
         setNum(10);
         console.log(num);
       }, 0);
     }; */
  return (
    <Wrapper>
      <Button
        onClick={() => {
          /* setState((pre) => {
               return pre + 1;
             })
               .then((res) => {
                 console.log("param", res);
                 return setNum(res + 10);
               })
               .then((res) => {
                 console.log("page", res);
               })
               .catch(() => {}); */
          /* Promise.all([setNum(10), setState(12)])
               .then(([page, param]) => {
                 console.log(page, param);
               })
               .catch(() => {}); */
          /* setNum(10);
             setState(15);
             console.log(page, param); */
          setNum((pre) => {
            return pre + 2;
          }).then(console.log);
          setState((pre) => {
            return pre + 2;
          });
          console.log("===", param);
        }}
      >
        {page},{param}
      </Button>
      {/* <div className="it"></div>
      <p>阿斯顿safasdasfdasfasfrqwkuwahdiuqwhui哦</p> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 2px solid red;
  display: flow-root;
  .it {
    height: 200px;
    width: 200px;
    border: 1px solid green;
    float: left;
    left: 200px;
  }
`;
