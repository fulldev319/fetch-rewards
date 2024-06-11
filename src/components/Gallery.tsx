import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import './Gallery.css';

interface GalleryProps {
  breeds: string[];
}

const Gallery: React.FC<GalleryProps> = ({ breeds }) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (breeds.length === 0) {
      setImages([]);
      return;
    }

    const fetchImages = async () => {
      setLoading(true);
      try {
        const allImages = await Promise.all(
          breeds.map(async (breed) => {
            const response = await axios.get(
              `https://dog.ceo/api/breed/${breed}/images`,
            );
            return response.data.message;
          }),
        );

        setImages(allImages.flat().reverse());
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [breeds]);

  return (
    <Box sx={{ my: 4 }}>
      {loading ? (
        <CircularProgress />
      ) : images.length > 0 ? (
        <Grid container spacing={2} className="gallery">
          {images.map((img, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <div className="gallery-item">
                <img src={img} alt="dog" className="gallery-img" />
              </div>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">No images to display</Typography>
      )}
    </Box>
  );
};

export default Gallery;
