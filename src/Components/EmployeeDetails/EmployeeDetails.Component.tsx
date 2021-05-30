import React from 'react';

import type { IEmployee } from '../../Types/Employee.type';

import './employeeDetails.styles.scss';

type Props = {
	person: IEmployee
	setEditEmployee: Function,
}

const EmployeeDetails:React.FC<Props> = ({ person, setEditEmployee }) => {
	const { name, picture, email } = person;

	return (
	<div className='employee-details-container'>
		<h1 className='employee-name'>{`${name?.title} ${name?.first} ${name?.last}`}</h1>
		<img className='employee-image' src={person?.picture?.large} />
		<span className='employee-email'>{`Email Address: ${email}`}</span>
		<button className='button edit' onClick={() => setEditEmployee(true)}>Edit</button>
	</div>
)};

export default EmployeeDetails;