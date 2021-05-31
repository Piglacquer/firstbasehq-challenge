import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import SearchResults, { SearchResultsProps } from './SearchResults.Component';

const props:SearchResultsProps = {
	filteredResults: [
		{
			id: '1',
			name: {
				first: 'sam',
				last: 'gamgee',
			},
		}
	],
	resetField: () => null
}; 

const WrappedComponent = (props:SearchResultsProps) => (
	<BrowserRouter>
		<SearchResults {...props} />
	</BrowserRouter>
)

describe('SearchResults', () => {

	it('should render without error', () => {
		render(WrappedComponent(props));
		const searchResults = screen.getByTestId('results-container');
		expect(searchResults).toBeInTheDocument();
	});

	it('should render Link for each person in filteredResults', () => {
		render(WrappedComponent(props));

		const link = screen.getByTestId('result');
		expect(link.firstChild).toHaveTextContent('sam gamgee');
	
	});

	it('should render "No Results" if no filteredResults are passed', async () => {
		render(WrappedComponent({...props, filteredResults: []}));
		const searchResults = screen.getByTestId('no-results');
		expect(searchResults).toHaveTextContent('No Results');
	});
});

