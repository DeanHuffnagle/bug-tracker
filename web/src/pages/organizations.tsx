import { Box } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { CustomTable } from '../components/CustomTable';
import { NavBar } from '../components/NavBar';
import {
	useFindOrganizationsQuery,
	useFindRawAssignedTicketsQuery,
	useFindRawManagedTicketsQuery,
	useFindRawOrganizationTicketsQuery,
	useMeQuery,
} from '../generated/graphql';
import { ORGANIZATIONS_COLUMNS, TICKET_COLUMNS } from '../utils/Columns';
import { createUrqlClient } from '../utils/createUrqlClient';

type OrganizationsPageProps = {};

const Organizations: React.FC<{}> = () => {
	const [{ data: organizationData, fetching }] = useFindOrganizationsQuery();
	const tableData = organizationData?.findOrganizations
		? organizationData.findOrganizations
		: null;
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
						dataInput={tableData as any[]}
						columnInput={ORGANIZATIONS_COLUMNS}
						sortByInput={'id'}
					/>
				</Card>
			</Container>
		</>
	);
};

export default withUrqlClient(createUrqlClient)(Organizations);
