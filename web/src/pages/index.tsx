import { Heading } from '@chakra-ui/layout';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { NavBar } from '../components/NavBar';
import { PriorityBarGraph } from '../components/PriorityBarGraph';
import { StatusBarGraph } from '../components/StatusBarGraph';
import { TypePieChart } from '../components/TypePieChart';
import { useFindAssignedTicketsQuery, useMeQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

//================================================================================
//Index Page
//================================================================================
const Index: React.FC<{}> = () => {
	const router = useRouter();
	const [{ data: meData, fetching }] = useMeQuery();
	const [{ data: assignedTicketsData }] = useFindAssignedTicketsQuery();
	const [asked, setAsked] = useState(false);

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
	} else if (meData.me && !asked) {
		setAsked(true);
		if (meData.me.organizationId === null || fetching) {
			if (
				window.confirm(
					'you are not in an organization, would you like to create one?'
				)
			) {
				router.push('/create-organization');
			} else {
				router.push('/organizations');
			}
			return (
				<>
					<NavBar />
					<div>Loading...</div>;
				</>
			);
		}
	} else {
		switch (meData.me.role) {
			//================================================================================
			//admin
			//================================================================================
			case 'admin':
				return (
					<>
						<NavBar />
						<Container>
							<Row>
								<Col className="mt-1">
									<Card id="chart-card">
										<Card.Header>Important Information</Card.Header>
										<ListGroup variant="flush">
											<ListGroup.Item>
												Assigned Projects:{' '}
												{assignedTicketsData?.findAssignedTickets?.length}
											</ListGroup.Item>
											<ListGroup.Item>
												Assigned Tickets:{' '}
												{assignedTicketsData?.findAssignedTickets?.length}
											</ListGroup.Item>
											<ListGroup.Item>
												Assigned Tickets:{' '}
												{assignedTicketsData?.findAssignedTickets?.length}
											</ListGroup.Item>
											<ListGroup.Item>
												Assigned Tickets:{' '}
												{assignedTicketsData?.findAssignedTickets?.length}
											</ListGroup.Item>
											<ListGroup.Item>
												Assigned Tickets:{' '}
												{assignedTicketsData?.findAssignedTickets?.length}
											</ListGroup.Item>
										</ListGroup>
										{/* <div className="text-center" id="dashboard-card-titles">
											Important Information
										</div>
										<div id="dashboard-stats-text">
											Assigned Projects:{' '}
											{assignedTicketsData?.findAssignedTickets?.length}
										</div>
										<div id="dashboard-stats-text">
											Assigned Tickets:{' '}
											{assignedTicketsData?.findAssignedTickets?.length}
										</div>
										<div id="dashboard-stats-text">
											Tickets in Progress:{' '}
											{assignedTicketsData?.findAssignedTickets?.length}
										</div>
										<div id="dashboard-stats-text">
											High Priority Tickets:{' '}
											{assignedTicketsData?.findAssignedTickets?.length}
										</div> */}
									</Card>
								</Col>

								<Col className="mt-1">
									<Card id="chart-card">
										<div className="text-center" id="dashboard-card-titles">
											Tickets by Type
										</div>
										<TypePieChart admin />
									</Card>
								</Col>
							</Row>

							<Row>
								<Col className="mt-1">
									<Card id="chart-card">
										<div className="text-center" id="dashboard-card-titles">
											Tickets by Priority
										</div>
										<PriorityBarGraph admin />
									</Card>
								</Col>

								<Col className="mt-1">
									<Card id="chart-card">
										<div className="text-center" id="dashboard-card-titles">
											Tickets by Status
										</div>
										<StatusBarGraph admin />
									</Card>
								</Col>
							</Row>
						</Container>
					</>
				);
			//================================================================================
			//project manager
			//================================================================================
			case 'projectManager':
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
										<TypePieChart manager />
									</Card>
								</Col>
							</Row>

							<Row>
								<Col className="mt-1">
									<Card id="chart-card">
										<div className="text-center" id="dashboard-card-titles">
											Tickets by Priority
										</div>
										<PriorityBarGraph manager />
									</Card>
								</Col>

								<Col className="mt-1">
									<Card id="chart-card">
										<div className="text-center" id="dashboard-card-titles">
											Tickets by Status
										</div>
										<StatusBarGraph manager />
									</Card>
								</Col>
							</Row>
						</Container>
					</>
				);
			//================================================================================
			//developer or submitter
			//================================================================================
			default:
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
										<TypePieChart />
									</Card>
								</Col>
							</Row>

							<Row>
								<Col className="mt-1">
									<Card id="chart-card">
										<div className="text-center" id="dashboard-card-titles">
											Tickets by Priority
										</div>
										<PriorityBarGraph />
									</Card>
								</Col>

								<Col className="mt-1">
									<Card id="chart-card">
										<div className="text-center" id="dashboard-card-titles">
											Tickets by Status
										</div>
										<StatusBarGraph />
									</Card>
								</Col>
							</Row>
						</Container>
					</>
				);
		}
	}
};

export default withUrqlClient(createUrqlClient)(Index);
