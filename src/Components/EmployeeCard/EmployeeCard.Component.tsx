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
	first: string,
	last: string,
}

type Picture = {
	thumbnail: string,
}

const Employee = ({id, name, picture}: IEmployee) => {
	const { title, first, last } = name;
	const { thumbnail } = picture;

	return (
		<Link className='employee-container' to={{
			pathname: '/employee',
			search: `?${id}`
		}}>
			<img src={thumbnail}/>
			<h2>{`${title} ${first} ${last}`}</h2>
		</Link>
	)
};

export default Employee;