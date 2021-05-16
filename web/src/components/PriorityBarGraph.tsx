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
import { GOLD, GREEN, ORANGE } from '../constants';
import {
	useFindAssignedTicketsByPriorityQuery,
	useFindAssignedTicketsQuery,
	useFindManagedTicketsByPriorityQuery,
	useFindOrganizationTicketsByPriorityQuery,
	useMeQuery,
} from '../generated/graphql';

export type PriorityBarGraphProps = {
	heightInput?: number;
	admin?: boolean;
	manager?: boolean;
};

export const PriorityBarGraph: React.FC<PriorityBarGraphProps> = ({
	heightInput,
	admin,
	manager,
}) => {
	// const [{ data: meData }] = useMeQuery();
	//================================================================================
	//developer data
	//================================================================================
	const [{ data: devLowData }] = useFindAssignedTicketsByPriorityQuery({
		variables: {
			options: {
				priority: 'low',
			},
		},
	});
	const [{ data: devMediumData }] = useFindAssignedTicketsByPriorityQuery({
		variables: {
			options: {
				priority: 'medium',
			},
		},
	});
	const [{ data: devHighData }] = useFindAssignedTicketsByPriorityQuery({
		variables: {
			options: {
				priority: 'high',
			},
		},
	});
	const devTicketPriorityData = [
		{
			name: 'Low',
			tickets: devLowData?.findAssignedTicketsByPriority
				? devLowData?.findAssignedTicketsByPriority.length
				: 0,
		},
		{
			name: 'Medium',
			tickets: devMediumData?.findAssignedTicketsByPriority
				? devMediumData?.findAssignedTicketsByPriority.length
				: 0,
		},
		{
			name: 'High',
			tickets: devHighData?.findAssignedTicketsByPriority
				? devHighData?.findAssignedTicketsByPriority.length
				: 0,
		},
	];
	//================================================================================
	//project manager data
	//================================================================================
	const [{ data: managerLowData }] = useFindManagedTicketsByPriorityQuery({
		variables: {
			options: {
				priority: 'low',
			},
		},
	});
	const [{ data: managerMediumData }] = useFindManagedTicketsByPriorityQuery({
		variables: {
			options: {
				priority: 'medium',
			},
		},
	});
	const [{ data: managerHighData }] = useFindManagedTicketsByPriorityQuery({
		variables: {
			options: {
				priority: 'high',
			},
		},
	});
	const managerTicketPriorityData = [
		{
			name: 'Low',
			tickets: managerLowData?.findManagedTicketsByPriority
				? managerLowData?.findManagedTicketsByPriority.length
				: 0,
		},
		{
			name: 'Medium',
			tickets: managerMediumData?.findManagedTicketsByPriority
				? managerMediumData?.findManagedTicketsByPriority.length
				: 0,
		},
		{
			name: 'High',
			tickets: managerHighData?.findManagedTicketsByPriority
				? managerHighData?.findManagedTicketsByPriority.length
				: 0,
		},
	];
	//================================================================================
	//admin data
	//================================================================================
	const [{ data: adminLowData }] = useFindOrganizationTicketsByPriorityQuery({
		variables: {
			options: {
				priority: 'low',
			},
		},
	});
	const [{ data: adminMediumData }] = useFindOrganizationTicketsByPriorityQuery(
		{
			variables: {
				options: {
					priority: 'medium',
				},
			},
		}
	);
	const [{ data: adminHighData }] = useFindOrganizationTicketsByPriorityQuery({
		variables: {
			options: {
				priority: 'high',
			},
		},
	});
	const adminTicketPriorityData = [
		{
			name: 'Low',
			tickets: adminLowData?.findOrganizationTicketsByPriority
				? adminLowData?.findOrganizationTicketsByPriority.length
				: 0,
		},
		{
			name: 'Medium',
			tickets: adminMediumData?.findOrganizationTicketsByPriority
				? adminMediumData?.findOrganizationTicketsByPriority.length
				: 0,
		},
		{
			name: 'High',
			tickets: adminHighData?.findOrganizationTicketsByPriority
				? adminHighData?.findOrganizationTicketsByPriority.length
				: 0,
		},
	];
	//================================================================================
	//data logic
	//================================================================================
	let ticketPriorityData;
	if (admin) {
		ticketPriorityData = adminTicketPriorityData;
	}
	if (manager) {
		ticketPriorityData = managerTicketPriorityData;
	} else {
		ticketPriorityData = devTicketPriorityData;
	}
	//================================================================================
	//bar chart
	//================================================================================
	const chartHeight = heightInput ? heightInput : 265;
	const ticketPriorityColors = [GREEN, GOLD, ORANGE];
	return (
		<>
			<ResponsiveContainer width="100%" height={chartHeight}>
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
};
