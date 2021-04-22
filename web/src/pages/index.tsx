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
import DeveloperPriorityBarGraph from '../components/DeveloperPriorityBarGraph';
import PriorityBarGraph from '../components/DeveloperPriorityBarGraph';
import DeveloperStatusBarGraph from '../components/DeveloperStatusBarGraph';
import StatusBarGraph from '../components/DeveloperStatusBarGraph';
import DeveloperTypePieChart from '../components/DeveloperTypePieChart';
import TypePieChart from '../components/DeveloperTypePieChart';
import { useFindAssignedTicketsQuery, useMeQuery } from '../generated/graphql';

//================================================================================
//Index Page
//================================================================================
const Index = () => {
	const [{ data: meData }] = useMeQuery();
	const [{ data: assignedTicketsData }] = useFindAssignedTicketsQuery();

	return (
		<>
			<Navbar bg="dark" variant="dark" expand="lg">
				<Navbar.Brand href="#home">Bug-Tracker</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ml-auto">
						<NavDropdown title="User" id="basic-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">
								Another action
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">thing</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">logout</NavDropdown.Item>
						</NavDropdown>
						<Nav.Link href="#link">My Tickets</Nav.Link>
						<Nav.Link href="#home">Projects</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
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
								{assignedTicketsData?.findAssignedTickets.length}
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
							<DeveloperTypePieChart />
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
							<DeveloperPriorityBarGraph />
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
							<DeveloperStatusBarGraph />
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Index;
