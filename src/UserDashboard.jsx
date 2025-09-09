import React from 'react';

import { DashboardContainer } from './DashboardStyles';

import TaskList from './TaskList';

const UserDashboard = () => {
  return (
    <DashboardContainer>
      <TaskList />
    </DashboardContainer>
  );
};

export default UserDashboard;