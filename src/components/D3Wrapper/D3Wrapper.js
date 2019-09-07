import React, { memo, useEffect } from 'react';

export const D3Wrapper = memo(({ draw, update, className, id, ...rest }) => {
  useEffect(() => {
    draw(rest);
  });

  useEffect(() => {
    update(rest);
  }, [update, rest]);

  return <svg {...(className && { className })} {...(id && { id })} />;
});
