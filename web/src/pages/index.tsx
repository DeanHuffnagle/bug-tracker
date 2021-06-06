import { Heading } from '@chakra-ui/layout';
import {
	NextComponentType,
	PartialNextContext,
	withUrqlClient,
} from 'next-urql';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { JsxElement } from 'typescript';
import { NavBar } from '../components/NavBar';
import { PriorityBarGraph } from '../components/PriorityBarGraph';
import { StatusBarGraph } from '../components/StatusBarGraph';
import { TypePieChart } from '../components/TypePieChart';
import {
	useFindAssignedTicketsByPriorityQuery,
	useFindAssignedTicketsByStatusQuery,
	useFindAssignedTicketsByTypeQuery,
	useFindAssignedTicketsQuery,
	useFindOrganizationTicketsByStatusQuery,
	useFindRawAssignedProjectsQuery,
	useMeQuery,
	useRemoveNewUserTagMutation,
} from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

//================================================================================
//Index Page
//================================================================================

const Index = () => {
	const router = useRouter();
	const [{ data: meData, fetching }] = useMeQuery();
	const [, removeNewUserTag] = useRemoveNewUserTagMutation();

	//assigned projects
	const [{ data: assignedProjectsData }] = useFindRawAssignedProjectsQuery();

	// assigned tickets
	const [{ data: assignedTicketsData }] = useFindAssignedTicketsQuery();

	//tickets in progress
	const [{ data: inProgressTicketsData }] = useFindAssignedTicketsByStatusQuery(
		{
			variables: {
				options: {
					status: 'inProgress',
				},
			},
		}
	);

	//high priority tickets
	const [{ data: highPriorityTicketsData }] =
		useFindAssignedTicketsByPriorityQuery({
			variables: {
				options: {
					priority: 'high',
				},
			},
		});

	//bugs or errors
	const [{ data: bugsOrErrorsData }] = useFindAssignedTicketsByTypeQuery({
		variables: {
			options: {
				type: 'bugOrError',
			},
		},
	});

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
	} else if (meData.me && !asked && !meData.me.joinRequestId) {
		setAsked(true);
		if (meData.me.userExperience === 'new' || fetching) {
			window.alert(
				`Congratulations on creating your new account! To get started, you can create an organization to store your projects in, or search for an existing organization.`
			);
			if (window.confirm('would you like to create an organization now?')) {
				router.push('/create-organization');
				removeNewUserTag();
			} else {
				removeNewUserTag();
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
								<Col className="mt-1" sm={6}>
									<Card id="chart-card">
										<Card.Header>Important Information</Card.Header>
										<ListGroup variant="flush">
											<ListGroup.Item>
												Assigned Projects:{' '}
												{assignedProjectsData?.findRawAssignedProjects?.length}
											</ListGroup.Item>
											<ListGroup.Item>
												Assigned Tickets:{' '}
												{assignedTicketsData?.findAssignedTickets?.length}
											</ListGroup.Item>
											<ListGroup.Item>
												Tickets in Progress:{' '}
												{
													inProgressTicketsData?.findAssignedTicketsByStatus
														?.length
												}
											</ListGroup.Item>
											<ListGroup.Item>
												High Priority Tickets:{' '}
												{
													highPriorityTicketsData?.findAssignedTicketsByPriority
														?.length
												}
											</ListGroup.Item>
											<ListGroup.Item>
												Bugs/Errors:{' '}
												{bugsOrErrorsData?.findAssignedTicketsByType?.length}
											</ListGroup.Item>
										</ListGroup>
									</Card>
								</Col>

								<Col className="mt-1" sm={6}>
									<Card id="chart-card">
										<div className="text-center" id="dashboard-card-titles">
											Tickets by Type
										</div>
										<TypePieChart admin />
									</Card>
								</Col>
							</Row>

							<Row>
								<Col className="mt-1" sm={6}>
									<Card id="chart-card">
										<div className="text-center" id="dashboard-card-titles">
											Tickets by Priority
										</div>
										<PriorityBarGraph admin />
									</Card>
								</Col>

								<Col className="mt-1" sm={6}>
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
								<Col className="mt-1" sm={6}>
									<Card id="chart-card">
										<Card.Header>Important Information</Card.Header>
										<ListGroup variant="flush">
											<ListGroup.Item>
												Assigned Projects:{' '}
												{assignedProjectsData?.findRawAssignedProjects?.length}
											</ListGroup.Item>
											<ListGroup.Item>
												Assigned Tickets:{' '}
												{assignedTicketsData?.findAssignedTickets?.length}
											</ListGroup.Item>
											<ListGroup.Item>
												Tickets in Progress:{' '}
												{
													inProgressTicketsData?.findAssignedTicketsByStatus
														?.length
												}
											</ListGroup.Item>
											<ListGroup.Item>
												High Priority Tickets:{' '}
												{
													highPriorityTicketsData?.findAssignedTicketsByPriority
														?.length
												}
											</ListGroup.Item>
											<ListGroup.Item>
												Bugs/Errors:{' '}
												{bugsOrErrorsData?.findAssignedTicketsByType?.length}
											</ListGroup.Item>
										</ListGroup>
									</Card>
								</Col>

								<Col className="mt-1" sm={6}>
									<Card id="chart-card">
										<div className="text-center" id="dashboard-card-titles">
											Tickets by Type
										</div>
										<TypePieChart manager />
									</Card>
								</Col>
							</Row>

							<Row>
								<Col className="mt-1" sm={6}>
									<Card id="chart-card">
										<div className="text-center" id="dashboard-card-titles">
											Tickets by Priority
										</div>
										<PriorityBarGraph manager />
									</Card>
								</Col>

								<Col className="mt-1" sm={6}>
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
								<Col className="mt-1" sm={6}>
									<Card id="chart-card">
										<Card.Header>Important Information</Card.Header>
										<ListGroup variant="flush">
											<ListGroup.Item>
												Assigned Projects:{' '}
												{assignedProjectsData?.findRawAssignedProjects?.length}
											</ListGroup.Item>
											<ListGroup.Item>
												Assigned Tickets:{' '}
												{assignedTicketsData?.findAssignedTickets?.length}
											</ListGroup.Item>
											<ListGroup.Item>
												Tickets in Progress:{' '}
												{
													inProgressTicketsData?.findAssignedTicketsByStatus
														?.length
												}
											</ListGroup.Item>
											<ListGroup.Item>
												High Priority Tickets:{' '}
												{
													highPriorityTicketsData?.findAssignedTicketsByPriority
														?.length
												}
											</ListGroup.Item>
											<ListGroup.Item>
												Bugs/Errors:{' '}
												{bugsOrErrorsData?.findAssignedTicketsByType?.length}
											</ListGroup.Item>
										</ListGroup>
									</Card>
								</Col>

								<Col className="mt-1" sm={6}>
									<Card id="chart-card">
										<div className="text-center" id="dashboard-card-titles">
											Tickets by Type
										</div>
										<TypePieChart />
									</Card>
								</Col>
							</Row>

							<Row>
								<Col className="mt-1" sm={6}>
									<Card id="chart-card">
										<div className="text-center" id="dashboard-card-titles">
											Tickets by Priority
										</div>
										<PriorityBarGraph />
									</Card>
								</Col>

								<Col className="mt-1" sm={6}>
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
	return <div>something went wrong.</div>;
};

export default withUrqlClient(createUrqlClient)(Index as any);
