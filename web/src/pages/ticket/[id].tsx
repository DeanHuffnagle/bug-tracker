import { EditIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	Flex,
	Heading,
	IconButton,
	Link,
	Text,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { CustomTable } from '../../components/CustomTable';
import { InputField } from '../../components/InputField';
import { NavBar } from '../../components/NavBar';
import {
	useCreateCommentMutation,
	useFindCommentsByTicketQuery,
	useMeQuery,
} from '../../generated/graphql';
import { COMMENT_COLUMNS } from '../../utils/Columns';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { toErrorMap } from '../../utils/toErrorMap';
import { useGetTicketFromUrl } from '../../utils/useGetTicketFromUrl';

const ticket = ({}) => {
	const router = useRouter();
	const [{ data: ticketData, error, fetching }] = useGetTicketFromUrl();
	const [{ data: meData }] = useMeQuery();
	const [{}, createComment] = useCreateCommentMutation();
	const isTicketId = ticketData?.findTicket?.id;
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

	let editButton = null;
	if (meData?.me?.role === 'admin' || meData?.me?.role === 'projectManager') {
		editButton = (
			<NextLink
				href="/ticket/edit-ticket/[id]"
				as={`/ticket/edit-ticket/${isTicketId}`}
			>
				<IconButton
					as={Link}
					aria-label="edit post"
					icon={<EditIcon />}
					size="xs"
					mr={1}
				/>
			</NextLink>
		);
	}

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
								<Card.Header>
									<Flex width="full">
										<Box width="full">
											<Heading>{ticketData?.findTicket?.title}</Heading>
										</Box>
										<Box mr="auto" mt={1}>
											{editButton}
										</Box>
									</Flex>
								</Card.Header>
								<ListGroup variant="flush">
									<ListGroup.Item>
										Description: {ticketData?.findTicket?.text}
									</ListGroup.Item>
									<ListGroup.Item>
										Assigned Developer:{' '}
										{ticketData?.findTicket?.assignedDeveloper?.firstName}{' '}
										{ticketData?.findTicket?.assignedDeveloper?.lastName}
									</ListGroup.Item>
									<ListGroup.Item>
										Priority:{' '}
										{ticketData?.findTicket?.priority === 'low' ? 'Low' : null}
										{ticketData?.findTicket?.priority === 'medium'
											? 'Medium'
											: null}
										{ticketData?.findTicket?.priority === 'high'
											? 'High'
											: null}
									</ListGroup.Item>
									<ListGroup.Item>
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
									</ListGroup.Item>
									<ListGroup.Item>
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
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
						<Col md={12} lg={6} className="mt-1">
							<Card>
								<Heading>Comments</Heading>
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
												colorScheme="brand"
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
