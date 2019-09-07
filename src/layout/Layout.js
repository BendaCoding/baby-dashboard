import React, { useState } from 'react';
import { Flex } from 'rebass';
import { Switch, Route } from 'react-router-dom';
import { Nav } from './Nav';
import * as S from './styled';
import { LayoutContext } from '@@utils';
import { Needs, NeedsSidebar } from '@@screens';

export const Layout = () => {
  const [showSidebar, toggleSidebar] = useState(false);

  return (
    <LayoutContext.Provider value={{ showSidebar, toggleSidebar }}>
      <S.Container>
        <S.Sidebar id="sidebar" isOpen={showSidebar}>
          <Switch>
            <Route exact path="/" component={NeedsSidebar} />
          </Switch>
        </S.Sidebar>
        <S.Pusher
          onClick={
            showSidebar ? e => toggleSidebar(false) && e.preventDefault() : null
          }
          isOpen={showSidebar}
        >
          <S.Content>
            <Flex alignItems="center" flexDirection="column">
              <Flex mt={4} alignItems="center">
                <S.BabyAvatar />
                <S.Headline>Baby Dashboard</S.Headline>
              </Flex>
              <Nav />

              <Switch>
                <Route exact path="/" component={Needs} />
              </Switch>
            </Flex>
          </S.Content>
        </S.Pusher>
      </S.Container>
    </LayoutContext.Provider>
  );
};
