import React from 'react';
import { Link } from 'react-router-dom';

import './employeeCard.styles.scss';

export interface IEmployee {
	id: number,
	name: Name,
	picture: Picture
}

type Name = {
	title: string,
	last: string,
}

type Picture = {
	large: string,
}

const Employee = ({id, name, picture}: IEmployee) => {
	const { title, last } = name;
	const { large } = picture;

	return (
		<Link
			className='employee-container' 
			to={`employee/${id}`}
			style={{backgroundImage:`url(${large})`}}
		>
			<h3 className='employee-name'>{`${title} ${last}`}</h3>
		</Link>
	)
};

export default Employee;