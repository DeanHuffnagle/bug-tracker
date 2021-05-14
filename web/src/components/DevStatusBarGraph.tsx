import React from 'react';
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { GOLD, GREEN, LIGHT_BLUE, ORANGE } from '../constants';
import { useFindAssignedTicketsByStatusQuery } from '../generated/graphql';

export default function DevStatusBarGraph() {
	const [{ data: unassignedData }] = useFindAssignedTicketsByStatusQuery({
		variables: {
			options: {
				status: 'unassigned',
			},
		},
	});

	const [{ data: inProgressData }] = useFindAssignedTicketsByStatusQuery({
		variables: {
			options: {
				status: 'inProgress',
			},
		},
	});

	const [{ data: awaitingConfirmationData }] =
		useFindAssignedTicketsByStatusQuery({
			variables: {
				options: {
					status: 'awaitingConfirmation',
				},
			},
		});

	const [{ data: resolvedData }] = useFindAssignedTicketsByStatusQuery({
		variables: {
			options: {
				status: 'resolved',
			},
		},
	});

	const ticketStatusColors = [GOLD, LIGHT_BLUE, ORANGE, GREEN];
	const ticketStatusData = [
		{
			name: 'Unassigned',
			tickets: unassignedData?.findAssignedTicketsByStatus.length,
		},
		{
			name: 'In progress',
			tickets: inProgressData?.findAssignedTicketsByStatus.length,
		},
		{
			name: 'Awaiting confirmation',
			tickets: awaitingConfirmationData?.findAssignedTicketsByStatus.length,
		},
		{
			name: 'Resolved',
			tickets: resolvedData?.findAssignedTicketsByStatus.length,
		},
	];

	return (
		<>
			<ResponsiveContainer width="100%" height={265}>
				<BarChart
					data={ticketStatusData}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}
					barSize={50}
				>
					<XAxis
						dataKey="name"
						scale="point"
						fontSize="12"
						fontWeight="bold"
						padding={{ left: 30, right: 30 }}
					/>
					<YAxis />
					<CartesianGrid
						strokeDasharray="3 3"
						stroke="white"
						vertical={false}
					/>
					<Tooltip />
					<Bar dataKey="tickets" fill="#8884d8">
						{ticketStatusData.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={ticketStatusColors[index % ticketStatusColors.length]}
							/>
						))}
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</>
	);
}
