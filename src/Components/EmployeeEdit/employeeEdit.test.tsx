import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';
import EmployeeEdit, { Props, EDIT_EMPLOYEE } from './EmployeeEdit.Component';

const props:Props = {
	person: {
		id: '1',
		name: {
			title: 'mr.',
			last: 'hello',
			first: 'no'
		},
		picture: {
			large: 'url',
		},
		email: 'email'
	},
	setEditEmployee: () => null,
	refetchEmployee: () => null,
};

const mocks = [
	{
	request: {
		query: EDIT_EMPLOYEE,
		variables: { 
			id: '1', 
			payload: {
				first: props?.person?.name?.first,
				last: props?.person?.name?.last,
				title: props?.person?.name?.title,
				email: props?.person?.email
		}}
	},
	result: {
		data: {
			person: {
				id: '1'
			}
		}
	}
}];

const WrappedComponent = (props:Props) => (
	<MockedProvider mocks={mocks}>
		<EmployeeEdit {...props} />
	</MockedProvider>
);

describe('EmployeeCard', () => {
	it('should render without error', () => {
		render(WrappedComponent(props));

		const card = screen.getByTestId('employee-edit-container');
		expect(card).toBeDefined();
	});
});