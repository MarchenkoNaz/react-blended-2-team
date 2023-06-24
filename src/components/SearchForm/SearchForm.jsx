
import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';
import { useState } from 'react';

export const SearchForm = ({ onSubmit }) => {
	const [query, setQuery] = useState('')

	const handleChange = ({ target: { value } }) => {
		setQuery(value.toLowerCase())
	}

	const formSubmit = (e) => {
		e.preventDefault()
		onSubmit(query)
		setQuery('')
	}
	return <SearchFormStyled onSubmit={formSubmit}>
		<InputSearch value={query} onChange={handleChange} />
		<FormBtn><FiSearch /></FormBtn>
	</SearchFormStyled>
}
