import Link from 'next/link';
import React from 'react';
import { tableFormatted } from './tableFormatted';
import { DeleteButton } from '../components/DeleteButton';
import { tableFormattedExternalLink } from './tableFormattedExternalLink';
//================================================================================
// Organizations Table Columns
//================================================================================
export const ORGANIZATIONS_COLUMNS = [
	{
		Header: 'Id',
		id: 'id',
		accessor: 'id',
		Cell: (e) => (
			<Link href="/organization/[id]" as={`/organization/${e.value}`}>
				<span id="clickable-text">{e.value}</span>
			</Link>
		),
	},
	{
		Header: 'Name',
		id: 'name',
		accessor: 'name',
	},
	{
		Header: 'Link',
		id: 'link',
		accessor: 'link',
		Cell: (e) => tableFormattedExternalLink(e.value),
	},
];
//================================================================================
// Organizations Table Columns
//================================================================================
export const USER_COLUMNS = [
	{
		Header: 'First Name',
		id: 'first name',
		accessor: 'user_firstName',
	},
	{
		Header: 'Last Name',
		id: 'last name',
		accessor: 'user_lastName',
	},
	{
		Header: 'Email',
		id: 'email',
		accessor: 'user_email',
	},
	{
		Header: 'Role',
		id: 'role',
		accessor: 'user_role',
	},
];
//================================================================================
//Ticket Table Columns
//================================================================================
export const TICKET_COLUMNS = [
	{
		Header: 'Ticket Number',
		id: 'ticket number',
		accessor: 'ticket_id',
		Cell: (e) => (
			<Link href="/ticket/[id]" as={`/ticket/${e.value}`}>
				<span id="clickable-text">{e.value}</span>
			</Link>
		),
	},
	{
		Header: 'Title',
		id: 'title',
		accessor: 'ticket_title',
	},
	{
		Header: 'Type',
		id: 'type',
		accessor: 'ticket_type',
		Cell: (props) => tableFormatted(props.value),
	},
	{
		Header: 'Status',
		id: 'status',
		accessor: 'ticket_status',
		Cell: (props) => tableFormatted(props.value),
	},
	{
		Header: 'Priority',
		id: 'priority',
		accessor: 'ticket_priority',
		Cell: (props) => tableFormatted(props.value),
	},
	{
		Header: 'Assigned Developer',
		id: 'assigned developer',
		accessor: (d) =>
			`${d.assignedDeveloper_firstName} ${d.assignedDeveloper_lastName}`,
		Cell: (props) => tableFormatted(props.value),
	},
	{
		Header: 'Manager',
		id: 'manager',
		accessor: (d) => `${d.manager_firstName} ${d.manager_lastName}`,
		Cell: (props) => tableFormatted(props.value),
	},
	{
		Header: 'Submitted by',
		id: 'submitted by',
		accessor: (d) => `${d.submitter_firstName} ${d.submitter_lastName}`,
		Cell: (props) => tableFormatted(props.value),
	},
];
//================================================================================
//Project Table Columns
//================================================================================
export const PROJECT_COLUMNS = [
	{
		Header: 'Project Id',
		id: 'project id',
		accessor: 'project_id',
		Cell: (e) => (
			<Link href="/project/[id]" as={`/project/${e.value}`}>
				<span id="clickable-text">{e.value}</span>
			</Link>
		),
	},
	{
		Header: 'Name',
		id: 'name',
		accessor: 'project_name',
	},
	{
		Header: 'Description',
		id: 'description',
		accessor: 'project_description',
	},
	{
		Header: 'Project Manager',
		id: 'project manager',
		accessor: (d) => `${d.manager_firstName} ${d.manager_lastName}`,
		Cell: (props) => tableFormatted(props.value),
	},
	{
		Header: 'Repository Link',
		id: 'repository link',
		accessor: 'project_repositoryLink',
		Cell: (e) => tableFormattedExternalLink(e.value),
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
				</span>
			);
		},
	},
];
