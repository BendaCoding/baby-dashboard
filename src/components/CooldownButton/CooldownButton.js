import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { useInterval } from '../../hooks';

export const CooldownButton = ({
  children,
  cooldown,
  disabled,
  onClick = () => null,
  ...rest
}) => {
  const [time, setTime] = useState(false);

  useInterval(
    () => {
      setTime(time + 100 >= cooldown ? false : time + 100);
    },
    time !== false ? 100 : null
  );

  const clickHandle = () => {
    if (!time) {
      onClick();
      setTime(0);
    }
  };

  return (
    <Button
      disabled={disabled || time !== false}
      onClick={clickHandle}
      {...rest}
      style={{ width: '160px' }}
    >
      {children}
    </Button>
  );
};
