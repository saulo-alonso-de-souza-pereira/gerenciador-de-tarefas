import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { TaskContainer, Title, TaskFormStyled, Input, Button, Label, Select } from "./TaskFormStyles";


const TaskForm = ({ taskToEdit, onFormSubmit }) => {
  const { user, userRole } = useSelector((state) => state.auth);
  

  const [tarefa, setTarefa] = useState('');
  const [tempoDeExecucao, setTempoDeExecucao] = useState(0);
  const [tempoEstimado, setTempoEstimado] = useState(0);
  const [status, setStatus] = useState('PENDENTE'); 


  useEffect(() => {
    if (taskToEdit) {
      setTarefa(taskToEdit.tarefa);
      setTempoDeExecucao(taskToEdit.tempoDeExecucao);
      setTempoEstimado(taskToEdit.tempoEstimado);
      setStatus(taskToEdit.status);
    } else {
      setTarefa('');
      setTempoDeExecucao(0);
      setTempoEstimado(0);
      setStatus('PENDENTE');
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
        responsavel: user.displayName || "admin",
        tempoDeExecucao,
        tempoEstimado,
        status,
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
        tempoDeExecucao,
        tempoEstimado,
        status,
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
        { !taskToEdit || (userRole === 'admin') ? (
          <>
            <Label>Descrição da tarefa</Label>
              <Input
                as="textarea"
                value={tarefa}
                onChange={(e) => setTarefa(e.target.value)}
                placeholder="Tarefa"
                required
              />
          </>
        ): (null)}
        { taskToEdit ? (
          <>
            <Label>Tempo de Execução</Label>
            <Input
              type="number"
              value={tempoDeExecucao}
              onChange={(e) => setTempoDeExecucao(e.target.value)}
              placeholder="horas"
              required
            />
            <Label>Status:</Label>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="PENDENTE">Pendente</option>
              <option value="EM_EXECUCAO">Em execução</option>
              <option value="CONCLUIDA">Concluída</option>
            </Select>
          </>
        ) : (
          null
        )}
        { !taskToEdit || (userRole === 'admin') ? (
          <>
            <Label>Tempo Estimado</Label>
            <Input
              type="number"
              value={tempoEstimado}
              onChange={(e) => setTempoEstimado(e.target.value)}
              placeholder="horas"
              required
            />
          </>
        ) : (null)}
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
   