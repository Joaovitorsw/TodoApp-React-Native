import React from "react";
import { Button, TextInput, ToastAndroid, View } from "react-native";

export function TodoAddInput({ setTaskValue, setTasks, tasks, taskValue, todoInput, styles }) {
  const onChangeText = (text) => {
    setTaskValue(text);
  };
  const onPress = () => {
    if (taskValue === "") {
      ToastAndroid.show("Please, write a task!", ToastAndroid.SHORT);
      return;
    }
    const newTask = {
      id: Math.random(),
      value: taskValue,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTaskValue("");
    todoInput?.current?.clear();
  };
  return (
    <View style={{ ...styles.fullWidth, ...styles.borderCard, ...styles.formField }}>
      <TextInput
        placeholder="Write your task"
        ref={todoInput}
        style={styles.input}
        clearButtonMode="always"
        value={taskValue}
        onChangeText={onChangeText}
      />
      <Button title={"Add Task"} onPress={onPress} color={"green"}></Button>
    </View>
  );
}
