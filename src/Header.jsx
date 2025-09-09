import React from 'react';
import { useSelector } from 'react-redux';
import { HeaderContainer, Title, UserSection, UserInfo } from './HeaderStyles';

import LogoutButton from './logoutButton';

const Header = () => {
  const { user, userRole } = useSelector((state) => state.auth);

  return (
    <HeaderContainer>
      <Title>Gerenciador de Tarefas</Title>
      <UserSection>
        {user ? (
          <>
            <UserInfo>
              {user.displayName} ({userRole})
            </UserInfo>
            <LogoutButton />
          </>
        ) : null}
      </UserSection>
    </HeaderContainer>
  );
};

export default Header;