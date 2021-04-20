import React from 'react';
import PriorityBarGraph from '../components/PriorityBarGraph';
import StatusBarGraph from '../components/StatusBarGraph';
import TypePieChart from '../components/TypePieChart';

//================================================================================
//Ticket Priority Data
//================================================================================
const ticketPriorityColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
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

//================================================================================
//Ticket Status Data
//================================================================================
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

const line = () => {
	return (
		<>
			<TypePieChart />
			<StatusBarGraph />
			<PriorityBarGraph />
		</>
	);
};
export default line;
