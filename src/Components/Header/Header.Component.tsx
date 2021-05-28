import React from 'react';
import { Link } from 'react-router-dom';

import './header.styles.scss';

const Header: React.FC = () => (
	<div className='header-container'>
		<Link to='/' className='logo-container'>
			HOME
		</Link>
		<div className='options'>
			<Link to='/directory' className='option'>
				Employee Directory
			</Link>
		</div>
	</div>
);

export default Header;