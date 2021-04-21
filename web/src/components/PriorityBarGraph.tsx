import React from 'react';

import {
	ResponsiveContainer,
	BarChart,
	XAxis,
	YAxis,
	CartesianGrid,
	Bar,
	Cell,
	Tooltip,
} from 'recharts';
import {
	useFindAssignedTicketsByPriorityQuery,
	useFindAssignedTicketsQuery,
	useMeQuery,
} from '../generated/graphql';

export default function PriorityBarGraph() {
	const [{ data: meData }] = useMeQuery();
	const [{ data: lowData }] = useFindAssignedTicketsByPriorityQuery({
		variables: {
			options: {
				priority: 'low',
			},
		},
	});
	const [{ data: mediumData }] = useFindAssignedTicketsByPriorityQuery({
		variables: {
			options: {
				priority: 'medium',
			},
		},
	});
	const [{ data: highData }] = useFindAssignedTicketsByPriorityQuery({
		variables: {
			options: {
				priority: 'high',
			},
		},
	});

	const ticketPriorityColors = ['#264653', '#2a9d8f', '#e76f51'];
	const ticketPriorityData = [
		{
			name: 'Low',
			tickets: lowData?.findAssignedTicketsByPriority.length,
		},
		{
			name: 'Medium',
			tickets: mediumData?.findAssignedTicketsByPriority.length,
		},
		{
			name: 'High',
			tickets: highData?.findAssignedTicketsByPriority.length,
		},
	];

	return (
		<>
			<ResponsiveContainer width="100%" height={265}>
				<BarChart
					data={ticketPriorityData}
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
						padding={{ left: 45, right: 45 }}
					/>
					<YAxis />
					<CartesianGrid
						strokeDasharray="3 3"
						vertical={false}
						stroke="white"
					/>
					<Tooltip />
					<Bar dataKey="tickets" fill="#8884d8">
						{ticketPriorityData.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={ticketPriorityColors[index % ticketPriorityColors.length]}
							/>
						))}
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</>
	);
}
