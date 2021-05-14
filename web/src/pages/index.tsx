import { Heading } from '@chakra-ui/layout';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import DevPriorityBarGraph from '../components/DevPriorityBarGraph';
import DevStatusBarGraph from '../components/DevStatusBarGraph';
import DevTypePieChart from '../components/DevTypePieChart';
import { NavBar } from '../components/NavBar';
import { useFindAssignedTicketsQuery, useMeQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

//================================================================================
//Index Page
//================================================================================
const Index = () => {
	const router = useRouter();
	const [{ data: meData, fetching }] = useMeQuery();
	const [{ data: assignedTicketsData }] = useFindAssignedTicketsQuery();

	useEffect(() => {
		if (!(meData?.me || fetching)) {
			router.push('/login');
		}
	});

	if (!meData?.me) {
		return (
			<>
				<NavBar />
				<Heading>Loading...</Heading>
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
								<div className="text-center" id="dashboard-card-titles">
									Stats and Stuff
								</div>
								<div id="dashboard-stats-text">
									Assigned Tickets:{' '}
									{assignedTicketsData?.findAssignedTickets?.length}
								</div>
							</Card>
						</Col>

						<Col className="mt-1">
							<Card id="chart-card">
								<div className="text-center" id="dashboard-card-titles">
									Tickets by Type
								</div>
								<DevTypePieChart />
							</Card>
						</Col>
					</Row>

					<Row>
						<Col className="mt-1">
							<Card id="chart-card">
								<div className="text-center" id="dashboard-card-titles">
									Tickets by Priority
								</div>
								<DevPriorityBarGraph />
							</Card>
						</Col>

						<Col className="mt-1">
							<Card id="chart-card">
								<div className="text-center" id="dashboard-card-titles">
									Tickets by Status
								</div>
								<DevStatusBarGraph />
							</Card>
						</Col>
					</Row>
				</Container>
			</>
		);
	}
};

export default withUrqlClient(createUrqlClient)(Index);
