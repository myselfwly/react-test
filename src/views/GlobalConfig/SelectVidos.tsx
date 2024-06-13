import {DeleteOutlined, UploadOutlined} from "@ant-design/icons";
import {Button, Form, Input, Modal, Upload} from "antd";
import {useForm} from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import React, {useEffect, useState} from "react";
import {FC} from "react";
import {fileToBase64} from "../../libs/utils";
import styled from "styled-components";

export const SelectVideos: FC<{
  value?: {key: string; name: string; value: string}[];
  onChange?: (value: {key: string; name: string; value: string}[]) => void;
}> = ({value, onChange}) => {
  const [form] = useForm();
  const [state, setState] = useState<{key: string; name: string; value: string}[]>([]);
  const [add, setAdd] = useState(false);
  const triggerChange = (value: {key: string; name: string; value: string}[]) => {
    onChange && onChange(value);
  };
  const changeValue: React.Dispatch<
    React.SetStateAction<
      {
        key: string;
        name: string;
        value: string;
      }[]
    >
  > = (val) => {
    setState(val);
    triggerChange(Array.isArray(val) ? val : val(state));
  };
  useEffect(() => {
    if (value && !state.length) setState(value);
  }, [value]);
  return (
    <SelectVideosWrapper>
      <div className="lists">
        {(value ?? state)?.map((item, index) => {
          return (
            <div
              key={item.key}
              className="audio_item"
            >
              <span className="title">{item.name}</span>
              <audio
                src={item.value}
                controls
              />
              <span className="delete">
                <DeleteOutlined
                  onClick={() => {
                    changeValue((pre) => {
                      const cpPre = [...pre];
                      cpPre.splice(index, 1);
                      return cpPre;
                    });
                  }}
                />
              </span>
            </div>
          );
        })}
      </div>
      <Button
        onClick={() => {
          setAdd(true);
        }}
        type="primary"
      >
        + 新增音频
      </Button>
      <Modal
        open={add}
        title="音频新增"
        onCancel={() => {
          setAdd(false);
        }}
        destroyOnClose
        onOk={() => {
          form.validateFields().then(async (res) => {
            const value: string = (await fileToBase64(res.value.file)) as string;
            changeValue((pre) => {
              return [...pre, {key: Date.now().toString(), name: res.name, value}];
            });
            setAdd(false);
          });
        }}
      >
        <Form form={form}>
          <FormItem
            name={"name"}
            label="音频名称"
            rules={[{required: true}]}
          >
            <Input />
          </FormItem>
          <FormItem
            name={"value"}
            rules={[{required: true}]}
          >
            <Upload
              accept="audio/*"
              beforeUpload={(file) => {
                return false;
              }}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </FormItem>
        </Form>
      </Modal>
    </SelectVideosWrapper>
  );
};

const SelectVideosWrapper = styled.div`
  width: 100%;
  height: auto;
  .title {
    margin-right: 8px;
    width: ${16 * 8}px;
    &::after {
      content: "：";
      display: inline;
    }
  }
  .audio_item {
    margin: 8px 0px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .delete {
      margin-left: 8px;
    }
  }
`;
