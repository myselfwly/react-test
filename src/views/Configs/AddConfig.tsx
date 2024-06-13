import {Form, FormInstance, Input, InputNumber} from "antd";
import FormItem from "antd/es/form/FormItem";
import {FC, useEffect} from "react";
import styled from "styled-components";
import {EventConfig} from "./EventConfig";
import {createId} from "../../libs/utils";
interface AddConfigProps {
  form: FormInstance;
}
/**
 *
 */
export const AddConfig: FC<AddConfigProps> = ({form}) => {
  useEffect(() => {
    !form.getFieldValue("id") && form.setFieldValue("id", createId());
  }, []);
  return (
    <Form
      form={form}
      validateMessages={{required: "'${label}' 是必选字段"}}
    >
      <FormItem
        noStyle
        name={"id"}
      >
        <div></div>
      </FormItem>
      <FormItem
        name={"name"}
        label="名称"
        rules={[{required: true}]}
      >
        <Input />
      </FormItem>
      <FormItem
        name={"timeLong"}
        label="时长"
        rules={[{required: true}]}
      >
        <InputNumber suffix="秒" />
      </FormItem>
      <FormItem
        name={"events"}
        label="计时事件"
      >
        <EventConfig />
      </FormItem>
    </Form>
  );
};
//css-style
const AddConfigWrapper = styled.div``;
