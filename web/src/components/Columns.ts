import { Center } from '@chakra-ui/layout';
import { tableFormatted } from '../utils/tableFormatted';

export const TICKET_COLUMNS = [
	{
		Header: 'Ticket Number',
		accessor: 'ticket_id',
	},
	{
		Header: 'Title',
		accessor: 'ticket_title',
	},
	{
		Header: 'Description',
		accessor: 'ticket_text',
	},
	{
		Header: 'Priority',
		accessor: 'ticket_priority',
		Cell: (props) => tableFormatted(props.value),
	},
	{
		Header: 'Status',
		accessor: 'ticket_status',
		Cell: (props) => tableFormatted(props.value),
	},
	{
		Header: 'Type',
		accessor: 'ticket_type',
		Cell: (props) => tableFormatted(props.value),
	},
];
