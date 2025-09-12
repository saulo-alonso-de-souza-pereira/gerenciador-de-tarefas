import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { TaskContainer, Title, TaskFormStyled, Input, Button, Label, Select } from "./TaskFormStyles";
import { status as statusFreezer } from './shared/status';
import toast from 'react-hot-toast';


const TaskForm = ({ taskToEdit, onFormSubmit }) => {
  const { user, userRole } = useSelector((state) => state.auth);
  

  const [tarefa, setTarefa] = useState('');
  const [descricaoDaTarefa, setDescricaoDaTarefa] = useState('');
  const [tempoDeExecucao, setTempoDeExecucao] = useState(0);
  const [tempoEstimado, setTempoEstimado] = useState(0);
  const [status, setStatus] = useState(statusFreezer.PENDENTE);


  useEffect(() => {
    if (taskToEdit) {
      setTarefa(taskToEdit.tarefa);
      setTempoDeExecucao(taskToEdit.tempoDeExecucao);
      setTempoEstimado(taskToEdit.tempoEstimado);
      setStatus(taskToEdit.status);
      setDescricaoDaTarefa(taskToEdit.descricaoDaTarefa);
    } else {
      setTarefa('');
      setTempoDeExecucao(0);
      setTempoEstimado(0);
      setStatus('PENDENTE');
      setDescricaoDaTarefa('');
    }
  }, [taskToEdit]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Você precisa estar logado para adicionar uma tarefa.");
      return;
    }
    try {
      await addDoc(collection(db, "tarefas"), {
        tarefa,
        responsavel: user.displayName || "admin",
        tempoDeExecucao,
        descricaoDaTarefa,
        tempoEstimado,
        status,
        createdAt: new Date(),
        uid: user.uid
      });
      toast.success('Tarefa adicionada com sucesso!');
      onFormSubmit();
    } catch (e) {
      toast.error("Erro ao adicionar tarefa.");
      console.error("Erro ao adicionar documento: ", e);
    }
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    if (userRole !== 'admin' && taskToEdit.uid !== user.uid) {
      toast.error("Você não tem permissão para editar esta tarefa.");
      return;
    }
    try {
      const taskRef = doc(db, "tarefas", taskToEdit.id);
      await updateDoc(taskRef, {
        tarefa,
        tempoDeExecucao,
        tempoEstimado,
        descricaoDaTarefa,
        status,
      });
      toast.success('Tarefa atualizada com sucesso!');
      onFormSubmit();
    } catch (e) {
      toast.error("Erro ao atualizar a tarefa.");
      console.error("Erro ao atualizar documento: ", e);
    }
  };

  return (
    <TaskContainer>
      <Title>{taskToEdit ? "Editar Tarefa" : "Adicionar Tarefa"}</Title>
      <TaskFormStyled onSubmit={taskToEdit ? handleUpdateTask : handleAddTask}>
        { !taskToEdit || (userRole === 'admin') ? (
          <>
            <Label>Nome da tarefa</Label>
              <Input
                type='text'
                value={tarefa}
                onChange={(e) => setTarefa(e.target.value)}
                placeholder="Tarefa"
                maxLength={50}
                required
              />
            <Label>Descrição da Tarefa</Label>
              <Input
                as="textarea"
                value={descricaoDaTarefa}
                onChange={(e) => setDescricaoDaTarefa(e.target.value)}
                placeholder="Descrição da Tarefa"
                rows={4}
                maxLength={260}
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
              maxLength={2}
              required
            />
            <Label>Status:</Label>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {Object.keys(statusFreezer).map((key) => (
                <option key={key} value={key}>
                  {statusFreezer[key]}
                </option>
              ))}
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
              maxLength={2}
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
   