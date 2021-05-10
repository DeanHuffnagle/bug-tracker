import { Box } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { CustomTable } from '../components/CustomTable';
import { NavBar } from '../components/NavBar';
import {
	useFindRawAssignedProjectsQuery,
	useFindRawAssignedTicketsQuery,
	useFindRawManagedProjectsQuery,
	useFindRawManagedTicketsQuery,
	useFindRawOrganizationProjectsQuery,
	useFindRawOrganizationTicketsQuery,
	useMeQuery,
} from '../generated/graphql';
import { PROJECT_COLUMNS, TICKET_COLUMNS } from '../utils/Columns';
import { createUrqlClient } from '../utils/createUrqlClient';

type ProjectsPageProps = {};

const Projects: React.FC<{}> = () => {
	const [{ data: meData, fetching }] = useMeQuery();
	const [{ data: adminData }] = useFindRawOrganizationProjectsQuery();
	const [{ data: projectManagerData }] = useFindRawManagedProjectsQuery();
	const [{ data: devData }] = useFindRawAssignedProjectsQuery();
	const isUserRole = meData?.me ? meData?.me?.role : 'developer';
	const adminTableData = adminData?.findRawOrganizationProjects
		? adminData.findRawOrganizationProjects
		: [{}];
	const projectManagerTableData = projectManagerData?.findRawManagedProjects
		? projectManagerData.findRawManagedProjects
		: [{}];
	const devTableData = devData?.findRawAssignedProjects
		? devData.findRawAssignedProjects
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
			tableData = adminTableData;
			brand = 'Organization Projects';
			break;
		case 'projectManager':
			tableData = projectManagerTableData;
			hiddenColumns = ['project manager'];
			brand = 'Managed Projects';
			break;
		case 'submitter':
			tableData = devTableData;
			brand = 'Assigned Projects';
			break;
		case 'developer':
			tableData = devTableData;
			brand = 'Assigned Projects';
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
						columnInput={PROJECT_COLUMNS}
						userInput={meData?.me}
						sortByInput={'project number'}
						hiddenColumnsInput={hiddenColumns}
					/>
				</Card>
			</Container>
		</>
	);
};

export default withUrqlClient(createUrqlClient)(Projects);
