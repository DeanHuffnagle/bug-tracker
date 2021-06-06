import React from 'react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import {
	useCreateTicketMutation,
	useFindProjectsByOrganizationQuery,
} from '../generated/graphql';
import { useRouter } from 'next/router';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { InputField } from '../components/InputField';
import { toErrorMap } from '../utils/toErrorMap';
import { SelectField } from '../components/SelectField';
import { NavBar } from '../components/NavBar';

export type CreateTicketProps = {};

const CreateTicket: React.FC<CreateTicketProps> = ({}) => {
	const router = useRouter();
	const [, createTicket] = useCreateTicketMutation();
	const [{ data: projectData }] = useFindProjectsByOrganizationQuery();
	return (
		<>
			<Flex
				flex="1"
				alignItems="center"
				bg="black"
				style={{
					backgroundImage: `url("http://workflo.codes/workflo_background.png")`,
					backgroundSize: 2450,
				}}
			>
				<Box ml="auto" mr="auto">
					<Box
						p={8}
						maxWidth="900px"
						borderWidth={1}
						borderRadius={8}
						bg="white"
						boxShadow="lg"
					>
						<Box backgroundColor="white" p={1} borderRadius={10}>
							<Box textAlign="center">
								<Heading>Create Ticket</Heading>
							</Box>
							<Box my={4} textAlign="left">
								<Formik
									initialValues={{
										projectId: '',
										title: '',
										text: '',
										ticketPriority: '',
										ticketType: '',
									}}
									onSubmit={async (values, { setErrors }) => {
										const response = await createTicket({
											options: values,
										});
										if (response.data?.createTicket.errors) {
											setErrors(toErrorMap(response.data.createTicket.errors));
										} else if (response?.data?.createTicket.ticket) {
											alert('Ticket was submitted successfully.');
											router.push('/');
										}
									}}
								>
									{({ isSubmitting }) => (
										<Form>
											<Flex mt={4}>
												<SelectField
													label="Project"
													name="projectId"
													placeholder="-Select-"
													required
												>
													{projectData?.findProjectsByOrganization?.map((p) =>
														!p ? null : (
															<option key={p.id} value={p.id}>
																{p.name}
															</option>
														)
													)}
												</SelectField>

												<InputField
													name="title"
													placeholder="Title"
													label="Ticket title"
													required
												/>
											</Flex>
											<Flex mt={4}>
												<SelectField
													label="Priority"
													name="ticketPriority"
													placeholder="-Select-"
													required
												>
													<option value="low">Low</option>
													<option value="medium">Medium</option>
													<option value="high">High</option>
												</SelectField>

												<SelectField
													label="Type"
													name="ticketType"
													placeholder="-Select-"
													required
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
											</Flex>
											<Box mt={4}>
												<InputField
													name="text"
													placeholder="Enter a Brief Description Here"
													label="Ticket Description"
													textarea
													required
												/>
											</Box>

											<Button
												width="full"
												colorScheme="brand"
												mt={10}
												type="submit"
												isLoading={isSubmitting}
											>
												Submit Ticket
											</Button>
										</Form>
									)}
								</Formik>
							</Box>
						</Box>
					</Box>
				</Box>
				<style global jsx>{`
					html,
					body,
					body > div:first-child,
					div#__next,
					div#__next > div {
						height: 100%;
					}
				`}</style>
			</Flex>
		</>
	);
};

export default withUrqlClient(createUrqlClient)(CreateTicket);
