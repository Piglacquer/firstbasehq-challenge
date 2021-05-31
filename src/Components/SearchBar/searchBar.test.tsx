import { render, screen, fireEvent, getByTestId, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import { GET_EMPLOYEES } from './SearchBar.Component';
import SearchBar from './SearchBar.Component';

const mocks = [
	{
	request: {
		query: GET_EMPLOYEES,
	},
	result: {
		data: {
			people: [
				{
					name: {
						first: 'sam',
						last: 'gamgee'
					},
					id: '1'
				},
			]
		}
	}
}];

const WrappedComponent = (
	<MockedProvider mocks={mocks}>
		<SearchBar />
	</MockedProvider>
);

describe('SearchBar', () => {

	it('should render without error', () => {
		render(WrappedComponent);
		const searchInput = screen.getByTestId('search-input');
		expect(searchInput).toHaveProperty('value');
		expect(searchInput).toHaveValue('');
	});

	it('should render SearchResults when focused', () => {
		render(WrappedComponent);
	
		const searchInput = screen.getByTestId('search-input');
		userEvent.click(searchInput);
	
		const searchResults = screen.getByTestId('results-container');
		expect(searchResults).toBeDefined();
	});

	it('should render the search text when a user types in the search bar', async () => {
		render(WrappedComponent);

		const searchInput = screen.getByTestId('search-input');
		userEvent.type(searchInput, 'a');

		expect(searchInput).toHaveValue('a');
	});
});

