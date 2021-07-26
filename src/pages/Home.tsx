import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { project } from '../../react-native.config';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks([...tasks, newTask])
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
    const newListTasks = tasks.filter(task => task.id !== id)
    setTasks(newListTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
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