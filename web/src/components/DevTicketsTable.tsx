import React from 'react';
import { Table } from 'react-bootstrap';
import { useFindAssignedTicketsQuery } from '../generated/graphql';
import NextLink from 'next/link';
import { Link } from '@chakra-ui/react';

export default function DevTicketsTable() {
	const [{ data: ticketData }] = useFindAssignedTicketsQuery();
	return (
		<>
			<Table striped bordered hover responsive variant="dark">
				<thead>
					<tr>
						<th>Title</th>
						<th>Description</th>
						<th>Priority</th>
						<th>Developer</th>
					</tr>
				</thead>
				<tbody>
					{ticketData?.findAssignedTickets?.map((t) =>
						!t ? null : (
							<tr>
								<NextLink href="ticket/[id]" as={`/ticket/${t.id}`}>
									<Link>
										<td>{t.title}</td>
									</Link>
								</NextLink>
								<td>{t.text}</td>
								<td>{t.priority}</td>
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
