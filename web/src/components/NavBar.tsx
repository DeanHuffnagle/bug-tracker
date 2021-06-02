import { BellIcon } from '@chakra-ui/icons';
import { confirmAlert } from 'react-confirm-alert';
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
	useDeleteOrganizationMutation,
	useFindUsersByJoinRequestQuery,
	useLeaveOrganizationMutation,
	useLogoutMutation,
	useMeQuery,
} from '../generated/graphql';

type NavBarProps = {
	brand?: string;
};

export const NavBar: React.FC<NavBarProps> = ({ brand, children }) => {
	const [{ data: meData }] = useMeQuery();
	const isOrganizationId = meData?.me?.organizationId;
	const isUserId = meData?.me?.id;
	const [, logout] = useLogoutMutation();
	const [, deleteOrganization] = useDeleteOrganizationMutation();
	const [, leaveOrganization] = useLeaveOrganizationMutation();
	const [{ data: joinRequestData }] = useFindUsersByJoinRequestQuery({
		variables: { options: { organizationId: isOrganizationId } },
	});

	//================================================================================
	//Variables
	//================================================================================
	let dropdown_1 = null;
	let dropdown_2 = null;
	let notification = null;
	let assignUsers = null;
	let loggedInAs = null;
	//================================================================================
	//delete section
	//================================================================================
	let deleteSection = (
		<NavDropdown.Item
			as="button"
			onClick={async () => {
				let response;
				if (
					window.confirm(
						`Are you sure you wish to delete "${meData.me?.organization?.name}"?`
					)
				) {
					if (
						window.confirm(
							`To be clear, this will permanently delete "${meData.me?.organization?.name}". Are you sure you wish to perform this action?`
						)
					) {
						response = await deleteOrganization({
							id: isOrganizationId as number,
						});
						if (response?.data?.deleteOrganization) {
							alert(`something went wrong.`);
						} else {
							alert(
								`"${meData.me?.organization?.name}" has been permanently deleted`
							);
						}
					}
				}
			}}
		>
			Delete Organization
		</NavDropdown.Item>
	);
	//================================================================================
	//leave section
	//================================================================================
	let leave = (
		<NavDropdown.Item
			as="button"
			onClick={async () => {
				let response;
				if (
					window.confirm(
						`Are you sure you wish to leave ${meData.me?.organization?.name}?`
					)
				)
					response = await leaveOrganization({
						options: { userId: isUserId as number },
					});
				if (response?.data?.leaveOrganization.errors) {
					alert(`${response?.data.leaveOrganization.errors[0].message}`);
				} else {
					alert(`You successfully left ${meData.me?.organization?.name}`);
				}
			}}
		>
			Leave Organization
		</NavDropdown.Item>
	);
	//================================================================================
	//assign users
	//================================================================================
	assignUsers = (
		<NavDropdown.Item href={`/organization/assign-roles/${isOrganizationId}`}>
			Assign Users
		</NavDropdown.Item>
	);

	//================================================================================
	//dropdown 1
	//================================================================================
	if (!meData?.me) {
		dropdown_1 = <Nav.Link href="/login">Login</Nav.Link>;
	}
	if (meData?.me) {
		dropdown_1 = (
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
	//================================================================================
	//dropdown 2
	//================================================================================
	// if owner of their organization
	if (meData?.me?.ownedOrganizationId) {
		dropdown_2 = (
			<NavDropdown
				title={meData?.me?.organization?.name}
				id="basic-nav-dropdown"
			>
				<NavDropdown.Item href={`/organization/${meData.me.organizationId}`}>
					Organization Page
				</NavDropdown.Item>
				{assignUsers}
				<NavDropdown.Item href="/tickets">Tickets</NavDropdown.Item>
				<NavDropdown.Item href="/projects">Projects</NavDropdown.Item>

				<NavDropdown.Divider />
				{deleteSection}
				<NavDropdown.Item
					href={`/organization/transfer-ownership/${isOrganizationId}`}
				>
					Transfer Ownership
				</NavDropdown.Item>
			</NavDropdown>
		);
		// if in an organization they do not own
	} else if (meData?.me?.organizationId) {
		if (meData.me.role === 'admin') {
			dropdown_2 = (
				<NavDropdown
					title={meData?.me?.organization?.name}
					id="basic-nav-dropdown"
				>
					<NavDropdown.Item href={`/organization/${meData.me.organizationId}`}>
						Organization Page
					</NavDropdown.Item>
					{assignUsers}
					<NavDropdown.Item href="/tickets">Tickets</NavDropdown.Item>
					<NavDropdown.Item href="/projects">Projects</NavDropdown.Item>

					<NavDropdown.Divider />
					{leave}
				</NavDropdown>
			);
		} else if (meData.me.role === 'projectManager') {
			dropdown_2 = (
				<NavDropdown
					title={meData?.me?.organization?.name}
					id="basic-nav-dropdown"
				>
					<NavDropdown.Item href={`/organization/${meData.me.organizationId}`}>
						Organization Page
					</NavDropdown.Item>
					{assignUsers}
					<NavDropdown.Item href="/tickets">Tickets</NavDropdown.Item>
					<NavDropdown.Item href="/projects">Projects</NavDropdown.Item>

					<NavDropdown.Divider />
					{leave}
				</NavDropdown>
			);
		} else {
			dropdown_2 = (
				<NavDropdown
					title={meData?.me?.organization?.name}
					id="basic-nav-dropdown"
				>
					<NavDropdown.Item href={`/organization/${meData.me.organizationId}`}>
						Organization Page
					</NavDropdown.Item>

					<NavDropdown.Item href="/tickets">Tickets</NavDropdown.Item>
					<NavDropdown.Item href="/projects">Projects</NavDropdown.Item>

					<NavDropdown.Divider />
					{leave}
				</NavDropdown>
			);
		}
	}
	//================================================================================
	//notification
	//================================================================================
	if (meData?.me) {
		loggedInAs = (
			<div>
				logged in as <strong>{meData?.me?.role}</strong>.
			</div>
		);
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

				{loggedInAs}
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ml-auto">
						{notification}
						{dropdown_1}
						{dropdown_2}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};
