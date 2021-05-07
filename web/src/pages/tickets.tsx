import { withUrqlClient } from 'next-urql';
import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { TICKET_COLUMNS } from '../components/Columns';
import { CustomTable } from '../components/CustomTable';
import { NavBar } from '../components/NavBar';
import {
	useFindRawAssignedTicketsQuery,
	useMeQuery,
} from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

const Tickets = () => {
	const [{ data: meData }] = useMeQuery();
	const [{ data: ticketData }] = useFindRawAssignedTicketsQuery();
	const tableData = ticketData?.findRawAssignedTickets
		? ticketData.findRawAssignedTickets
		: [{}];
	return (
		<>
			<NavBar brand="Assigned Tickets" />

			<Container>
				<Card>
					{/* plug in any data you want. very flexible and reusable*/}
					<CustomTable
						dataInput={tableData}
						columnInput={TICKET_COLUMNS}
						userInput={meData?.me}
					/>
				</Card>
			</Container>
		</>
	);
};

export default withUrqlClient(createUrqlClient)(Tickets);
