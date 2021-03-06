import Link from 'next/link';
import React from 'react';
import { tableFormatted } from './tableFormatted';
import { DeleteButton } from '../components/DeleteButton';
import { tableFormattedExternalLink } from './tableFormattedExternalLink';
import { DeclineJoinRequestButton } from '../components/DeclineJoinRequestButton';
import { AcceptJoinRequestButton } from '../components/AcceptJoinRequestButton';
import { AnyARecord } from 'node:dns';
//================================================================================
// Organizations Table Columns
//================================================================================
export const ORGANIZATIONS_COLUMNS = [
	{
		Header: 'Id',
		id: 'id',
		accessor: 'id',
		Cell: (e: any) => (
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
		Cell: (e: any) => tableFormattedExternalLink(e.value),
	},
];
//================================================================================
// User Table Columns
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
		Cell: (props: any) => tableFormatted(props.value),
	},
];
//================================================================================
// Join Request Table Columns
//================================================================================
export const JOIN_REQUEST_COLUMNS = [
	{
		Header: 'Date',
		id: 'date',
		accessor: 'updatedAt',
		Cell: (props: any) => {
			return new Date(parseInt(props.value)).toLocaleDateString('en-US');
		},
	},
	{
		Header: 'First Name',
		id: 'first name',
		accessor: 'firstName',
	},
	{
		Header: 'Last Name',
		id: 'last name',
		accessor: 'lastName',
	},
	{
		Header: 'Email',
		id: 'email',
		accessor: 'email',
	},
	{
		Header: 'Accept',
		id: 'accept',
		accessor: 'id',
		Cell: (props: any) => {
			return (
				<span>
					<AcceptJoinRequestButton userIdInput={props.value} />
				</span>
			);
		},
	},
	{
		Header: 'Decline',
		id: 'decline',
		accessor: 'id',
		Cell: (props: any) => {
			return (
				<span>
					<DeclineJoinRequestButton userIdInput={props.value} />
				</span>
			);
		},
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
		Cell: (e: any) => (
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
		Cell: (props: any) => tableFormatted(props.value),
	},
	{
		Header: 'Status',
		id: 'status',
		accessor: 'ticket_status',
		Cell: (props: any) => tableFormatted(props.value),
	},
	{
		Header: 'Priority',
		id: 'priority',
		accessor: 'ticket_priority',
		Cell: (props: any) => tableFormatted(props.value),
	},
	{
		Header: 'Assigned Developer',
		id: 'assigned developer',
		accessor: (d: any) =>
			`${d.assignedDeveloper_firstName} ${d.assignedDeveloper_lastName}`,
		Cell: (props: any) => tableFormatted(props.value),
	},
	{
		Header: 'Manager',
		id: 'manager',
		accessor: (d: any) => `${d.manager_firstName} ${d.manager_lastName}`,
		Cell: (props: any) => tableFormatted(props.value),
	},
	{
		Header: 'Submitted by',
		id: 'submitted by',
		accessor: (d: any) => `${d.submitter_firstName} ${d.submitter_lastName}`,
		Cell: (props: any) => tableFormatted(props.value),
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
		Cell: (e: any) => (
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
		accessor: (d: any) => `${d.manager_firstName} ${d.manager_lastName}`,
		Cell: (props: any) => tableFormatted(props.value),
	},
	{
		Header: 'Repository Link',
		id: 'repository link',
		accessor: 'project_repositoryLink',
		Cell: (e: any) => tableFormattedExternalLink(e.value),
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
		accessor: (d: any) => `${d.commenter_firstName} ${d.commenter_lastName}`,
	},
	{
		Header: 'Date',
		id: 'date',
		accessor: 'comment_createdAt',
		Cell: (props: any) => {
			return new Date(parseInt(props.value)).toLocaleDateString('en-US');
		},
	},
	{
		Header: 'Delete',
		id: 'delete',
		accessor: 'comment_id',
		Cell: (props: any) => {
			return (
				<span>
					<DeleteButton commentIdInput={props.value} />
				</span>
			);
		},
	},
];
