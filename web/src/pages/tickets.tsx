import { Box } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { CustomTable } from '../components/CustomTable';
import { NavBar } from '../components/NavBar';
import {
	useFindRawAssignedTicketsQuery,
	useFindRawManagedTicketsQuery,
	useFindRawOrganizationTicketsQuery,
	useMeQuery,
} from '../generated/graphql';
import { TICKET_COLUMNS } from '../utils/Columns';
import { createUrqlClient } from '../utils/createUrqlClient';

type TicketsPageProps = {};

const Tickets: React.FC<{}> = () => {
	const [{ data: meData, fetching }] = useMeQuery();
	const [{ data: devData }] = useFindRawAssignedTicketsQuery();
	const [{ data: adminData }] = useFindRawOrganizationTicketsQuery();
	const [{ data: projectManagerData }] = useFindRawManagedTicketsQuery();
	const isUserRole = meData?.me ? meData?.me?.role : 'developer';
	const adminTableData = adminData?.findRawOrganizationTickets
		? adminData.findRawOrganizationTickets
		: [{}];
	const projectManagerTableData = projectManagerData?.findRawManagedTickets
		? projectManagerData.findRawManagedTickets
		: [{}];
	const devTableData = devData?.findRawAssignedTickets
		? devData.findRawAssignedTickets
		: [{}];

	let tableData;
	let hiddenColumns: string[] = [''];

	if (fetching) {
		return (
			<>
				<Box>Loading...</Box>;
			</>
		);
	}

	switch (isUserRole) {
		case 'admin':
			tableData = adminTableData;
			hiddenColumns = ['id'];
			break;
		case 'projectManager':
			tableData = projectManagerTableData;
			hiddenColumns = ['submitted by', 'manager'];
			break;
		case 'submitter':
			tableData = devTableData;
			hiddenColumns = ['assigned developer', 'submitted by', 'manager'];
			break;
		case 'developer':
			tableData = devTableData;
			hiddenColumns = ['assigned developer', 'submitted by', 'manager'];
			break;
	}

	return (
		<>
			<NavBar />
			<Container>
				<Card>
					<CustomTable
						dataInput={tableData as any[]}
						columnInput={TICKET_COLUMNS}
						userInput={meData?.me}
						sortByInput={'ticket number'}
						hiddenColumnsInput={hiddenColumns}
					/>
				</Card>
			</Container>
		</>
	);
};

export default withUrqlClient(createUrqlClient)(Tickets);
