import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faUser, faClock, faEye } from '@fortawesome/free-solid-svg-icons';
import {status} from './shared/status';
import toast from 'react-hot-toast';

import TaskView from './TaskView';
import TaskForm from './TaskForm';
import ConfirmTaskDelete from './ConfirmTaskDelete';
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
  StyledIcon,
} from './TaskListStyles';

import { Button, Title} from './LoginStyles';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const { userRole, user } = useSelector((state) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [taskToView, setTaskToView] = useState(null);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);

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

  const handleViewTask = (task) => {
    setTaskToView(task);
    setIsViewModalOpen(true);
  }

  const handleDeleteTaskConfirm = (taskId) => {
    setTaskIdToDelete(taskId);
    setIsDeleteModalOpen(true);
  }

  const handleCancelDelete = () => {
    setTaskIdToDelete(null);
    setIsDeleteModalOpen(false);
  }

  const handleDelete = async () => {
    
    setIsDeleteModalOpen(false);
    if (!taskIdToDelete) return;

    try {
      await deleteDoc(doc(db, "tarefas", taskIdToDelete));
      toast.success("Tarefa excluída com sucesso!");
    } catch (e) {
      console.error("Erro ao excluir documento: ", e);
      toast.error("Erro: Você não tem permissão para excluir esta tarefa.");
    } finally {
      setTaskIdToDelete(null);
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
                <TaskText><em>{status[task.status]}</em></TaskText>
                <TaskTitle>{task.tarefa}</TaskTitle>
                <TaskText><StyledIcon icon={faUser}/>{task.responsavel}</TaskText>
                <TaskText><StyledIcon icon={faClock}/>{task.tempoDeExecucao}h / {task.tempoEstimado}h</TaskText>
              </CardContent>
              
              <TaskActions>
                <ActionButton onClick={() => handleViewTask(task)}>
                  <FontAwesomeIcon icon={faEye} />
                </ActionButton>
                {(userRole === 'admin' || task.uid === user.uid) && (
                  <ActionButton onClick={() => handleEditTask(task)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </ActionButton>
                )}
                {userRole === 'admin' && (
                    <ActionButton onClick={() => handleDeleteTaskConfirm(task.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </ActionButton>
                )}
              </TaskActions>
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
      <CustomModal isOpen={isViewModalOpen} onRequestClose={() => setIsViewModalOpen(false)}>
        <TaskView
          taskToView={taskToView}
        />
      </CustomModal>
      <CustomModal isOpen={isDeleteModalOpen} onRequestClose={handleCancelDelete}>
        <ConfirmTaskDelete
          onConfirm={handleDelete}
          onCancel={handleCancelDelete}
        />
      </CustomModal>
    </TaskListContainer>
  );
};

export default TaskList;