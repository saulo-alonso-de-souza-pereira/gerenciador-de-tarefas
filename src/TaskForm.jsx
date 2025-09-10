import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { TaskContainer, Title, TaskFormStyled, Input, Button } from "./TaskFormStyles";


const TaskForm = ({ taskToEdit, onFormSubmit }) => {
  const { user, userRole } = useSelector((state) => state.auth);
  

  const [tarefa, setTarefa] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [tempoDeExecucao, setTempoDeExecucao] = useState('');


  useEffect(() => {
    if (taskToEdit) {
      setTarefa(taskToEdit.tarefa);
      setResponsavel(taskToEdit.responsavel);
      setTempoDeExecucao(taskToEdit.tempoDeExecucao);
    } else {
      setTarefa('');
      setResponsavel('');
      setTempoDeExecucao('');
    }
  }, [taskToEdit]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Você precisa estar logado para adicionar uma tarefa.");
      return;
    }
    try {
      await addDoc(collection(db, "tarefas"), {
        tarefa,
        responsavel,
        tempoDeExecucao,
        createdAt: new Date(),
        uid: user.uid
      });
      alert('Tarefa adicionada com sucesso!');
      onFormSubmit();
    } catch (e) {
      console.error("Erro ao adicionar documento: ", e);
    }
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    if (userRole !== 'admin' && taskToEdit.uid !== user.uid) {
      alert("Você não tem permissão para editar esta tarefa.");
      return;
    }
    try {
      const taskRef = doc(db, "tarefas", taskToEdit.id);
      await updateDoc(taskRef, {
        tarefa,
        responsavel,
        tempoDeExecucao,
      });
      alert('Tarefa atualizada com sucesso!');
      onFormSubmit();
    } catch (e) {
      console.error("Erro ao atualizar documento: ", e);
    }
  };

  return (
    <TaskContainer>
      <Title>{taskToEdit ? "Editar Tarefa" : "Adicionar Tarefa"}</Title>
      <TaskFormStyled onSubmit={taskToEdit ? handleUpdateTask : handleAddTask}>
        <Input
          as="textarea"
          value={tarefa}
          onChange={(e) => setTarefa(e.target.value)}
          placeholder="Tarefa"
          required
        /><br />
        <Input
          type="text"
          value={responsavel}
          onChange={(e) => setResponsavel(e.target.value)}
          placeholder="Responsável"
          required
        /><br />
        <Input
          type="text"
          value={tempoDeExecucao}
          onChange={(e) => setTempoDeExecucao(e.target.value)}
          placeholder="Tempo de Execução"
          required
        />
        {taskToEdit ? (
          userRole === 'admin' || taskToEdit.uid === user.uid ? (
            <Button type="submit">Salvar Edição</Button>
          ) : null
        ) : (
          <Button type="submit">Adicionar Tarefa</Button>
        )}
      </TaskFormStyled>
    </TaskContainer>
  );
};

export default TaskForm;
   