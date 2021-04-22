import React, { PureComponent, useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';
import {
	useFindAssignedTicketsByTypeQuery,
	useMeQuery,
} from '../generated/graphql';

const renderActiveShape = (props) => {
	const RADIAN = Math.PI / 180;
	const {
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		startAngle,
		endAngle,
		fill,
		payload,
		percent,
		value,
	} = props;
	const sin = Math.sin(-RADIAN * midAngle);
	const cos = Math.cos(-RADIAN * midAngle);
	const sx = cx + (outerRadius + 10) * cos;
	const sy = cy + (outerRadius + 10) * sin;
	const mx = cx + (outerRadius + 30) * cos;
	const my = cy + (outerRadius + 30) * sin;
	const ex = mx + (cos >= 0 ? 1 : -1) * 22;
	const ey = my;
	const textAnchor = cos >= 0 ? 'start' : 'end';

	return (
		<g>
			<text
				x={cx}
				y={cy}
				dy={-4}
				textAnchor="middle"
				fontSize={12}
				fill="black"
				fontWeight="bold"
			>
				{payload.name}
			</text>
			<text
				x={cx}
				y={cy}
				dy={18}
				textAnchor="middle"
				fontSize={18}
				fill="Black"
				fontWeight="bold"
			>
				{payload.tickets}
			</text>
			<Sector
				cx={cx}
				cy={cy}
				innerRadius={innerRadius}
				outerRadius={outerRadius}
				startAngle={startAngle}
				endAngle={endAngle}
				fill={fill}
			/>
			<Sector
				cx={cx}
				cy={cy}
				startAngle={startAngle}
				endAngle={endAngle}
				innerRadius={outerRadius + 6}
				outerRadius={outerRadius + 10}
				fill={fill}
			/>
		</g>
	);
};

export default function TypePieChart() {
	//================================================================================
	//Ticket Priority Data
	//================================================================================

	const [{ data: bugTypeData }] = useFindAssignedTicketsByTypeQuery({
		variables: {
			options: {
				type: 'bugOrError',
			},
		},
	});
	const [{ data: otherTypeData }] = useFindAssignedTicketsByTypeQuery({
		variables: {
			options: {
				type: 'other',
			},
		},
	});
	const [{ data: featureRequestTypeData }] = useFindAssignedTicketsByTypeQuery({
		variables: {
			options: {
				type: 'featureRequest',
			},
		},
	});
	const [{ data: trainingRequestTypeData }] = useFindAssignedTicketsByTypeQuery(
		{
			variables: {
				options: {
					type: 'trainingRequest',
				},
			},
		}
	);
	const ticketTypeColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
	const ticketTypeData = [
		{
			name: 'Bug/Errors',
			tickets: bugTypeData?.findAssignedTicketsByType.length,
		},
		{
			name: 'Other',
			tickets: otherTypeData?.findAssignedTicketsByType.length,
		},
		{
			name: 'Feature Requests',
			tickets: featureRequestTypeData?.findAssignedTicketsByType.length,
		},
		{
			name: 'Training Requests',
			tickets: trainingRequestTypeData?.findAssignedTicketsByType.length,
		},
	];

	const [active, setActive] = useState(0);

	const onPieEnter = (_, index) => {
		setActive(index);
	};

	return (
		<ResponsiveContainer width="100%" height={265}>
			<PieChart width={400} height={400}>
				<Pie
					activeIndex={active}
					activeShape={renderActiveShape}
					data={ticketTypeData}
					cx="50%"
					cy="50%"
					innerRadius={60}
					outerRadius={80}
					fill="#8884d8"
					dataKey="tickets"
					onMouseEnter={onPieEnter}
				>
					{ticketTypeData.map((entry, index) => (
						<Cell
							key={`cell-${index}`}
							fill={ticketTypeColors[index % ticketTypeColors.length]}
						/>
					))}
				</Pie>
			</PieChart>
		</ResponsiveContainer>
	);
}
