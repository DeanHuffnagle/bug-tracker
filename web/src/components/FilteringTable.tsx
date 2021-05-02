import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { useFindAssignedTicketsQuery } from '../generated/graphql';
import NextLink from 'next/link';
import { Box, Input, Link } from '@chakra-ui/react';

export default function FilteringTable() {
	const [{ data: ticketData }] = useFindAssignedTicketsQuery();
	const [filter, setFilter] = useState('');

	return (
		<>
			<Table striped bordered hover responsive variant="dark">
				<thead>
					<tr>
						<th>Title</th>
						<th>Description</th>
						<th>Priority</th>
						<th>Status</th>
						<th>Type</th>
						<th>Developer</th>
					</tr>
				</thead>
				<tbody>
					{ticketData?.findAssignedTickets?.map((t) =>
						!t ? null : (
							<tr key={t.id}>
								{/* title */}
								<NextLink href="ticket/[id]" as={`/ticket/${t.id}`}>
									<td id="tickets-table-title">{t.title}</td>
								</NextLink>
								{/* description */}
								<NextLink href="ticket/[id]" as={`/ticket/${t.id}`}>
									<td>{t.text}</td>
								</NextLink>
								{/* priority */}
								{t.priority === 'low' ? <td>Low</td> : null}
								{t.priority === 'medium' ? <td>Medium</td> : null}
								{t.priority === 'high' ? <td>High</td> : null}
								{/* status */}
								{t.status === 'unassigned' ? <td>Unassigned</td> : null}
								{t.status === 'inProgress' ? <td>In Progress</td> : null}
								{t.status === 'resolved' ? <td>Resolved</td> : null}
								{t.status === 'awaitingConfirmation' ? (
									<td>Awaiting Confirmation</td>
								) : null}
								{/* type */}
								{t.type === 'bugOrError' ? <td>Bug/Error</td> : null}
								{t.type === 'featureRequest' ? <td>Feature Request</td> : null}
								{t.type === 'other' ? <td>Other</td> : null}
								{t.type === 'trainingRequest' ? (
									<td>Training Request</td>
								) : null}
								{/* assigned developer */}
								<td>
									{t.assignedDeveloper?.firstName}{' '}
									{t.assignedDeveloper?.lastName}
								</td>
							</tr>
						)
					)}
				</tbody>
			</Table>
		</>
	);
}
