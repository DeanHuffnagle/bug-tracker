import { withUrqlClient } from 'next-urql';
import { type } from 'node:os';
import React from 'react';
import { NavBar } from '../components/NavBar';
import { NewTable } from '../components/NewTable';
import { createUrqlClient } from '../utils/createUrqlClient';

type TestPageProps = {};

const TestPage: React.FC<TestPageProps> = ({}) => {
	return (
		<>
			<NavBar brand="Assigned Tickets" />
			<NewTable />
		</>
	);
};

export default withUrqlClient(createUrqlClient)(TestPage);
