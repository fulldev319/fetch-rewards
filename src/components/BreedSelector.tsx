import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';

interface BreedSelectorProps {
  onSelectBreed: (breeds: string[]) => void;
}

const BreedSelector: React.FC<BreedSelectorProps> = ({ onSelectBreed }) => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get('https://dog.ceo/api/breeds/list/all');
        setBreeds(Object.keys(response.data.message));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching breeds:', error);
        setLoading(false);
      }
    };

    fetchBreeds();
  }, []);

  const handleBreedClick = (breed: string) => {
    const updatedSelection = selectedBreeds.includes(breed)
      ? selectedBreeds.filter((b) => b !== breed)
      : [...selectedBreeds, breed];

    setSelectedBreeds(updatedSelection);
    onSelectBreed(updatedSelection);
  };

  return (
    <Box sx={{ my: 2 }}>
      <Typography variant="h6" gutterBottom>
        Select Dog Breeds
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {breeds.map((breed) => (
            <Grid item key={breed}>
              <Button
                variant={
                  selectedBreeds.includes(breed) ? 'contained' : 'outlined'
                }
                onClick={() => handleBreedClick(breed)}
              >
                {breed}
              </Button>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default BreedSelector;
