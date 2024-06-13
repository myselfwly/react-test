import {FC, useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import {ConfigItemType} from "./type";
import {Item} from "./Item";
import {Button, Modal} from "antd";
import {useForm} from "antd/es/form/Form";
import {AddConfig} from "./AddConfig";
import {TimePage} from "../TimePage";
interface ConfigsProps {}
/**
 *
 */
export const Configs: FC<ConfigsProps> = (props) => {
  const [form] = useForm();
  const [configs, setConfigs] = useState<ConfigItemType[]>([]);
  const [active, setActive] = useState<ConfigItemType>();
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState<{config: ConfigItemType; index: number} | undefined>();
  useEffect(() => {
    const cache = window.sessionStorage.getItem("configs");
    if (cache) {
      setConfigs(JSON.parse(cache));
    }
  }, []);
  const changeConfigs: React.Dispatch<React.SetStateAction<ConfigItemType[]>> = useCallback((val) => {
    window.sessionStorage.setItem("configs", JSON.stringify(Array.isArray(val) ? val : val(configs)));
    setConfigs(val);
  }, []);
  const editConfig = useCallback((index: number, config: ConfigItemType) => {
    changeConfigs((pre) => {
      const cpPre = [...pre];
      cpPre.splice(index, 1, config);
      return cpPre;
    });
  }, []);
  const addConfig = useCallback((config: ConfigItemType) => {
    changeConfigs((pre) => {
      const cpPre = [...pre, config];
      return cpPre;
    });
  }, []);
  const deleteConfig = useCallback((index: number) => {
    changeConfigs((pre) => {
      const cpPre = [...pre];
      cpPre.splice(index, 1);
      return cpPre;
    });
  }, []);
  const selectConfig = useCallback((config: ConfigItemType) => {
    setActive(config);
  }, []);
  const editTrigger = useCallback((index: number, config: ConfigItemType) => {
    form.setFieldsValue(config);
    setEdit({index, config});
  }, []);
  return (
    <ConfigsWrapper>
      <div className="left_lists">
        <div className="lists">
          {configs.map((item, index) => {
            return (
              <Item
                active={active}
                config={item}
                selectConfig={selectConfig}
                index={index}
                deleteConfig={deleteConfig}
                editTrigger={editTrigger}
                key={item.id}
              />
            );
          })}
        </div>
        <div className="footer">
          <Button
            type="primary"
            onClick={() => {
              form.resetFields();
              setAdd(true);
            }}
          >
            新建计时器
          </Button>
        </div>
      </div>
      <div className="right_contain">
        <TimePage config={active} />
      </div>
      <Modal
        open={add || !!edit}
        width={720}
        title="新建计时器"
        onCancel={() => {
          setAdd(false);
          setEdit(undefined);
        }}
        onOk={() => {
          form.validateFields().then((res) => {
            !!edit ? editConfig(edit.index, res) : addConfig(res as ConfigItemType);
            setAdd(false);
            setEdit(undefined);
            form.resetFields();
          });
        }}
      >
        <AddConfig form={form} />
      </Modal>
    </ConfigsWrapper>
  );
};
//css-style
const ConfigsWrapper = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  height: 100%;
  top: 0;
  left: 0;
  .left_lists {
    padding: 8px 16px;
    width: 320px;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #4c4c4c88;
    align-items: center;
    .lists {
      flex: 1;
      width: 100%;
      overflow: auto;
    }
    .footer {
      width: fit-content;
      flex: 0 0 auto;
      margin-top: auto;
      margin-bottom: 16px;
    }
  }
  .right_contain {
    flex: 1;
    width: 1px;
  }
`;
