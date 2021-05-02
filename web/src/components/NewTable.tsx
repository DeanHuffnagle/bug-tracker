import React, { useMemo } from 'react';
import { Table } from 'react-bootstrap';
import { Column, useTable } from 'react-table';
import {
	useFindAssignedTicketsQuery,
	useFindRawAssignedTicketsQuery,
	useMeQuery,
} from '../generated/graphql';
import { TICKET_COLUMNS } from './Columns';

export const NewTable = () => {
	const [{ data: meData }] = useMeQuery();
	const [{ data: ticketData }] = useFindRawAssignedTicketsQuery();
	const realData = ticketData?.findRawAssignedTickets
		? ticketData.findRawAssignedTickets
		: [{}];

	const columns = useMemo<
		Column<{
			title: string;
			text: string;
			priority: string;
			status: string;
			type: string;
			developer: string;
		}>[]
	>(() => TICKET_COLUMNS, []);
	const data = useMemo(() => realData, []);

	const tableInstance = useTable({
		columns,
		data,
	});
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = tableInstance;

	if (!realData) {
		return <>no data</>;
	} else {
		return (
			<Table
				{...getTableProps()}
				striped
				bordered
				hover
				responsive
				variant="dark"
			>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps()}>{column.render('Header')}</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map((row) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</Table>
		);
	}
};
