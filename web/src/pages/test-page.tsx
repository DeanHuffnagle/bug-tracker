import { withUrqlClient } from 'next-urql';
import React from 'react';
import { NewTable } from '../components/NewTable';
import { createUrqlClient } from '../utils/createUrqlClient';

interface TestPageProps {}

const TestPage: React.FC<TestPageProps> = ({}) => {
	return (
		<>
			<NewTable />
		</>
	);
};

export default withUrqlClient(createUrqlClient)(TestPage);
