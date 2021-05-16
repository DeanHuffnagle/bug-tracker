import React, { PureComponent, useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';
import { GOLD, GREEN, LIGHT_BLUE, ORANGE } from '../constants';
import {
	useFindAssignedTicketsByTypeQuery,
	useFindManagedTicketsByTypeQuery,
	useFindOrganizationTicketsByTypeQuery,
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

export type PieChartProps = {
	heightInput?: number;
	admin?: boolean;
	manager?: boolean;
};

export const TypePieChart: React.FC<PieChartProps> = ({
	heightInput,
	admin,
	manager,
}) => {
	//================================================================================
	//developer data
	//================================================================================
	const [{ data: devBugData }] = useFindAssignedTicketsByTypeQuery({
		variables: {
			options: {
				type: 'bugOrError',
			},
		},
	});
	const [{ data: devOtherData }] = useFindAssignedTicketsByTypeQuery({
		variables: {
			options: {
				type: 'other',
			},
		},
	});
	const [{ data: devFeatureRequestData }] = useFindAssignedTicketsByTypeQuery({
		variables: {
			options: {
				type: 'featureRequest',
			},
		},
	});
	const [{ data: devTrainingRequestData }] = useFindAssignedTicketsByTypeQuery({
		variables: {
			options: {
				type: 'trainingRequest',
			},
		},
	});
	const devTicketTypeData = [
		{
			name: 'Bug/Errors',
			tickets: devBugData?.findAssignedTicketsByType
				? devBugData?.findAssignedTicketsByType.length
				: 0,
		},
		{
			name: 'Other',
			tickets: devOtherData?.findAssignedTicketsByType
				? devOtherData?.findAssignedTicketsByType.length
				: 0,
		},
		{
			name: 'Feature Requests',
			tickets: devFeatureRequestData?.findAssignedTicketsByType
				? devFeatureRequestData?.findAssignedTicketsByType.length
				: 0,
		},
		{
			name: 'Training Requests',
			tickets: devTrainingRequestData?.findAssignedTicketsByType
				? devTrainingRequestData?.findAssignedTicketsByType.length
				: 0,
		},
	];
	//================================================================================
	//project manager data
	//================================================================================
	const [{ data: managerBugData }] = useFindManagedTicketsByTypeQuery({
		variables: {
			options: {
				type: 'bugOrError',
			},
		},
	});
	const [{ data: managerOtherData }] = useFindManagedTicketsByTypeQuery({
		variables: {
			options: {
				type: 'other',
			},
		},
	});
	const [{ data: managerFeatureRequestData }] =
		useFindManagedTicketsByTypeQuery({
			variables: {
				options: {
					type: 'featureRequest',
				},
			},
		});
	const [{ data: managerTrainingRequestData }] =
		useFindManagedTicketsByTypeQuery({
			variables: {
				options: {
					type: 'trainingRequest',
				},
			},
		});
	const managerTicketTypeData = [
		{
			name: 'Bug/Errors',
			tickets: managerBugData?.findManagedTicketsByType
				? managerBugData?.findManagedTicketsByType.length
				: 0,
		},
		{
			name: 'Other',
			tickets: managerOtherData?.findManagedTicketsByType
				? managerOtherData?.findManagedTicketsByType.length
				: 0,
		},
		{
			name: 'Feature Requests',
			tickets: managerFeatureRequestData?.findManagedTicketsByType
				? managerFeatureRequestData?.findManagedTicketsByType.length
				: 0,
		},
		{
			name: 'Training Requests',
			tickets: managerTrainingRequestData?.findManagedTicketsByType
				? managerTrainingRequestData?.findManagedTicketsByType.length
				: 0,
		},
	];
	//================================================================================
	//admin data
	//================================================================================
	const [{ data: adminBugData }] = useFindOrganizationTicketsByTypeQuery({
		variables: {
			options: {
				type: 'bugOrError',
			},
		},
	});
	const [{ data: adminOtherData }] = useFindOrganizationTicketsByTypeQuery({
		variables: {
			options: {
				type: 'other',
			},
		},
	});
	const [{ data: adminFeatureRequestData }] =
		useFindOrganizationTicketsByTypeQuery({
			variables: {
				options: {
					type: 'featureRequest',
				},
			},
		});
	const [{ data: adminTrainingRequestData }] =
		useFindOrganizationTicketsByTypeQuery({
			variables: {
				options: {
					type: 'trainingRequest',
				},
			},
		});

	const adminTicketTypeData = [
		{
			name: 'Bug/Errors',
			tickets: adminBugData?.findOrganizationTicketsByType
				? adminBugData?.findOrganizationTicketsByType.length
				: 0,
		},
		{
			name: 'Other',
			tickets: adminOtherData?.findOrganizationTicketsByType
				? adminOtherData?.findOrganizationTicketsByType.length
				: 0,
		},
		{
			name: 'Feature Requests',
			tickets: adminFeatureRequestData?.findOrganizationTicketsByType
				? adminFeatureRequestData?.findOrganizationTicketsByType.length
				: 0,
		},
		{
			name: 'Training Requests',
			tickets: adminTrainingRequestData?.findOrganizationTicketsByType
				? adminTrainingRequestData?.findOrganizationTicketsByType.length
				: 0,
		},
	];
	//================================================================================
	//pie chart
	//================================================================================
	let ticketTypeData;
	if (admin) {
		ticketTypeData = adminTicketTypeData;
	} else if (manager) {
		ticketTypeData = managerTicketTypeData;
	} else {
		ticketTypeData = devTicketTypeData;
	}

	const chartHeight = heightInput ? heightInput : 265;
	const ticketTypeColors = [GREEN, LIGHT_BLUE, ORANGE, GOLD];
	const [active, setActive] = useState(0);

	const onPieEnter = (_, index) => {
		setActive(index);
	};

	return (
		<ResponsiveContainer width="100%" height={chartHeight}>
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
};
