import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

import type { IEmployee } from '../../Types/Employee.type';
import { useInput } from '../../Hooks/useInput.hook';
import SearchResults from '../SearchResults/SearchResults.Component';

import './seachBar.styles.scss';

type Employees = {
	people: IEmployee[],
}

const GET_EMPLOYEES = gql`
	query GetEmployees {
		people {
			id,
			name { first, last },
		}
	}
`;

const SearchBar:React.FC = () => {
	const [ filteredResults, setFilteredResults ] = useState<IEmployee[]>([]);
	const [ showResults, setShowResults ] = useState<Boolean>(false);
	const { value: searchValue, reset: searchReset, bind: searchBind } = useInput('');
	const { data } = useQuery<Employees>(GET_EMPLOYEES);

	const resetField = () => {
		searchReset();
		setShowResults(false);
	};

	useEffect(() => {
		if (data && searchValue !== '') {
			const filteredResults = data.people.filter(person => {
				return `${person?.name?.first} ${person?.name?.last}`.toLowerCase().includes(searchValue.toLowerCase());
			})
			setFilteredResults(filteredResults);
		}
	}, [data, searchValue]);

	return (
		<div className='search-bar' onFocus={() => setShowResults(true)}>
			<input className='search-input' {...searchBind} />
			{showResults && <SearchResults filteredResults={filteredResults} resetField={resetField} />}
		</div>
)};

export default SearchBar;