//APP.tsx
import {FC} from "react";
import {GlobalContext, useGlobal} from "../store";
import styled from "styled-components";
import {Configs} from "./Configs";
import {GlobalConfig} from "./GlobalConfig";

const App: FC<any> = (props) => {
  const value = useGlobal();

  return (
    <GlobalContext.Provider value={value}>
      <AppWrapper>
        {value?.backImg && (
          <img
            draggable={false}
            id="back_img"
            src={value.backImg}
          />
        )}
        {/* <Test /> */}
        <Configs />
        <GlobalConfig />
      </AppWrapper>
    </GlobalContext.Provider>
  );
};
export default App;
const AppWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: cornflowerblue;
  overflow: hidden;
  backdrop-filter: blur(0);
  #back_img {
    user-select: none;
    width: 100%;
    object-fit: cover;
    position: absolute;
    /* width: 100%; */
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;
