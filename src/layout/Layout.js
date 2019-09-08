import React, { useState, useContext } from 'react';
import { Flex } from 'rebass';
import { Switch, Route } from 'react-router-dom';
import { Nav } from './Nav';
import * as S from './styled';
import { LayoutContext, GameSettingsContext } from '@@utils';
import { Needs, NeedsSidebar, Highscore } from '@@screens';
import { DIFFICULTIES } from '@@constants';
import { __RouterContext } from 'react-router-dom';
import { animated, useTransition } from 'react-spring';

export const Layout = () => {
  const { location } = useContext(__RouterContext);
  const transitions = useTransition(location, location => location.pathname, {
    initial: { transform: 'translateX(0)' },
    from: {
      opacity: 0,
      transform: `translateX(${location.pathname === '/' ? '-70%' : '70%'})`
    },
    enter: { opacity: 1, transform: 'translateX(0)' },
    leave: {
      opacity: 0,
      transform: `translateX(${location.pathname === '/' ? '70%' : '-70%'})`
    }
  });

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

                <S.RouteContainer>
                  {transitions.map(({ item, props, key }) => (
                    <S.AnimatedRoute style={props} key={key}>
                      <Switch location={item}>
                        <Route exact path="/" component={Needs} />
                        <Route path="/highscore" component={Highscore} />
                      </Switch>
                    </S.AnimatedRoute>
                  ))}
                </S.RouteContainer>
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
