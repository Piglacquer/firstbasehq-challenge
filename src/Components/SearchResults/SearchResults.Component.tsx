import React from 'react';
import { Link } from 'react-router-dom';

import type { IEmployee } from '../../Types';

import './searchResults.styles.scss';

export type SearchResultsProps = {
	filteredResults: IEmployee[],
	resetField: React.MouseEventHandler<HTMLAnchorElement>,
}

const SearchResults:React.FC<SearchResultsProps> = ({ filteredResults, resetField }) => {
	return (
		<div className='search-results-container' data-testid='results-container'>
			{filteredResults.length === 0
				? <span className='result' data-testid='no-results'>No Results</span>
				: filteredResults.map(result => (
					<Link
						key={result.id}
						className='result'
						to={`/employee/${result.id}`}
						onClick={resetField}
						data-testid='result'
					>
						{`${result?.name?.first} ${result?.name?.last}`}
					</Link>
				))
			}
		</div>
	);
}

export default SearchResults;