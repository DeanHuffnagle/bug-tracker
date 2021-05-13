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
import { useGetProjectFromUrl } from '../../../utils/useGetProjectFromUrl';

const editTicket = ({}) => {
	const router = useRouter();
	const [{ data: projectData, fetching }] = useGetProjectFromUrl();
	const isProjectId = projectData?.findProject?.id;
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
	if (!isProjectId) {
		return (
			<>
				<NavBar />
				<Box>Could not find ticket.</Box>
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
											{projectData?.findProject?.name}
										</Heading>
									</Box>
									<Box mr="auto" mt={1}>
										<NextLink
											href="/project/[id]"
											as={`/project/${isProjectId}`}
										>
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
									Description: {projectData?.findProject?.description}
								</Text>
								<Text ml={2} mb={2}>
									Project Manager:{' '}
									{projectData?.findProject?.manager?.firstName}{' '}
									{projectData?.findProject?.manager?.lastName}
								</Text>
								===== add more project info later =====
							</Card>
						</Col>
						<Col md={12} lg={6} className="mt-1">
							<Card className="m-auto">
								===== add edit form later =====
								{/* <Formik
									initialValues={{
										projectName: projectData?.findProject?.name
											? projectData.findProject.name
											: '',
										projectDescription: projectData?.findProject?.description
											? projectData.findProject.description
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
													name="projectName"
													placeholder="name"
													label="name:"
												/>
											</Box>
											<Box mt={1}>
												<InputField
													textarea
													name="projectDescription"
													placeholder="text"
													label="Text:"
												/>
											</Box>
											<Flex>
												<Box mt={1} width="full">
													<SelectField label="manager:" name="userEmail">
														{data?.findUsersByProject?.map((u) =>
															!u ? null : (
																<option key={u.id} value={u.id}>
																	{u.firstName} {u.lastName}
																</option>
															)
														)}
													</SelectField>
												</Box>
												<Box mt={1} width="full">
													<SelectField label="Priority:" name="ticketPriority">
														<option value="low">Low</option>
														<option value="medium">Medium</option>
														<option value="high">High</option>
													</SelectField>
												</Box>
											</Flex>
											<Flex>
												<Box mt={1} width="full">
													<SelectField label="Status:" name="ticketStatus">
														<option value="unassigned">Unassigned</option>
														<option value="inProgress">In Progress</option>
														<option value="awaitingConfirmation">
															Awaiting Confirmation
														</option>
														<option value="resolved">Resolved</option>
													</SelectField>
												</Box>
												<Box mt={1} width="full">
													<SelectField label="Type:" name="ticketType">
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
								</Formik> */}
							</Card>
						</Col>
					</Row>
				</Container>
			</>
		);
	}
};

export default withUrqlClient(createUrqlClient)(editTicket);
