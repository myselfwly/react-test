import {FC, useState} from "react";
import {useAsyncState} from "src/hooks/useAsyncState";
interface TestProps {}
/**
 *
 */
export const Test: FC<TestProps> = (props) => {
  const [page, setPage] = useAsyncState(1);
  const [param, setParam] = useAsyncState(2);
  const [page1, setPage1] = useState(1);
  const [param1, setParam1] = useState(2);
  return (
    <div>
      <button
        onClick={() => {
          const click = async () => {
            const resPage = await setPage((pre) => {
              return pre + 2;
            });
            const resParam = await setParam((pre) => {
              return pre + resPage;
            });
            /**与页面同步 */
            console.log("===", {page: resPage, param: resParam});
          };
          click();
        }}
      >
        使用useAsyncHooks: {page},{param}
      </button>
      <button
        onClick={() => {
          setPage1((pre) => {
            const res = pre + 2;
            console.log("最新的page1:", res);
            return pre + 2;
          });
          setParam1((pre) => {
            const res = pre + page1; /**page1 不是最新的 */
            console.log("使用的page1：", page1);
            console.log("最新的param11：", res);
            return res;
          });
          /**
           * 输出和页面不匹配
           */
          console.log("===1", {page: page1, param: param1});
        }}
      >
        正常state: {page1},{param1}
      </button>
    </div>
  );
};
