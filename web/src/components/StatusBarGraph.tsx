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

export default function StatusBarGraph() {
	const ticketStatusColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
	const ticketStatusData = [
		{
			name: 'Unassigned',
			tickets: 2,
		},
		{
			name: 'In progress',
			tickets: 2,
		},
		{
			name: 'Awaiting confirmation',
			tickets: 4,
		},
		{
			name: 'Resolved',
			tickets: 3,
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
