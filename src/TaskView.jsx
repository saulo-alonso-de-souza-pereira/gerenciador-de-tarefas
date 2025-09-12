import React from "react";
import { TaskViewContainer, TaskViewTitle } from './TaskViewStyles';
import { TaskText } from './TaskListStyles';
import { status as statusFreezer } from './shared/status';


const TaskView = ({ taskToView }) => {
    return (
        <TaskViewContainer>
            <TaskViewTitle>{taskToView.tarefa}</TaskViewTitle>
            <p><strong>Descrição:</strong></p>
            <TaskText>{taskToView.descricaoDaTarefa}</TaskText>
            <br />
            <TaskText><strong>Responsável:</strong> {taskToView.responsavel}</TaskText>
            <TaskText><strong>Tempo de Execução:</strong> {taskToView.tempoDeExecucao}h</TaskText>
            <TaskText><strong>Tempo Estimado:</strong> {taskToView.tempoEstimado}h</TaskText>
            <TaskText><strong>Status:</strong><em>{statusFreezer[taskToView.status]}</em></TaskText>
        </TaskViewContainer>
    );
}

export default TaskView;