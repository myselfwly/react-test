import {PlusOutlined, SettingOutlined} from "@ant-design/icons";
import {Button, Drawer, Form, Space, Upload, Image, InputNumber} from "antd";
import {useForm} from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import React, {FC, useContext, useEffect, useState} from "react";
import {fileToBase64} from "../../libs/utils";
import {GlobalContext} from "../../store";
import styled from "styled-components";
import {SelectVideos} from "./SelectVidos";
import {HexColorPicker} from "react-colorful";

export const GlobalConfig: FC<{}> = () => {
  const [open, setOpen] = useState(false);
  const [form] = useForm();

  const {videos, backImg, fontSize, fontColor, setFontColor, setBackImg, setFontSize, setVideos} =
    useContext(GlobalContext);
  useEffect(() => {
    form.setFieldValue("videos", videos);
  }, [videos]);
  useEffect(() => {
    form.setFieldValue("backImg", backImg);
  }, [backImg]);
  useEffect(() => {
    form.setFieldValue("fontSize", fontSize);
  }, [fontSize]);
  useEffect(() => {
    form.setFieldValue("fontColor", fontColor);
  }, [fontColor]);

  return (
    <GlobalConfigWrapper
      onClick={() => {
        setOpen(!open);
      }}
    >
      <SettingOutlined />
      <Drawer
        open={open}
        title="系统配置"
        width={720}
        onClose={() => {
          setOpen(false);
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Form
          form={form}
          onValuesChange={(value, allValues) => {
            for (const key in value) {
              if (Object.prototype.hasOwnProperty.call(value, key)) {
                const element = value[key];
                switch (key as "backImg" | "fontSize" | "videos" | "fontColor") {
                  case "backImg": {
                    return fileToBase64(element.file, setBackImg);
                  }
                  case "fontSize":
                    return setFontSize(element);
                  case "videos":
                    return setVideos(element);
                  case "fontColor":
                    return setFontColor(element);
                }
              }
            }
          }}
        >
          <FormItem
            label="系统背景"
            name={"backImg"}
          >
            <Upload
              accept="image/*"
              listType="picture-card"
              maxCount={1}
              beforeUpload={(file) => {
                return false;
              }}
            >
              {uploadButton}
            </Upload>
          </FormItem>
          <FormItem
            label="倒计时大小"
            name={"fontSize"}
          >
            <InputNumber suffix="px" />
          </FormItem>
          <FormItem
            label="倒计时颜色"
            name="fontColor"
            valuePropName="color"
          >
            <HexColorPicker />
          </FormItem>
          <FormItem
            label="音频文件"
            name={"videos"}
          >
            <SelectVideos />
          </FormItem>
        </Form>
        <Button
          onClick={() => {
            setBackImg("");
          }}
          type="default"
        >
          清除背景图
        </Button>
      </Drawer>
    </GlobalConfigWrapper>
  );
};
const GlobalConfigWrapper = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  transform: translate(-50%, 50%);
  cursor: pointer;
  user-select: none;
  color: #cfcfcf;
  &:hover {
    color: #efefef;
  }
`;
const uploadButton = (
  <button
    style={{
      border: "none",
      borderRadius: 4,
      // padding: 8,
      background: "none",
      // height: 102,
      // width: 102,
    }}
    type="button"
  >
    <PlusOutlined />
    <div style={{marginTop: 8}}>Upload</div>
  </button>
);
