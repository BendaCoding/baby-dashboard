import React, { useState } from 'react';
import { Flex } from 'rebass';
import { Switch, Route } from 'react-router-dom';
import { Nav } from './Nav';
import * as S from './styled';
import { LayoutContext, GameSettingsContext } from '@@utils';
import { Needs, NeedsSidebar } from '@@screens';
import { DIFFICULTIES } from '@@constants';

export const Layout = () => {
  const [showSidebar, toggleSidebar] = useState(false);
  const [gameSettings, setGameSettings] = useState({
    difficulty: DIFFICULTIES.MEDIUM
  });

  return (
    <LayoutContext.Provider value={[showSidebar, toggleSidebar]}>
      <GameSettingsContext.Provider value={[gameSettings, setGameSettings]}>
        <S.Container>
          <S.Pusher
            onClick={
              showSidebar
                ? e => toggleSidebar(false) && e.preventDefault()
                : null
            }
            isOpen={showSidebar}
          >
            <S.Content>
              <Flex alignItems="center" flexDirection="column">
                <Flex mt={4} alignItems="center">
                  <S.BabyAvatar />
                  <div>
                    <S.Headline>Baby Dashboard</S.Headline>
                    <Nav />
                  </div>
                </Flex>

                <Switch>
                  <Route exact path="/" component={Needs} />
                </Switch>
              </Flex>
            </S.Content>
          </S.Pusher>
          <S.Sidebar id="sidebar" isOpen={showSidebar}>
            <Switch>
              <Route exact path="/" component={NeedsSidebar} />
            </Switch>
          </S.Sidebar>
        </S.Container>
      </GameSettingsContext.Provider>
    </LayoutContext.Provider>
  );
};
