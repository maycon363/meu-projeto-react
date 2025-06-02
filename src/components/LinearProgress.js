// src/components/LinearProgressScroll.js
import React, { useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

const LinearProgressScroll = () => {
  const [progress, setProgress] = useState(0);

  const calcularProgresso = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progresso = (scrollTop / docHeight) * 100;
    setProgress(progresso);
  };

  useEffect(() => {
    window.addEventListener('scroll', calcularProgresso);
    return () => window.removeEventListener('scroll', calcularProgresso);
  }, []);

return (
  <Box sx={{ width: '100%', position: 'fixed', top: 0, left: 0, zIndex: 1300 }}>
    <LinearProgress
      color="error"
      variant="determinate"
      value={progress}
      sx={{ height: '10px' }} 
    />
  </Box>
);
};

export default LinearProgressScroll;
