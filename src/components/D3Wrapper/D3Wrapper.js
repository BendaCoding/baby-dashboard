import React, { memo, useEffect } from 'react';

export const D3Wrapper = memo(({ draw, className, id, ...rest }) => {
  useEffect(() => {
    draw(rest);
  }, [draw, rest]);

  return <div {...(className && { className })} {...(id && { id })} />;
});
