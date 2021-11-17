import React from 'react';

// получение размеров экрана
function useWindowSize() {
  const [size, setSize] = React.useState([0, 0]);

  function updateSize() {
    setSize([window.innerWidth, window.innerHeight]);
  }

  React.useLayoutEffect(() => {
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return size;
}

export default useWindowSize;
