import { IconButton } from '@chakra-ui/button';
import { DeleteIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import React from 'react';
import { useDeleteCommentMutation } from '../generated/graphql';
import { tableFormatted } from '../utils/tableFormatted';
import { DeleteButton } from './DeleteButton';

//================================================================================
//Assigned Ticket Table Columns
//================================================================================
export const TICKET_COLUMNS = [
	{
		Header: 'Ticket Number',
		accessor: 'ticket_id',
		Cell: (e) => (
			<Link href="ticket/[id]" as={`ticket/${e.value}`}>
				<span id="clickable-text">{e.value}</span>
			</Link>
		),
	},
	{
		Header: 'Title',
		accessor: 'ticket_title',
	},
	// {
	// 	Header: 'Description',
	// 	accessor: 'ticket_text',
	// },
	{
		Header: 'Type',
		accessor: 'ticket_type',
		Cell: (props) => tableFormatted(props.value),
	},
	{
		Header: 'Status',
		accessor: 'ticket_status',
		Cell: (props) => tableFormatted(props.value),
	},
	{
		Header: 'Priority',
		accessor: 'ticket_priority',
		Cell: (props) => tableFormatted(props.value),
	},
];

//================================================================================
//Comment Table Columns
//================================================================================

export const COMMENT_COLUMNS = [
	{
		Header: 'Comment',
		id: 'comment',
		accessor: 'comment_text',
	},
	{
		Header: 'User',
		id: 'user',
		accessor: (d) => `${d.commenter_firstName} ${d.commenter_lastName}`,
	},
	{
		Header: 'Date',
		id: 'date',
		accessor: 'comment_createdAt',
		Cell: (props) => {
			return new Date(parseInt(props.value)).toLocaleDateString('en-US');
		},
	},
	{
		Header: 'Delete',
		id: 'delete',
		accessor: 'comment_id',
		Cell: (props) => {
			return (
				<span>
					<DeleteButton commentIdInput={props.value} />
					{/* <IconButton
						aria-label="delete comment"
						icon={<DeleteIcon />}
						size="xs"
						onClick={() => {
							console.log('deleted comment', props.value);
						}}
					/> */}
				</span>
			);
		},
	},
];
