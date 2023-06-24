import { Component, useEffect, useState } from 'react';
import { getNormalizedImages } from '../helpers/normalize-imges';
import { getImages } from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';
import { Modal } from 'components/Modal/Modal';

export const Gallery = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [alt, setAlt] = useState('');

  useEffect(() => {
    if (!query) {
      return;
    }
    (async () => {
      try {
        const {
          data: { photos, total_results },
        } = await getImages(query, page);

        setPhotos(prev => [...prev, ...getNormalizedImages(photos)]);
        setShowButton(page < Math.ceil(total_results / 15));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [query, page]);

  const handleClick = evt => {
    setPage(prev => prev + 1);
  };
  const onSubmit = query => {
    setQuery(query);
    setPhotos([]);
    setPage(1);
  };

  const onImageClick = (alt, largeImage) => {
    setAlt(alt);
    setLargeImage(largeImage);
    setShowModal(true);
  };

  return (
    <>
      <SearchForm onSubmit={onSubmit} />
      {photos.length === 0 && (
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      )}
      {photos.length !== 0 && (
        <Grid>
          {photos.map(({ alt, medium, large, avg_color, id }) => (
            <GridItem key={id}>
              <CardItem color={avg_color}>
                <img
                  onClick={() => onImageClick(alt, large)}
                  src={medium}
                  alt={alt}
                />
              </CardItem>
            </GridItem>
          ))}
        </Grid>
      )}
      {showButton && <Button onClick={handleClick}>Load more</Button>}
      {showModal && (
        <Modal
          onclose={() => {
            setShowModal(false);
          }}
        >
          <img src={largeImage} alt={alt} width="500" height="600" />
        </Modal>
      )}
    </>
  );
};
