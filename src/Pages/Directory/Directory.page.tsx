import React from 'react';
import { useQuery, gql } from '@apollo/client';

import EmployeeCard from '../../Components/EmployeeCard/EmployeeCard.Component';

import type { IEmployee } from '../../Types';

import './directory.styles.scss';
interface IEmployees {
	people: IEmployee[]
};

const GET_EMPLOYEES = gql`
	query GetEmployees {
		people {
			id,
			name { title, last },
			picture { large }
		}
	}
`;

const LoadingTitle = () => <span>loading</span>;

const DirectoryPage: React.FC = () => {
	const { loading, data } = useQuery<IEmployees>(GET_EMPLOYEES);

	return (
		<div className='directory-container'>
			{loading && <LoadingTitle />}
			{data && data.people.map(
				({id, name, picture}) => <EmployeeCard key={id} name={name} picture={picture} id={id} />
			)}
		</div>
	)
};

export default DirectoryPage;