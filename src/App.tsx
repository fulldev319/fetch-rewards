import React, { useState } from 'react';
import BreedSelector from './components/BreedSelector';
import Gallery from './components/Gallery';
import { Container, CssBaseline, Typography } from '@mui/material';

const App: React.FC = () => {
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);

  return (
    <Container>
      <CssBaseline />
      <Typography variant="h2" gutterBottom>
        Dog Gallery
      </Typography>
      <BreedSelector onSelectBreed={setSelectedBreeds} />
      <Gallery breeds={selectedBreeds} />
    </Container>
  );
};

export default App;
