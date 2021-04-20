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
import PriorityBarGraph from '../components/PriorityBarGraph';
import StatusBarGraph from '../components/StatusBarGraph';
import TypePieChart from '../components/TypePieChart';

//================================================================================
//Ticket Priority Data
//================================================================================
const ticketPriorityColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const ticketPriorityData = [
	{
		name: 'Low',
		tickets: 2,
	},
	{
		name: 'Medium',
		tickets: 4,
	},
	{
		name: 'High',
		tickets: 3,
	},
];

//================================================================================
//Ticket Status Data
//================================================================================
const ticketStatusColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const ticketStatusData = [
	{
		name: 'Unassigned',
		tickets: 2,
	},
	{
		name: 'In progress',
		tickets: 2,
	},
	{
		name: 'Awaiting confirmation',
		tickets: 4,
	},
	{
		name: 'Resolved',
		tickets: 3,
	},
];

//================================================================================
//assigned tickets
//================================================================================
const assignedTickets = [
	{
		id: 1,
		userId: 1,
	},
	{
		id: 2,
		userId: 1,
	},
	{
		id: 3,
		userId: 1,
	},
];
//================================================================================
//Index Page
//================================================================================
const Index = () => {
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
								Assigned Tickets: {assignedTickets.length}
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
							<TypePieChart />
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
							<PriorityBarGraph />
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
							<StatusBarGraph />
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Index;
