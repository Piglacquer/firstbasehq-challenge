import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useInput } from '../../Hooks/useInput.hook';

import type { IEmployee } from '../../Types/Employee.type'; 

import './employeeEdit.styles.scss';

export type Props = {
	person: IEmployee,
	setEditEmployee: Function,
	refetchEmployee: Function,
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

export const EDIT_EMPLOYEE = gql`
	mutation EditPerson($id: ID!, $payload: EditPerson) {
		editPerson(id: $id, payload: $payload) {
			id
		}
	}
`;

const EmployeeEdit:React.FC<Props> = ({ person, setEditEmployee, refetchEmployee }) => {
	const { name, picture, id, email } = person;
	const { value: firstName, bind: bindFirstName } = useInput(name?.first);
	const { value: lastName, bind: bindLastName } = useInput(name?.last);
	const { value: title, bind: bindTitle } = useInput(name?.title);
	const { value: emailAddress, bind: bindEmailAddress } = useInput(email);
	
	const payload = {
		first: firstName ? firstName : '',
		last: lastName ? lastName : '',
		title: title ? title : '',
		email: emailAddress ? emailAddress : '',
	}

	const [saveEmployee] = useMutation<EmployeeData, EmployeeVars>(EDIT_EMPLOYEE, {
		variables: { id: id, payload: payload }
	});
	

	const submitHandler = (event:React.FormEvent<HTMLFormElement>):void => {
		event.preventDefault();
		saveEmployee()
			.then(() => refetchEmployee())
			.then(() => setEditEmployee(false));
	};

	return (
		<div className='employee-edit-container' data-testid='employee-edit-container'>
			<h1 className='title'>{`Edit: ${title} ${firstName} ${lastName}`}</h1>
			<img className='employee-image' src={picture?.large} alt='human-with-some-hair' />
			<form className='edit-form' onSubmit={(event) => submitHandler(event)}>
				<div className='input-container'>
					<label className='label'>Title</label>
					<input className='input' {...bindTitle} data-testid='title-edit'></input>
				</div>
				<div className='input-container'>
					<label className='label'>First Name</label>
					<input className='input' {...bindFirstName}></input>
				</div>
				<div className='input-container'>
					<label className='label'>Last Name</label>
					<input className='input' {...bindLastName}></input>
				</div>
				<div className='input-container'>
					<label className='label'>Email Address</label>
					<input className='input' {...bindEmailAddress}></input>
				</div>
				<button type='submit' className='button save'>Save</button>
				<button type='button' className='button cancel' onClick={() => setEditEmployee(false)}>Cancel</button>
			</form>
		</div>
)};

export default EmployeeEdit;