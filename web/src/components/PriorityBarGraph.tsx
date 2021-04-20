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

export default function PriorityBarGraph() {
	const ticketPriorityColors = ['#264653', '#2a9d8f', '#e76f51'];
	const ticketPriorityData = [
		{
			name: 'Low',
			tickets: 2,
		},
		{
			name: 'Medium',
			tickets: 4,
		},
		{
			name: 'High',
			tickets: 3,
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
