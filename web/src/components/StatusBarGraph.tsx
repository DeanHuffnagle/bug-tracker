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
import {
	useFindAssignedTicketsByStatusQuery,
	useFindManagedTicketsByStatusQuery,
	useFindOrganizationTicketsByStatusQuery,
} from '../generated/graphql';

export type StatusBarGraphProps = {
	heightInput?: number;
	admin?: boolean;
	manager?: boolean;
};

export const StatusBarGraph: React.FC<StatusBarGraphProps> = ({
	heightInput,
	admin,
	manager,
}) => {
	//================================================================================
	//developer data
	//================================================================================
	const [{ data: devUnassignedData }] = useFindAssignedTicketsByStatusQuery({
		variables: {
			options: {
				status: 'unassigned',
			},
		},
	});

	const [{ data: devInProgressData }] = useFindAssignedTicketsByStatusQuery({
		variables: {
			options: {
				status: 'inProgress',
			},
		},
	});

	const [{ data: devAwaitingConfirmationData }] =
		useFindAssignedTicketsByStatusQuery({
			variables: {
				options: {
					status: 'awaitingConfirmation',
				},
			},
		});

	const [{ data: devResolvedData }] = useFindAssignedTicketsByStatusQuery({
		variables: {
			options: {
				status: 'resolved',
			},
		},
	});
	const devTicketStatusData = [
		{
			name: 'Unassigned',
			tickets: devUnassignedData?.findAssignedTicketsByStatus
				? devUnassignedData?.findAssignedTicketsByStatus.length
				: 0,
		},
		{
			name: 'In progress',
			tickets: devInProgressData?.findAssignedTicketsByStatus
				? devInProgressData?.findAssignedTicketsByStatus.length
				: 0,
		},
		{
			name: 'Awaiting confirmation',
			tickets: devAwaitingConfirmationData?.findAssignedTicketsByStatus
				? devAwaitingConfirmationData?.findAssignedTicketsByStatus.length
				: 0,
		},
		{
			name: 'Resolved',
			tickets: devResolvedData?.findAssignedTicketsByStatus
				? devResolvedData?.findAssignedTicketsByStatus.length
				: 0,
		},
	];
	//================================================================================
	//project manager data
	//================================================================================
	const [{ data: managerUnassignedData }] = useFindManagedTicketsByStatusQuery({
		variables: {
			options: {
				status: 'unassigned',
			},
		},
	});

	const [{ data: managerInProgressData }] = useFindManagedTicketsByStatusQuery({
		variables: {
			options: {
				status: 'inProgress',
			},
		},
	});

	const [{ data: managerAwaitingConfirmationData }] =
		useFindManagedTicketsByStatusQuery({
			variables: {
				options: {
					status: 'awaitingConfirmation',
				},
			},
		});

	const [{ data: managerResolvedData }] = useFindManagedTicketsByStatusQuery({
		variables: {
			options: {
				status: 'resolved',
			},
		},
	});
	const managerTicketStatusData = [
		{
			name: 'Unassigned',
			tickets: managerUnassignedData?.findManagedTicketsByStatus
				? managerUnassignedData?.findManagedTicketsByStatus.length
				: 0,
		},
		{
			name: 'In progress',
			tickets: managerInProgressData?.findManagedTicketsByStatus
				? managerInProgressData?.findManagedTicketsByStatus.length
				: 0,
		},
		{
			name: 'Awaiting confirmation',
			tickets: managerAwaitingConfirmationData?.findManagedTicketsByStatus
				? managerAwaitingConfirmationData?.findManagedTicketsByStatus.length
				: 0,
		},
		{
			name: 'Resolved',
			tickets: managerResolvedData?.findManagedTicketsByStatus
				? managerResolvedData?.findManagedTicketsByStatus.length
				: 0,
		},
	];
	//================================================================================
	//admin data
	//================================================================================
	const [{ data: adminUnassignedData }] =
		useFindOrganizationTicketsByStatusQuery({
			variables: {
				options: {
					status: 'unassigned',
				},
			},
		});

	const [{ data: adminInProgressData }] =
		useFindOrganizationTicketsByStatusQuery({
			variables: {
				options: {
					status: 'inProgress',
				},
			},
		});

	const [{ data: adminAwaitingConfirmationData }] =
		useFindOrganizationTicketsByStatusQuery({
			variables: {
				options: {
					status: 'awaitingConfirmation',
				},
			},
		});

	const [{ data: adminResolvedData }] = useFindOrganizationTicketsByStatusQuery(
		{
			variables: {
				options: {
					status: 'resolved',
				},
			},
		}
	);
	const adminTicketStatusData = [
		{
			name: 'Unassigned',
			tickets: adminUnassignedData?.findOrganizationTicketsByStatus
				? adminUnassignedData?.findOrganizationTicketsByStatus.length
				: 0,
		},
		{
			name: 'In progress',
			tickets: adminInProgressData?.findOrganizationTicketsByStatus
				? adminInProgressData?.findOrganizationTicketsByStatus.length
				: 0,
		},
		{
			name: 'Awaiting confirmation',
			tickets: adminAwaitingConfirmationData?.findOrganizationTicketsByStatus
				? adminAwaitingConfirmationData?.findOrganizationTicketsByStatus.length
				: 0,
		},
		{
			name: 'Resolved',
			tickets: adminResolvedData?.findOrganizationTicketsByStatus
				? adminResolvedData?.findOrganizationTicketsByStatus.length
				: 0,
		},
	];
	//================================================================================
	// data logic
	//================================================================================
	let ticketStatusData;
	if (admin) {
		ticketStatusData = adminTicketStatusData;
	} else if (manager) {
		ticketStatusData = managerTicketStatusData;
	} else {
		ticketStatusData = devTicketStatusData;
	}
	//================================================================================
	//bar chart
	//================================================================================
	const chartHeight = heightInput ? heightInput : 265;
	const ticketStatusColors = [GOLD, LIGHT_BLUE, ORANGE, GREEN];
	return (
		<>
			<ResponsiveContainer width="100%" height={chartHeight}>
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
};
