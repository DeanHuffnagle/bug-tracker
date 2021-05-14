import { Box } from '@chakra-ui/react';
import React from 'react';
import {
	Button,
	Dropdown,
	Image,
	Nav,
	Navbar,
	NavDropdown,
} from 'react-bootstrap';
import { APP_LOGO } from '../constants';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';

type NavBarProps = {
	brand?: string;
};

export const NavBar: React.FC<NavBarProps> = ({ brand, children }) => {
	const [{ data: meData }] = useMeQuery();
	const [, logout] = useLogoutMutation();

	let dropdown = null;

	if (!meData?.me) {
		dropdown = <Nav.Link href="/login">Login</Nav.Link>;
	}
	if (meData?.me) {
		dropdown = (
			<NavDropdown title={meData?.me?.firstName} id="basic-nav-dropdown">
				<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
				<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
				<NavDropdown.Item href="/create-organization">
					Create Organization
				</NavDropdown.Item>
				<NavDropdown.Divider />
				<NavDropdown.Item as="button" onClick={() => logout()}>
					logout
				</NavDropdown.Item>
			</NavDropdown>
		);
	}

	return (
		<div>
			<Navbar bg="light" variant="light" expand="lg">
				<Navbar.Brand href="/">
					<Image
						src="http://localhost:3000/workflo.png"
						alt="website logo"
						width={125}
					/>
				</Navbar.Brand>

				<div>
					logged in as <strong>{meData?.me?.role}</strong>.
				</div>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ml-auto">
						{dropdown}
						<Nav.Link href="/tickets">My Tickets</Nav.Link>
						<Nav.Link href="/projects">Projects</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};
