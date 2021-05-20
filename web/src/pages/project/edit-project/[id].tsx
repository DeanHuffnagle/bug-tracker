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
	useFindUsersByOrganizationQuery,
	useFindUsersByProjectQuery,
	useUpdateProjectMutation,
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
	const isOrganizationId = projectData?.findProject?.organizationId;
	const intId = useGetIntId();
	const [, updateProject] = useUpdateProjectMutation();
	const [{ data }] = useFindUsersByOrganizationQuery({
		variables: { options: { organizationId: isOrganizationId as number } },
	});
	const link = projectData?.findProject?.repositoryLink ? (
		<a
			target="_blank"
			href={`${projectData?.findProject?.repositoryLink}`}
			rel="noopener noreferrer"
		>
			{projectData?.findProject?.repositoryLink}
		</a>
	) : (
		'no repository'
	);

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
									<strong>Description: </strong>{' '}
									{projectData?.findProject?.description}
								</Text>
								<Text ml={2} mb={2}>
									<strong>Repository: </strong>
									{link}
								</Text>
								<Text ml={2} mb={2}>
									<strong>Project Manager: </strong>{' '}
									{projectData?.findProject?.manager?.firstName}{' '}
									{projectData?.findProject?.manager?.lastName}
								</Text>
							</Card>
						</Col>
						<Col md={12} lg={6} className="mt-1">
							<Card className="m-auto">
								<Formik
									initialValues={{
										name: projectData?.findProject?.name
											? projectData.findProject.name
											: '',
										description: projectData?.findProject?.description
											? projectData.findProject.description
											: '',
										repositoryLink: projectData?.findProject?.repositoryLink
											? projectData.findProject.repositoryLink
											: '',
										userEmail: projectData?.findProject?.manager?.email
											? projectData.findProject.manager.email
											: '',
									}}
									onSubmit={async (values, { setErrors }) => {
										const response = await updateProject({
											projectId: isProjectId,
											options: values,
										});
										if (response.data?.updateProject.errors) {
											setErrors(
												toErrorMap(response?.data?.updateProject.errors)
											);
										} else {
											console.log('values: ', values);
											// router.push(`/ticket/${isTicketId}`);
										}
									}}
								>
									{({ isSubmitting }) => (
										<Form>
											<Box mt={1}>
												<InputField
													name="name"
													placeholder="name"
													label="Name:"
												/>
											</Box>
											<Box mt={1}>
												<InputField
													textarea
													name="description"
													placeholder="description"
													label="Description:"
												/>
											</Box>
											<Box mt={1}>
												<InputField
													name="repositoryLink"
													placeholder="repository link"
													label="Repository link:"
												/>
											</Box>
											<Flex>
												<Box mt={1} width="full">
													<SelectField
														label="Project manager:"
														name="userEmail"
														placeholder="-Select-"
													>
														{data?.findUsersByOrganization?.map((u) =>
															!u ? null : (
																<option key={u.id} value={u.email}>
																	{u.firstName} {u.lastName}
																</option>
															)
														)}
													</SelectField>
												</Box>
											</Flex>

											<Button
												width="full"
												colorScheme="brand"
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
