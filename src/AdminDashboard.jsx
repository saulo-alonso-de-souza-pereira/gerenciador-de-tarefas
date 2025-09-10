import React from 'react';
import TaskList from './TaskList'; 
import { DashboardContainer } from './DashboardStyles'; 

const AdminDashboard = () => {

  return (
    <DashboardContainer>
      <div style={{ marginTop: '60px' }}> </div>
      <TaskList />
    </DashboardContainer>
  );
};

export default AdminDashboard;