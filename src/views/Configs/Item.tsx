import {FC, useState} from "react";
import styled from "styled-components";
import {ConfigItemType} from "./type";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
interface ItemProps {
  config: ConfigItemType;
  selectConfig: (config: ConfigItemType) => void;
  deleteConfig: (index: number) => void;
  editTrigger: (index: number, config: ConfigItemType) => void;
  index: number;
  active?: ConfigItemType;
}
/**
 *
 */
export const Item: FC<ItemProps> = ({selectConfig, deleteConfig, editTrigger, index, config, active}) => {
  return (
    <ItemWrapper
      className={active?.id === config.id ? "active" : "default"}
      onClick={() => {
        selectConfig(config);
      }}
    >
      <div className={"name"}>
        <span>{config.name}</span>
      </div>
      <div className="operate">
        <div className="op_item edit">
          <EditOutlined
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              editTrigger(index, config);
            }}
          />
        </div>
        <div className="op_item delete">
          <DeleteOutlined
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              deleteConfig(index);
            }}
          />
        </div>
      </div>
    </ItemWrapper>
  );
};
//css-style
const ItemWrapper = styled.div`
  margin: 8px 16px;
  /* width: 100%; */
  color: aliceblue;
  border: 1px solid #aaaaaa;
  padding: 8px;
  border-left: none;
  border-right: none;
  position: relative;
  cursor: pointer;
  &.active {
    border-color: #afaf4f;
    color: #afaf4f;
  }
  .operate {
    display: flex;
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    align-items: center;
    .op_item {
      margin: 0 8px;
      cursor: pointer;
    }
  }
`;
