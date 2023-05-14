import { Overlay } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { TodoAddInput } from "./components/TodoAddInput";
import { TodoTask } from "./components/TodoTask";
import { EditModal } from "./components/modal/EditModal";
import { Todo } from "./models/Todo";

export default function App() {
  const [taskValue, setTaskValue] = useState("");
  const [hasModal, setModal] = useState("");
  const [id, setId] = useState(0);
  const [tasks, setTasks] = useState<Todo[]>([]);
  const todoInput = useRef<TextInput>(null);

  return (
    <View style={styles.container}>
      {!!hasModal && (
        <Overlay
          isVisible={!!hasModal}
          overlayStyle={{ ...styles.fullWidth, ...styles.borderCard, width: "90%" }}
          onBackdropPress={() => setModal("")}
        >
          {hasModal === "edit" && <EditModal styles={styles} id={id} tasks={tasks} setModal={setModal} setTasks={setTasks} />}
        </Overlay>
      )}

      <StatusBar animated={true} backgroundColor="black" style="dark" />

      <View
        style={{
          ...styles.mainCard,
          ...styles.fullWidth,
        }}
      >
        <Text style={{ ...styles.text }}>TodoApp [React Native] </Text>

        <TodoAddInput
          setTaskValue={setTaskValue}
          setTasks={setTasks}
          tasks={tasks}
          taskValue={taskValue}
          todoInput={todoInput}
          styles={styles}
        ></TodoAddInput>

        {tasks.length > 0 && (
          <View style={{ ...styles.fullWidth, ...styles.borderCard, ...styles.tasksContainer }}>
            <ScrollView>
              {tasks.map((task) => {
                return (
                  <TodoTask
                    key={task.id}
                    styles={styles}
                    task={task}
                    setId={setId}
                    setModal={setModal}
                    setTasks={setTasks}
                    tasks={tasks}
                  ></TodoTask>
                );
              })}
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: "#437537",
    flexDirection: "column",
    padding: 10,
  },

  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  fullWidth: {
    width: "100%",
  },
  taskContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  tasksContainer: {
    marginTop: 40,
    borderStyle: "solid",
    borderWidth: 1,
    maxHeight: 580,
    marginBottom: 10,
    backgroundColor: "#ffffff5b",
  },
  mainCard: {
    marginTop: 60,
  },
  borderCard: {
    marginTop: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    padding: 15,
    shadowColor: "#000",
    borderRadius: 5,
  },
  formField: {
    backgroundColor: "#ffffff5b",
    display: "flex",
    flexDirection: "row",
  },
  input: {
    width: "75%",
    height: 42,
    position: "relative",
    left: 5,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
});
