import { Box } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { CustomTable } from '../components/CustomTable';
import { NavBar } from '../components/NavBar';
import {
	useFindUsersByJoinRequestQuery,
	useMeQuery,
} from '../generated/graphql';
import { JOIN_REQUEST_COLUMNS } from '../utils/Columns';

import { createUrqlClient } from '../utils/createUrqlClient';

type JoinRequestsPageProps = {};

const joinRequests: React.FC<{}> = () => {
	const [{ data: meData, fetching }] = useMeQuery();
	const isOrganizationId = meData?.me?.organizationId;

	const [{ data: joinRequestData }] = useFindUsersByJoinRequestQuery({
		variables: { options: { organizationId: isOrganizationId as number } },
	});

	const tableData = joinRequestData?.findUsersByJoinRequest
		? joinRequestData.findUsersByJoinRequest
		: [{}];
	let hiddenColumns: string[] = [''];

	if (fetching) {
		return (
			<>
				<Box>Loading...</Box>;
			</>
		);
	}

	return (
		<>
			<NavBar />
			<Container>
				<Card>
					<CustomTable
						dataInput={tableData}
						columnInput={JOIN_REQUEST_COLUMNS}
						userInput={meData?.me}
						sortByInput={'date'}
						hiddenColumnsInput={hiddenColumns}
					/>
				</Card>
			</Container>
		</>
	);
};

export default withUrqlClient(createUrqlClient)(joinRequests);
