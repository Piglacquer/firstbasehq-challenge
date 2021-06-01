import React from 'react';
import { Link } from 'react-router-dom';

import type { IEmployee } from '../../Types/Employee.type';
import './employeeCard.styles.scss';

const Employee = ({id, name, picture}: IEmployee) => (
	<Link
		className='employee-container' 
		to={`employee/${id}`}
		style={{backgroundImage:`url(${picture?.large})`}}
		data-testid='employee-card'
	>
		<h3 className='employee-name' data-testid='employee-name'>{`${name?.title} ${name?.last}`}</h3>
	</Link>
);

export default Employee;