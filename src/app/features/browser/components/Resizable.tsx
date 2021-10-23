import React from 'react';
import ResizingPane from 'react-resizing-pane';

const NotResizable = ({
  children,
  style,
}: React.PropsWithChildren<{ style?: any }>) => {
  return <div style={style}>{children}</div>;
};

const Resizable = (isBigScreen: boolean) =>
  isBigScreen ? ResizingPane : NotResizable;

export default Resizable;
