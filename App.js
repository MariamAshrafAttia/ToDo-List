import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  // Function to add a new task
  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, { id: Date.now().toString(), text: task, completed: false }]);
      setTask('');
    }
  };

  // Function to toggle task completion
  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Function to delete completed tasks
  const deleteCompletedTasks = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>

      {/* Input Field */}
      <TextInput
        style={styles.input}
        placeholder="I.e., go to cpp course"
        value={task}
        onChangeText={setTask}
      />

      {/* Buttons: Add & Delete Completed in One Line */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.buttonText}>ADD GOAL</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.deleteButton} onPress={deleteCompletedTasks}>
          <Text style={styles.buttonText}>DELETE COMPLETED</Text>
        </TouchableOpacity>
      </View>

      {/* Task List with Checkboxes */}
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Checkbox
              value={item.completed}
              onValueChange={() => toggleTaskCompletion(item.id)}
            />
            <Text style={[styles.taskText, item.completed && styles.completedText]}>
              {item.text}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

// Styling for UI components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#4A154B',
    padding: 15,
    textAlign: 'center',
    marginBottom: 10,
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButton: {
    backgroundColor: '#4A154B', // Darker purple
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: '#8B0000', // Dark red for delete
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#555',
    fontWeight: 'bold',
  },
  taskText: {
    marginLeft: 10,
    color: 'Black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#bbb',
  },
});
