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
import {
	Bar,
	BarChart,
	CartesianGrid,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

//================================================================================
//Ticket Priority Data
//================================================================================
const ticketPriorityData = [
	{
		priority: 'Low',
		tickets: 2,
	},
	{
		priority: 'Medium',
		tickets: 4,
	},
	{
		priority: 'High',
		tickets: 3,
	},
];

//================================================================================
//Ticket Status Data
//================================================================================
const ticketStatusData = [
	{
		priority: 'Unassigned',
		tickets: 2,
	},
	{
		priority: 'In progress',
		tickets: 2,
	},
	{
		priority: 'Awaiting confirmation',
		tickets: 4,
	},
	{
		priority: 'Resolved',
		tickets: 3,
	},
];

const Index = () => {
	return (
		<>
			<Navbar bg="dark" variant="dark" expand="lg">
				<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ml-auto">
						<NavDropdown title="user" id="basic-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">
								Another action
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">thing</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">logout</NavDropdown.Item>
						</NavDropdown>
						<Nav.Link href="#link">Link</Nav.Link>
						<Nav.Link href="#home">Home</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			<Container fluid>
				<Row className="mt-5">
					<Col md>
						<Card>
							<ResponsiveContainer width="50%" height={200}>
								<BarChart
									data={ticketPriorityData}
									margin={{
										top: 5,
										right: 30,
										left: 20,
										bottom: 5,
									}}
									barSize={20}
								>
									<XAxis
										dataKey="priority"
										scale="point"
										padding={{ left: 15, right: 15 }}
									/>
									<YAxis />
									<CartesianGrid strokeDasharray="3 3" />
									<Tooltip />
									<Bar
										dataKey="tickets"
										fill="#8884d8"
										background={{ fill: '#eee' }}
									/>
								</BarChart>
							</ResponsiveContainer>
						</Card>
					</Col>
					<Col md>
						<Card>
							<ResponsiveContainer width="100%" height={200}>
								<PieChart width={400} height={400}>
									<Pie
										dataKey="tickets"
										startAngle={360}
										endAngle={0}
										data={ticketPriorityData}
										cx="50%"
										cy="50%"
										outerRadius={80}
										fill="#8884d8"
										label
									/>
									<Tooltip />
								</PieChart>
							</ResponsiveContainer>
						</Card>
					</Col>
				</Row>
				<Row className="mt-5">
					<Col md>
						<Card>
							<ResponsiveContainer width="100%" height={200}>
								<BarChart width={150} height={40} data={ticketStatusData}>
									<Bar dataKey="tickets" fill="#8884d8" />
									<Tooltip />
									<CartesianGrid />
								</BarChart>
							</ResponsiveContainer>
						</Card>
					</Col>
					<Col md>
						<Card>
							<ResponsiveContainer width="100%" height={200}>
								<PieChart width={400} height={400}>
									<Pie
										dataKey="tickets"
										startAngle={360}
										endAngle={0}
										data={ticketStatusData}
										cx="50%"
										cy="50%"
										outerRadius={80}
										fill="#8884d8"
										label
									/>
									<Tooltip />
								</PieChart>
							</ResponsiveContainer>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Index;
