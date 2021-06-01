import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EmployeeCard from './EmployeeCard.Component';

import type { IEmployee } from '../../Types';

const props:IEmployee = {
	id: '1',
	name: {
		title: 'mr.',
		last: 'hello',
	},
	picture: {
		large: 'url',
	}
};

const WrappedComponent = (props:IEmployee) => (
	<BrowserRouter>
		<EmployeeCard {...props} />
	</BrowserRouter>
);

describe('EmployeeCard', () => {
	it('should render without error', () => {
		render(WrappedComponent(props));

		const card = screen.getByTestId('employee-card');
		expect(card).toBeDefined();
	});

	it('should display the employees name', () => {
		render(WrappedComponent(props));

		const name = screen.getByTestId('employee-name');
		expect(name.firstChild).toHaveTextContent('mr. hello');
	});

	it('should render without a title', () => {
		const setupProps = {...props, title: undefined};
		render(WrappedComponent(setupProps));

		const name = screen.getByTestId('employee-name');
		expect(name.firstChild).toHaveTextContent('hello');
	})
})