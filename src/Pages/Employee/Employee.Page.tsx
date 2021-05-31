import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import EmployeeEdit from '../../Components/EmployeeEdit/EmployeeEdit.Component';
import EmployeeDetails from '../../Components/EmployeeDetails/EmployeeDetails.Component';

import type { IEmployee } from '../../Types/Employee.type';

import './employee.styles.scss';

const GET_EMPLOYEE = gql`
	query GetEmployee($id: ID!) {
		person(id: $id) {
			name { first, last, title }
			email,
			id,
			picture { large }
		}
	}
`;

type Params = {
	id?: string
}

type EmployeeVars = {
	id?: string
}

type EmployeeData = {
	person: IEmployee
};

const Employee:React.FC = () => {
	const [ editEmployee, setEditEmployee ] = useState<Boolean>(false);
	const { id } = useParams<Params>();
	const { data, refetch } = useQuery<EmployeeData, EmployeeVars>(
		GET_EMPLOYEE,
		{ variables: { id } }
	);

	return (
		<div className='employee-details-edit-container'>
			{data && (
				<>
					{editEmployee ? (
						<EmployeeEdit person={data.person} setEditEmployee={setEditEmployee} refetchEmployee={refetch} />
						) : (
						<EmployeeDetails person={data.person} setEditEmployee={setEditEmployee} />
					)}
				</>
			)}
		</div>
)};

export default Employee;