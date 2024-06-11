import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, CircularProgress, Grid } from "@mui/material";

interface GalleryProps {
  breeds: string[];
}

const Gallery: React.FC<GalleryProps> = ({ breeds }) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const allImages = await Promise.all(
        breeds.map(async (breed) => {
          const response = await axios.get(
            `https://dog.ceo/api/breed/${breed}/images`
          );
          return response.data.message;
        })
      );

      setImages(allImages.flat());
      setLoading(false);
    };

    if (breeds.length) {
      fetchImages();
    }
  }, [breeds]);

  return (
    <Box sx={{ my: 4 }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {images.map((img, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <img
                src={img}
                alt="dog"
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Gallery;
