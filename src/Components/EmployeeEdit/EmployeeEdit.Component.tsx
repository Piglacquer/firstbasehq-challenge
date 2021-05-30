import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useInput } from '../../Hooks/useInput.hook';

import type { IEmployee } from '../../Types/Employee.type'; 

import './employeeEdit.styles.scss';

type Props = {
	person: IEmployee,
	setEditEmployee: Function,
};

type EmployeeVars = {
	id: string | number,
	payload: Payload,
};

type Payload = {
	first: string,
	last: string,
	title: string,
	email: string,
}

type EmployeeData = {
	id: string | number,
	payload: Payload,
};

const EDIT_EMPLOYEE = gql`
	mutation EditPerson($id: ID!, $payload: EditPerson) {
		editPerson(id: $id, payload: $payload) {
			id
		}
	}
`;

const EmployeeEdit:React.FC<Props> = ({ person, setEditEmployee }) => {
	const { name, picture, id, email } = person;
	const { value: firstName, setValue: setFirstName, reset: resetFirstName, bind: bindFirstName } = useInput(name?.first);
	const { value: lastName, setValue: setLastName, reset: resetLastName, bind: bindLastName } = useInput(name?.last);
	const { value: title, setValue: setTitle, reset: resetTitle, bind: bindTitle } = useInput(name?.title);
	const { value: emailAddress, setValue: setEmailAddress, reset: resetEmailAddress, bind: bindEmailAddress } = useInput(email);
	
	const payload = {
		first: firstName ? firstName : '',
		last: lastName ? lastName : '',
		title: title ? title : '',
		email: email ? email : '',
	}

	const [saveEmployee, { error, data }] = useMutation<EmployeeData, EmployeeVars>(EDIT_EMPLOYEE, {
		variables: { id: id, payload: payload }
	});
 
	// if we don't prevent default on form submit event, page reloads with setEditEmployee false (renders details page)
	// fetches employee from param on mount, so we get refreshed employee information

	return (
		<div className='employee-edit-container'>
			EMPLOYEE EDIT
			<form className='edit-form' onSubmit={() => saveEmployee()}>
				<label className='label'>Title</label>
				<input className='input' {...bindTitle}></input>
				<label className='label'>First Name</label>
				<input className='input' {...bindFirstName}></input>
				<label className='label'>Last Name</label>
				<input className='input' {...bindLastName}></input>
				<label className='label'>Email Address</label>
				<input className='input' {...bindEmailAddress}></input>
				<button type='submit' className='button save'>Save</button>
				<button type='button' className='button cancel' onClick={() => setEditEmployee(false)}>Cancel</button>
			</form>
		</div>
)};

export default EmployeeEdit;