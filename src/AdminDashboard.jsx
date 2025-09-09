import React from 'react';
import TaskList from './TaskList'; 
import { DashboardContainer } from './DashboardStyles'; 

const AdminDashboard = () => {

  return (
    <DashboardContainer>
      <TaskList />
    </DashboardContainer>
  );
};

export default AdminDashboard;