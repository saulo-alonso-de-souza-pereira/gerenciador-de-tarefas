import React from 'react';

import { DashboardContainer } from './DashboardStyles';

import TaskList from './TaskList';

const UserDashboard = () => {
  return (
    <DashboardContainer>
      <div style={{ marginTop: '60px' }}> </div>
      <TaskList />
    </DashboardContainer>
  );
};

export default UserDashboard;