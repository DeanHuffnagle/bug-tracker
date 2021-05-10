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

type ProjectsPageProps = {};

const Projects: React.FC<{}> = () => {
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
	let brand;

	if (fetching) {
		return (
			<>
				<Box>Loading...</Box>;
			</>
		);
	}

	switch (isUserRole) {
		case 'admin':
			console.log(isUserRole);
			console.log('1');
			tableData = adminTableData;
			hiddenColumns = ['id'];
			brand = 'Organization Tickets';
			break;
		case 'projectManager':
			console.log(isUserRole);
			console.log('2');
			tableData = projectManagerTableData;
			hiddenColumns = ['submitted by', 'manager'];
			brand = 'Managed Tickets';
			break;
		case 'submitter':
			console.log(isUserRole);
			console.log('3');
			tableData = devTableData;
			hiddenColumns = ['assigned developer', 'submitted by', 'manager'];
			brand = 'Assigned Tickets';
			break;
		case 'developer':
			console.log(isUserRole);
			console.log('3');
			tableData = devTableData;
			hiddenColumns = ['assigned developer', 'submitted by', 'manager'];
			brand = 'Assigned Tickets';
			break;
	}
	console.log(isUserRole);
	console.log(tableData);
	console.log(' hidden columns: ', hiddenColumns);

	return (
		<>
			<NavBar brand={brand} />
			<Container>
				<Card>
					<CustomTable
						dataInput={tableData}
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

export default withUrqlClient(createUrqlClient)(Projects);
