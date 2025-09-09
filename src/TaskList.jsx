import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faUser, faClock } from '@fortawesome/free-solid-svg-icons'; // Importe os ícones adicionais

import TaskForm from './TaskForm';
import CustomModal from './CustomModal';

import {
  TaskListContainer,
  TaskGrid, 
  TaskCard,
  CardGradientBorder,
  CardContent,
  TaskTitle,
  TaskText,
  TaskActions,
  ActionButton,
} from './TaskListStyles';

import { Button, Title} from './LoginStyles';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const { userRole } = useSelector((state) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'tarefas'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(tasksArray);
    });
    return () => unsubscribe();
  }, []);

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };
  
  const handleAddNewTask = () => {
    setTaskToEdit(null); 
    setIsModalOpen(true);
  };

  const handleFormSubmit = () => {
    setIsModalOpen(false);
    setTaskToEdit(null);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      if (userRole === 'admin') {
        await deleteDoc(doc(db, "tarefas", taskId));
        alert("Tarefa excluída com sucesso!");
      } else {
        alert("Apenas administradores podem excluir tarefas.");
      }
    } catch (e) {
      console.error("Erro ao excluir documento: ", e);
    }
  };

  return (
    <TaskListContainer>
      <Button onClick={handleAddNewTask}>Nova Tarefa</Button>

      <Title>Lista de Tarefas</Title>
      {tasks.length > 0 ? (
        <TaskGrid> 
          {tasks.map((task) => (
            <TaskCard key={task.id}> 
              <CardGradientBorder /> 
              <CardContent>
                <TaskTitle>{task.tarefa}</TaskTitle>
                <TaskText><FontAwesomeIcon icon={faUser} /> {task.responsavel}</TaskText>
                <TaskText><FontAwesomeIcon icon={faClock} /> {task.tempoDeExecucao}</TaskText>
              </CardContent>

              {userRole === 'admin' && (
                <TaskActions>
                  <ActionButton onClick={() => handleEditTask(task)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </ActionButton>
                  <ActionButton onClick={() => handleDeleteTask(task.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </ActionButton>
                </TaskActions>
              )}
            </TaskCard>
          ))}
        </TaskGrid>
      ) : (
        <p>Nenhuma tarefa cadastrada.</p>
      )}

      <CustomModal isOpen={isModalOpen} onRequestClose={handleFormSubmit}>
        <TaskForm
          taskToEdit={taskToEdit}
          onFormSubmit={handleFormSubmit}
        />
      </CustomModal>
    </TaskListContainer>
  );
};

export default TaskList;