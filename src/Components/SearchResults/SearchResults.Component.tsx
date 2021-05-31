import React from 'react';
import { Link } from 'react-router-dom';

import type { IEmployee } from '../../Types/Employee.type';

import './searchResults.styles.scss';

type Props = {
	filteredResults: IEmployee[],
	resetField: React.MouseEventHandler<HTMLAnchorElement>,
}

const SearchResults:React.FC<Props> = ({ filteredResults, resetField }) => {
	return (
		<div className='search-results-container'>
			{filteredResults.length === 0
				? <span>No Results</span>
				: filteredResults.map(result => (
					<Link
						className='result'
						to={`/employee/${result.id}`}
						onClick={resetField}
					>
						{`${result?.name?.first} ${result?.name?.last}`}
					</Link>
				))
			}
		</div>
	);
}

export default SearchResults;