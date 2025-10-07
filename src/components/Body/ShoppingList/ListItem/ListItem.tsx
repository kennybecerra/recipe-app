import type { AppState } from "@/store/reducers/reducers";
import React from "react";
import Icon from "./../../../UI/Icon/Icon";
import classes from "./ListItem.module.scss";

type ListItem = AppState["shoppingList"][number];

interface ListItemProps extends ListItem {
  index: number;
  handleDeleteFromShoppingList: (index: number) => void;
  handleAmountChangeInShoppingList: (
    direction: "increase" | "decrease",
    index: number
  ) => void;
}

const ListItem: React.FC<ListItemProps> = (props) => {
  return (
    <div className={classes.ListItem}>
      <div className={classes.ListItem__MeasurementContainer}>
        <div className={classes.ListItem__MeasurementContainer__Amount}>
          <p className={classes.ListItem__MeasurementContainer__Amount__Value}>
            {props.amount * props.servings}
          </p>
          <div
            className={classes.ListItem__MeasurementContainer__Amount__Buttons}
          >
            <Icon
              name="chevron-up"
              className={
                classes.ListItem__MeasurementContainer__Amount__Buttons__UpIcon
              }
              onClick={() => {
                props.handleAmountChangeInShoppingList("increase", props.index);
              }}
            />
            <Icon
              name="chevron-down"
              className={
                classes.ListItem__MeasurementContainer__Amount__Buttons__DownIcon
              }
              onClick={() => {
                props.handleAmountChangeInShoppingList("decrease", props.index);
              }}
            />
          </div>
        </div>
        <div className={classes.ListItem__MeasurementContainer__Metric}>
          <p>{props.metric}</p>
        </div>
      </div>
      <div className={classes.ListItem__TextContainer}>
        <p>{props.name}</p>
      </div>
      <div className={classes.ListItem__ButtonContainer}>
        <Icon
          className={classes.ListItem__ButtonContainer__Icon}
          name="close-outline"
          onClick={() => {
            props.handleDeleteFromShoppingList(props.index);
          }}
        />
      </div>
    </div>
  );
};

export default ListItem;
