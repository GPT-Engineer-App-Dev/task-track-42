import { useState } from 'react';
import { Box, Button, Container, Input, List, ListItem, Text, VStack, IconButton, useToast } from '@chakra-ui/react';
import { FaTrash, FaEdit, FaSave, FaPlus } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isEditing: false }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isEditing: true } : task));
  };

  const saveTask = (id, newText) => {
    if (newText.trim() === '') {
      toast({
        title: 'No task entered',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks(tasks.map(task => task.id === id ? { ...task, text: newText, isEditing: false } : task));
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">Todo App</Text>
        <Box display="flex" w="100%">
          <Input placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)} />
          <IconButton icon={<FaPlus />} onClick={addTask} colorScheme="green" aria-label="Add task" ml={2} />
        </Box>
        <List w="100%">
          {tasks.map(task => (
            <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center" p={2} boxShadow="md">
              {task.isEditing ? (
                <Input defaultValue={task.text} onChange={(e) => saveTask(task.id, e.target.value)} />
              ) : (
                <Text>{task.text}</Text>
              )}
              <Box>
                {task.isEditing ? (
                  <IconButton icon={<FaSave />} onClick={() => saveTask(task.id, task.text)} colorScheme="green" aria-label="Save task" />
                ) : (
                  <IconButton icon={<FaEdit />} onClick={() => editTask(task.id)} colorScheme="yellow" aria-label="Edit task" />
                )}
                <IconButton icon={<FaTrash />} onClick={() => deleteTask(task.id)} colorScheme="red" aria-label="Delete task" ml={2} />
              </Box>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;