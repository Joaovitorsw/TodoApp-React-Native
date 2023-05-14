import { CheckBox } from "@rneui/base";
import React, { useRef, useState } from "react";
import { Button, StyleProp, Text, TextInput, TextStyle, ToastAndroid, View } from "react-native";
import { StylesProp, Todo } from "../../App";

export function EditModal({
  id,
  tasks,
  styles,
  setModal,
  setTasks,
}: {
  styles: StylesProp;
  id: number;
  tasks: Todo[];
  setModal: React.Dispatch<React.SetStateAction<string>>;
  setTasks: React.Dispatch<React.SetStateAction<Todo[]>>;
}) {
  const task = tasks.find((task) => task.id === id);
  const editInput = useRef<TextInput>(null);
  const [textValue, setTextValue] = useState<string>(task?.value ?? "");
  const [checkBoxValue, setCheckBoxValue] = useState<boolean>(task?.completed ?? false);
  const completedStyle: StyleProp<TextStyle> = checkBoxValue
    ? { textDecorationLine: "line-through", color: "green", fontWeight: "bold" }
    : { color: "black", fontWeight: "400" };
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Text>Edit Task</Text>
      <View
        style={{
          ...styles.fullWidth,
          ...{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
          },
        }}
      >
        <CheckBox
          containerStyle={{ backgroundColor: "transparent" }}
          iconType="material-community"
          checkedIcon="checkbox-marked"
          uncheckedIcon="checkbox-blank-outline"
          checkedColor="green"
          checked={checkBoxValue}
          onPress={() => {
            setCheckBoxValue(!checkBoxValue);
          }}
        />
        <TextInput
          ref={editInput}
          value={textValue}
          onChangeText={(text) => setTextValue(text)}
          style={{
            ...styles.input,
            width: "100%",
            maxWidth: 172,
            height: 35,
            ...completedStyle,
          }}
        />
        <Button
          title={"Edit Task"}
          color={"green"}
          onPress={() => {
            if (task) {
              task.value = textValue;
              task.completed = checkBoxValue;
            }
            setTasks([...tasks]);
            setModal("");
            ToastAndroid.show("You have edit this item!", ToastAndroid.SHORT);
          }}
        ></Button>
      </View>
    </View>
  );
}
