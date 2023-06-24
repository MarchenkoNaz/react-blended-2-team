import { Component, useEffect, useState } from 'react';

import { getImages } from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export const Gallery = () => {
	const [query, setQuery] = useState('');
	const [page, setPage] = useState(1);
	const [photos, setPhotos] = useState([])
	const [showButton, setShowButton] = useState(false)

	useEffect(() => {
		if (!query) { return }
		(async () => {
			try {
				const { data: { photos, total_results } } = await getImages(query, page)

				setPhotos(prev => [...prev, ...photos])
				setShowButton(page < Math.ceil(total_results / 15))
			}
			catch (error) { console.log(error); }
		})()
	}, [query])

	const onSubmit = (query) => {
		setQuery(query)
	}
	return (
		<>
			<SearchForm onSubmit={onSubmit} />
			<Text textAlign="center">Sorry. There are no images ... 😭</Text>
		</>
	);

}
