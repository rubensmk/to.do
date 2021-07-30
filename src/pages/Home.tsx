import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';


export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
}
export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    const sameNameTask = tasks.find(task => task.title === newTaskTitle);

    if (sameNameTask) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
      return;
    } else {
      setTasks([...tasks, newTask])
    }
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(item => ({ ...item }))
    const foundTask = updatedTasks.find(task => task.id === id)

    if (!foundTask) {
      return
    }
    foundTask.done = !foundTask.done
    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {

    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim", onPress: () => {
            const newListTasks = tasks.filter(task => task.id !== id)
            setTasks(newListTasks)
          }
        }
      ],
      {
        cancelable: true
      }
    );
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs) {
    const updatedTasks = tasks.map(item => ({ ...item }))
    const taskToBeUpdated = updatedTasks.find(task => task.id === taskId)

    if (!taskToBeUpdated) {
      return
    }
    taskToBeUpdated.title = taskNewTitle
    setTasks(updatedTasks)
  }
  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})