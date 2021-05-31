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
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { InputField } from '../../../components/InputField';
import { NavBar } from '../../../components/NavBar';
import NextLink from 'next/link';
import {
	useFindRawOrganizationProjectsQuery,
	useFindRawOrganizationTicketsQuery,
	useFindRawOrganizationUsersQuery,
	useMeQuery,
	useUpdateOrganizationMutation,
} from '../../../generated/graphql';
import { createUrqlClient } from '../../../utils/createUrqlClient';
import { toErrorMap } from '../../../utils/toErrorMap';
import { useGetOrganizationFromUrl } from '../../../utils/useGetOrganizationFromUrl';
import { ArrowBackIcon, EditIcon } from '@chakra-ui/icons';

const editOrganization: React.FC<{}> = ({}) => {
	const router = useRouter();
	const [{ data: meData }] = useMeQuery();
	const [{ data: organizationData, fetching }] = useGetOrganizationFromUrl();
	const isOrganizationId = organizationData?.findOrganization?.id;
	const [{ data: ticketData }] = useFindRawOrganizationTicketsQuery();
	const [{ data: userData }] = useFindRawOrganizationUsersQuery();
	const [{ data: projectData }] = useFindRawOrganizationProjectsQuery();
	const [, updateOrganization] = useUpdateOrganizationMutation();

	const ticketTableData = ticketData?.findRawOrganizationTickets
		? ticketData.findRawOrganizationTickets
		: [{}];
	const projectTableData = projectData?.findRawOrganizationProjects
		? projectData.findRawOrganizationProjects
		: [{}];
	const userTableData = userData?.findRawOrganizationUsers
		? userData.findRawOrganizationUsers
		: [{}];

	const link = organizationData?.findOrganization?.link ? (
		<a
			target="_blank"
			href={`${organizationData.findOrganization.link}`}
			rel="noopener noreferrer"
		>
			{organizationData.findOrganization.link}
		</a>
	) : (
		''
	);

	useEffect(() => {
		if (organizationData) {
			if (meData) {
				if (!(meData?.me?.organizationId === isOrganizationId || fetching)) {
					router.push(`/organization/join/${isOrganizationId}`);
				}
			}
		}
	});
	if (!isOrganizationId) {
		return (
			<>
				<NavBar />
				<Box>Could not find Organization.</Box>;
			</>
		);
	} else {
		return (
			<>
				<NavBar />
				<Container>
					<Row>
						<Col className="mt-1">
							<Card id="chart-card">
								<Flex width="full">
									<Box width="full">
										<Heading>
											{organizationData?.findOrganization?.name}
										</Heading>
									</Box>

									<Box mr="auto" mt={1}>
										<NextLink
											href="/organization/[id]"
											as={`/organization/${isOrganizationId}`}
										>
											<IconButton
												as={Link}
												aria-label="edit post"
												icon={<ArrowBackIcon />}
												size="xs"
												mr={1}
											/>
										</NextLink>
									</Box>
								</Flex>
								{link}
								<Text>
									Projects:{projectData?.findRawOrganizationProjects?.length}
								</Text>
							</Card>
						</Col>

						<Col className="mt-1">
							<Card id="chart-card">
								<Formik
									initialValues={{
										name: organizationData?.findOrganization?.name
											? organizationData.findOrganization.name
											: '',
										link: organizationData?.findOrganization?.link
											? organizationData.findOrganization.link
											: '',
									}}
									onSubmit={async (values, { setErrors }) => {
										const response = await updateOrganization({
											organizationId: isOrganizationId,
											options: values,
										});
										if (response.data?.updateOrganization.errors) {
											setErrors(
												toErrorMap(response?.data?.updateOrganization.errors)
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
													name="link"
													placeholder="link"
													label="link:"
												/>
											</Box>
											<Button
												width="full"
												colorScheme="brand"
												mt={5}
												type="submit"
												isLoading={isSubmitting}
											>
												update organization
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
export default withUrqlClient(createUrqlClient)(editOrganization);
