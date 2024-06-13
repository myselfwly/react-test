import {FC, useCallback, useContext, useState} from "react";
import styled from "styled-components";
import {EventType} from "./type";
import {DeleteOutlined} from "@ant-design/icons";
import {Button, InputNumber, Select} from "antd";
import {GlobalContext} from "../../store";
import {createId} from "../../libs/utils";
interface EventConfigProps {
  value?: EventType[];
  onChange?: (value: EventType[]) => void;
}
/**
 *
 */
export const EventConfig: FC<EventConfigProps> = ({value, onChange}) => {
  const [events, setEvents] = useState<EventType[]>([]);
  const {videos} = useContext(GlobalContext);
  const triggerChange = (value: EventType[]) => {
    onChange && onChange(value);
  };
  const changeEvents: React.Dispatch<React.SetStateAction<EventType[]>> = (val) => {
    setEvents(val);
    triggerChange(Array.isArray(val) ? val : val(events));
  };
  const addEvent = (event: EventType) => {
    changeEvents([...events, event]);
  };
  const editEvents = (index: number, event: EventType) => {
    changeEvents((pre) => {
      const cpPre = [...pre];
      cpPre.splice(index, 1, event);
      return cpPre;
    });
  };
  const deleteEvents = (index: number) => {
    changeEvents((pre) => {
      const cpPre = [...pre];
      cpPre.splice(index, 1);
      return cpPre;
    });
  };
  return (
    <EventConfigWrapper>
      {(value || events).map((item, index) => {
        return (
          <div
            className="event_item"
            key={item.id}
          >
            <div className="item time">
              <span className="title">时间</span>
              <InputNumber
                suffix="秒"
                value={item.timeCurrent}
                onChange={(value) => {
                  editEvents(index, {...item, timeCurrent: value ?? 0});
                }}
              />
            </div>
            <div className="item event">
              <span className="title">音频</span>
              <Select
                options={videos?.map((item) => ({label: item.name, value: item.value}))}
                value={item.audio}
                onSelect={(value) => {
                  editEvents(index, {...item, audio: value});
                }}
              />
            </div>
            <div
              className="item delete"
              onClick={() => {
                deleteEvents(index);
              }}
            >
              <DeleteOutlined />
            </div>
          </div>
        );
      })}
      <Button
        type="primary"
        onClick={() => {
          addEvent({timeCurrent: 0, audio: "", id: createId()});
        }}
        children="新增事件"
      />
    </EventConfigWrapper>
  );
};
//css-style
const EventConfigWrapper = styled.div`
  .event_item {
    margin: 8px;
    padding: 8px;
    border: 1px dashed #4f4f4f;
    border-radius: 6px;
    display: flex;
    align-items: center;
    span.title {
      &::after {
        content: "：";
        display: inline;
      }
    }
    .event {
      display: flex;
      white-space: nowrap;
      align-items: center;
    }

    .item {
      margin: 0 16px;
      flex: 1;
    }
    .delete {
      cursor: pointer;
      flex: 0 0 auto;
    }
  }
`;
