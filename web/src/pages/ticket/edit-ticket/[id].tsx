import { ArrowBackIcon } from '@chakra-ui/icons';
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
import { Card, Col, Container, Row } from 'react-bootstrap';
import { InputField } from '../../../components/InputField';
import { NavBar } from '../../../components/NavBar';
import { SelectField } from '../../../components/SelectField';
import {
	useFindUsersByProjectQuery,
	useUpdateTicketMutation,
} from '../../../generated/graphql';
import { createUrqlClient } from '../../../utils/createUrqlClient';
import { toErrorMap } from '../../../utils/toErrorMap';
import { useGetIntId } from '../../../utils/useGetIntId';
import { useGetTicketFromUrl } from '../../../utils/useGetTicketFromUrl';

const editTicket = ({}) => {
	const router = useRouter();
	const [{ data: ticketData, fetching }] = useGetTicketFromUrl();
	const isTicketId = ticketData?.findTicket?.id;
	const isProjectId = ticketData?.findTicket?.projectId;
	const intId = useGetIntId();
	const [, updateTicket] = useUpdateTicketMutation();
	const [{ data }] = useFindUsersByProjectQuery({
		variables: { options: { projectId: isProjectId as number } },
	});

	if (fetching) {
		return (
			<>
				<NavBar />
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
										<NextLink href="/ticket/[id]" as={`/ticket/${isTicketId}`}>
											<IconButton
												as={Link}
												aria-label="arrow back icon"
												icon={<ArrowBackIcon />}
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
							<Card className="m-auto">
								<Formik
									initialValues={{
										ticketTitle: ticketData?.findTicket?.title
											? ticketData.findTicket.title
											: '',
										ticketText: ticketData?.findTicket?.text
											? ticketData.findTicket.text
											: '',
										ticketPriority: ticketData?.findTicket?.priority
											? ticketData.findTicket.priority
											: '',
										ticketType: ticketData?.findTicket?.type
											? ticketData.findTicket.type
											: '',
										ticketStatus: ticketData?.findTicket?.status
											? ticketData.findTicket.status
											: '',
										userEmail: ticketData?.findTicket?.assignedDeveloper?.email
											? ticketData.findTicket.assignedDeveloper.email
											: '',
									}}
									onSubmit={async (values, { setErrors }) => {
										const response = await updateTicket({
											ticketId: isTicketId,
											options: values,
										});
										if (response.data?.updateTicket.errors) {
											setErrors(
												toErrorMap(response?.data?.updateTicket.errors)
											);
										} else {
											// router.push(`/ticket/${isTicketId}`);
										}
									}}
								>
									{({ isSubmitting }) => (
										<Form>
											<Box mt={1}>
												<InputField
													name="ticketTitle"
													placeholder="title"
													label="Title:"
												/>
											</Box>
											<Box mt={1}>
												<InputField
													textarea
													name="ticketText"
													placeholder="text"
													label="Text:"
												/>
											</Box>
											<Flex>
												P
												<Box mt={1} width="full">
													<SelectField
														label="Assigned Developer:"
														name="userEmail"
														placeholder="-Select-"
													>
														{data?.findUsersByProject?.map((u) =>
															!u ? null : (
																<option key={u.id} value={u.email}>
																	{u.firstName} {u.lastName}
																</option>
															)
														)}
													</SelectField>
												</Box>
												<Box mt={1} width="full">
													<SelectField
														label="Priority:"
														name="ticketPriority"
														placeholder="-Select-"
													>
														<option value="low">Low</option>
														<option value="medium">Medium</option>
														<option value="high">High</option>
													</SelectField>
												</Box>
											</Flex>
											<Flex>
												<Box mt={1} width="full">
													<SelectField
														label="Status:"
														name="ticketStatus"
														placeholder="-Select-"
													>
														<option value="unassigned">Unassigned</option>
														<option value="inProgress">In Progress</option>
														<option value="awaitingConfirmation">
															Awaiting Confirmation
														</option>
														<option value="resolved">Resolved</option>
													</SelectField>
												</Box>
												<Box mt={1} width="full">
													<SelectField
														label="Type:"
														name="ticketType"
														placeholder="-Select-"
													>
														<option value="bugOrError">Bug/Error</option>
														<option value="featureRequest">
															Feature Request
														</option>
														<option value="trainingRequest">
															Training Request
														</option>
														<option value="other">Other</option>
													</SelectField>
												</Box>
											</Flex>

											<Button
												width="full"
												colorScheme="teal"
												mt={5}
												type="submit"
												isLoading={isSubmitting}
											>
												update ticket
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

export default withUrqlClient(createUrqlClient)(editTicket);
