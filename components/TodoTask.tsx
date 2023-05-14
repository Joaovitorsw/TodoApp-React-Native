import { CheckBox, Icon } from "@rneui/themed";
import React from "react";
import { Alert, Text, ToastAndroid, TouchableNativeFeedback, View } from "react-native";
import { StylesProp, Todo } from "../models/Todo";
export function TodoTask({
  styles,
  task,
  setId,
  setModal,
  setTasks,
  tasks,
}: {
  styles: StylesProp;
  task: Todo;
  setId: React.Dispatch<React.SetStateAction<number>>;
  setModal: React.Dispatch<React.SetStateAction<string>>;
  setTasks: React.Dispatch<React.SetStateAction<Todo[]>>;
  tasks: Todo[];
}) {
  const setSelection = (task: Todo) => {
    task.completed = !task.completed;
    setTasks([...tasks]);
  };

  return (
    <TouchableNativeFeedback onPress={() => setSelection(task)}>
      <View style={{ ...styles.fullWidth, ...styles.borderCard, ...styles.taskContainer }}>
        <CheckBox
          containerStyle={{ backgroundColor: "transparent" }}
          iconType="material-community"
          checkedIcon="checkbox-marked"
          uncheckedIcon="checkbox-blank-outline"
          checkedColor="green"
          checked={task.completed}
          onPress={() => setSelection(task)}
        />
        <Text
          numberOfLines={2}
          ellipsizeMode="head"
          style={task.completed ? { flex: 1, textDecorationLine: "line-through", color: "green", fontWeight: "bold" } : { flex: 1 }}
        >
          {task.value}
        </Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Icon
            onPress={() => {
              setId(task.id);
              setModal("edit");
            }}
            style={{ marginRight: 10 }}
            name="edit"
            type="material"
            color="green"
          />
          <Icon
            onPress={() => {
              Alert.alert("Remove Task", "Do you want to delete this item?", [
                {
                  text: "Cancel",
                  onPress: () => {
                    setModal("");
                  },
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: () => {
                    setModal("");
                    const removedTask = tasks.filter((taskInList) => taskInList.id !== task.id);
                    setTasks(removedTask);
                    ToastAndroid.show("You have deleted this item!", ToastAndroid.SHORT);
                  },
                },
              ]);
            }}
            name="delete"
            type="material"
            color="red"
          />
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}
