import React from 'react';

import type { IEmployee } from '../../Types/Employee.type'; 

import './employeeEdit.styles.scss';

type Props = {
	person: IEmployee,
	setEditEmployee: Function,
}

const EmployeeEdit:React.FC<Props> = ({ person, setEditEmployee }) => {
	const { name, picture, id, email } = person;

	return (
		<div className='employee-edit-container'>
			EMPLOYEE EDIT
			<button className='button save'>Save</button>
			<button className='button cancel' onClick={() => setEditEmployee(false)}>Cancel</button>
		</div>
)};

export default EmployeeEdit;