import { Box, Heading, Text } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { CustomTable } from '../../components/CustomTable';
import { NavBar } from '../../components/NavBar';
import {
	useFindRawOrganizationProjectsQuery,
	useFindRawOrganizationTicketsQuery,
	useFindRawOrganizationUsersQuery,
	useMeQuery,
} from '../../generated/graphql';
import {
	PROJECT_COLUMNS,
	TICKET_COLUMNS,
	USER_COLUMNS,
} from '../../utils/Columns';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { useGetOrganizationFromUrl } from '../../utils/useGetOrganizationFromUrl';

const organization: React.FC<{}> = ({}) => {
	const router = useRouter();

	const [{ data: meData }] = useMeQuery();
	const [{ data: organizationData, fetching }] = useGetOrganizationFromUrl();
	const isOrganizationId = organizationData?.findOrganization?.id;
	const [{ data: ticketData }] = useFindRawOrganizationTicketsQuery();
	const [{ data: userData }] = useFindRawOrganizationUsersQuery();
	const [{ data: projectData }] = useFindRawOrganizationProjectsQuery();

	const ticketTableData = ticketData?.findRawOrganizationTickets
		? ticketData.findRawOrganizationTickets
		: [{}];
	const projectTableData = projectData?.findRawOrganizationProjects
		? projectData.findRawOrganizationProjects
		: [{}];
	const userTableData = userData?.findRawOrganizationUsers
		? userData.findRawOrganizationUsers
		: [{}];

	const link = organizationData?.findOrganization?.link ? (
		<a
			target="_blank"
			href={`${organizationData.findOrganization.link}`}
			rel="noopener noreferrer"
		>
			{organizationData.findOrganization.link}
		</a>
	) : (
		''
	);

	if (fetching) {
		return (
			<>
				<Box>Loading...</Box>;
			</>
		);
	}
	// useEffect(() => {
	// 	if (organizationData) {
	// 		if (meData) {
	// 			if (!(meData?.me?.organizationId === isOrganizationId || fetching)) {
	// 				console.log('not in org');
	// 				router.push(`/organization/join/${isOrganizationId}`);
	// 			}
	// 		}
	// 	}
	// });
	if (!isOrganizationId) {
		return (
			<>
				<NavBar />
				<Box>Could not find Organization.</Box>;
			</>
		);
	} else {
		return (
			<>
				<NavBar />
				<Container>
					<Row>
						<Col className="mt-1">
							<Card id="chart-card">
								<Heading>{organizationData?.findOrganization?.name}</Heading>
								{link}
								<Text>
									Projects:{projectData?.findRawOrganizationProjects?.length}
								</Text>
							</Card>
						</Col>

						<Col className="mt-1">
							<Card id="chart-card">
								<CustomTable
									columnInput={USER_COLUMNS}
									dataInput={userTableData}
									userInput={meData?.me}
								/>
							</Card>
						</Col>
					</Row>

					<Row>
						<Col className="mt-1">
							<Card id="chart-card">
								<CustomTable
									columnInput={PROJECT_COLUMNS}
									dataInput={projectTableData}
									userInput={meData?.me}
								/>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col className="mt-1">
							<Card id="chart-card">
								<CustomTable
									columnInput={TICKET_COLUMNS}
									dataInput={ticketTableData}
									userInput={meData?.me}
								/>
							</Card>
						</Col>
					</Row>
				</Container>
			</>
		);
	}
};
export default withUrqlClient(createUrqlClient)(organization);
