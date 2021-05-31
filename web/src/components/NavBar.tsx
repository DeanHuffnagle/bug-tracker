import { BellIcon } from '@chakra-ui/icons';
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
import {
	useFindUsersByJoinRequestQuery,
	useLogoutMutation,
	useMeQuery,
} from '../generated/graphql';

type NavBarProps = {
	brand?: string;
};

export const NavBar: React.FC<NavBarProps> = ({ brand, children }) => {
	const [{ data: meData }] = useMeQuery();
	const isOrganizationId = meData?.me?.organizationId;
	const [, logout] = useLogoutMutation();
	const [{ data: joinRequestData }] = useFindUsersByJoinRequestQuery({
		variables: { options: { organizationId: isOrganizationId } },
	});

	let dropdown = null;
	let notification = null;

	if (!meData?.me) {
		dropdown = <Nav.Link href="/login">Login</Nav.Link>;
	}
	if (meData?.me) {
		dropdown = (
			<NavDropdown title={meData?.me?.firstName} id="basic-nav-dropdown">
				<NavDropdown.Item href="/create-ticket">Create Ticket</NavDropdown.Item>
				<NavDropdown.Item href="/create-project">
					Create Project
				</NavDropdown.Item>
				<NavDropdown.Divider />
				<NavDropdown.Item as="button" onClick={() => logout()}>
					logout
				</NavDropdown.Item>
			</NavDropdown>
		);
	}
	if (meData?.me?.role === 'admin') {
		if (joinRequestData?.findUsersByJoinRequest?.length === 0) {
			notification = (
				<Nav.Link href="/join-requests">
					<BellIcon />
				</Nav.Link>
			);
		} else {
			notification = (
				<Nav.Link href="/join-requests">
					<BellIcon color="red" />
				</Nav.Link>
			);
		}
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
						{notification}
						{dropdown}
						<Nav.Link href="/tickets">My Tickets</Nav.Link>
						<Nav.Link href="/projects">Projects</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};
