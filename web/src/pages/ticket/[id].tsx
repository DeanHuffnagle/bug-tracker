import { EditIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	Heading,
	IconButton,
	Link,
	Text,
	Flex,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { Router, useRouter } from 'next/router';
import React, { useState } from 'react';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import { InputField } from '../../components/InputField';
import { NavBar } from '../../components/NavBar';
import {
	FindCommentsByTicketDocument,
	useCreateCommentMutation,
	useDeleteCommentMutation,
	useFindCommentsByTicketQuery,
	useMeQuery,
} from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { toErrorMap } from '../../utils/toErrorMap';
import { useGetIntId } from '../../utils/useGetIntId';
import { useGetTicketFromUrl } from '../../utils/useGetTicketFromUrl';
import NextLink from 'next/link';
import { CustomTable } from '../../components/CustomTable';
import { COMMENT_COLUMNS } from '../../utils/Columns';

const ticket = ({}) => {
	const router = useRouter();
	const [{ data: ticketData, error, fetching }] = useGetTicketFromUrl();
	const [{ data: meData }] = useMeQuery();
	const [{}, createComment] = useCreateCommentMutation();
	const [{}, deleteComment] = useDeleteCommentMutation();
	const isTicketId = ticketData?.findTicket?.id;
	const intId = useGetIntId();
	const [{ data: commentData }] = useFindCommentsByTicketQuery({
		variables: {
			options: {
				ticketId: isTicketId as number,
			},
		},
	});
	const tableData = commentData?.findCommentsByTicket
		? commentData.findCommentsByTicket
		: [{}];
	let hiddenColumns: string[] = [''];

	switch (meData?.me?.role) {
		case 'developer':
			hiddenColumns = ['delete'];
			break;
		case 'submitter':
			hiddenColumns = ['delete'];
			break;
	}

	if (fetching) {
		return (
			<>
				<Box>Loading...</Box>;
			</>
		);
	}
	if (!isTicketId) {
		return (
			<>
				<NavBar />
				<Box>Could not find ticket.</Box>;
			</>
		);
	} else {
		return (
			<>
				<NavBar />
				<Container>
					<Row>
						<Col md={12} lg={6} className="mt-1">
							<Card>
								<Flex width="full">
									<Box width="full">
										<Heading ml={2} mt={1}>
											{ticketData?.findTicket?.title}
										</Heading>
									</Box>
									<Box mr="auto" mt={1}>
										<NextLink
											href="/ticket/edit/[id]"
											as={`/ticket/edit/${isTicketId}`}
										>
											<IconButton
												as={Link}
												aria-label="edit post"
												icon={<EditIcon />}
												size="xs"
												mr={1}
											/>
										</NextLink>
									</Box>
								</Flex>
								<Text ml={2} my={2}>
									Description: {ticketData?.findTicket?.text}
								</Text>
								<Text ml={2} mb={2}>
									Assigned Developer:{' '}
									{ticketData?.findTicket?.assignedDeveloper?.firstName}{' '}
									{ticketData?.findTicket?.assignedDeveloper?.lastName}
								</Text>
								<Text ml={2} mb={4}>
									Priority:{' '}
									{ticketData?.findTicket?.priority === 'low' ? 'Low' : null}
									{ticketData?.findTicket?.priority === 'medium'
										? 'Medium'
										: null}
									{ticketData?.findTicket?.priority === 'high' ? 'High' : null}
								</Text>
								<Text ml={2} mb={4}>
									Status:{' '}
									{ticketData?.findTicket?.status === 'unassigned'
										? 'Unassigned'
										: null}
									{ticketData?.findTicket?.status === 'inProgress'
										? 'In Progress'
										: null}
									{ticketData?.findTicket?.status === 'awaitingConfirmation'
										? 'Awaiting Confirmation'
										: null}
									{ticketData?.findTicket?.status === 'resolved'
										? 'Resolved'
										: null}
								</Text>

								<Text ml={2} mb={4}>
									Type:{' '}
									{ticketData?.findTicket?.type === 'bugOrError'
										? 'Bug/Error'
										: null}
									{ticketData?.findTicket?.type === 'featureRequest'
										? 'Feature Request'
										: null}
									{ticketData?.findTicket?.type === 'trainingRequest'
										? 'Training Request'
										: null}
									{ticketData?.findTicket?.type === 'other' ? 'Other' : null}
								</Text>
							</Card>
						</Col>
						<Col md={12} lg={6} className="mt-1">
							<Card>
								<CustomTable
									dataInput={tableData}
									columnInput={COMMENT_COLUMNS}
									pageSizeInput={5}
									hiddenColumnsInput={hiddenColumns}
									sortByInput={'date'}
									descending
								/>
							</Card>
							<Card>
								<Formik
									initialValues={{ commentText: '' }}
									onSubmit={async (values, { resetForm, setErrors }) => {
										const response = await createComment({
											commentText: values.commentText,
											ticketId: isTicketId,
										});
										if (response.data?.createComment.errors) {
											setErrors(
												toErrorMap(response?.data?.createComment.errors)
											);
										} else {
											resetForm();
										}
									}}
								>
									{({ isSubmitting }) => (
										<Form>
											<Box mt={1}>
												<InputField
													textarea
													name="commentText"
													placeholder="comment text"
													label="Create Comment:"
												/>
											</Box>

											<Button
												width="full"
												colorScheme="teal"
												mt={5}
												type="submit"
												isLoading={isSubmitting}
											>
												submit
											</Button>
										</Form>
									)}
								</Formik>
							</Card>
						</Col>
					</Row>
				</Container>
			</>
		);
	}
};

export default withUrqlClient(createUrqlClient)(ticket);
