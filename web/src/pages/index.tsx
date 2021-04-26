import { withUrqlClient } from 'next-urql';
import React from 'react';
import {
	Card,
	Col,
	Container,
	Nav,
	Navbar,
	NavDropdown,
	Row,
} from 'react-bootstrap';
import DevPriorityBarGraph from '../components/DevPriorityBarGraph';
import PriorityBarGraph from '../components/DevPriorityBarGraph';
import DevStatusBarGraph from '../components/DevStatusBarGraph';
import StatusBarGraph from '../components/DevStatusBarGraph';
import DevTypePieChart from '../components/DevTypePieChart';
import TypePieChart from '../components/DevTypePieChart';
import NavBar from '../components/NavBar';
import { useFindAssignedTicketsQuery, useMeQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

//================================================================================
//Index Page
//================================================================================
const Index = () => {
	const [{ data: meData }] = useMeQuery();
	const [{ data: assignedTicketsData }] = useFindAssignedTicketsQuery();
	let body = null;
	if (!meData?.me) {
		body = null;
	} else {
		body = (
			<>
				<Container>
					<Row>
						<Col className="mt-1">
							<Card
								className="chart-card"
								style={{
									width: '100%',
									height: '100%',
									background: 'rgb(225, 225, 225)',
								}}
							>
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
							<Card
								style={{
									background: 'rgb(225, 225, 225)',
								}}
							>
								<div className="text-center" id="dashboard-card-titles">
									Tickets by Type
								</div>
								<DevTypePieChart />
							</Card>
						</Col>
					</Row>

					<Row>
						<Col className="mt-1">
							<Card
								style={{
									background: 'rgb(225, 225, 225)',
								}}
							>
								<div className="text-center" id="dashboard-card-titles">
									Tickets by Priority
								</div>
								<DevPriorityBarGraph />
							</Card>
						</Col>

						<Col className="mt-1">
							<Card
								style={{
									background: 'rgb(225, 225, 225)',
								}}
							>
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
	return (
		<>
			<NavBar />
			{body}
		</>
	);
};

export default withUrqlClient(createUrqlClient)(Index);
