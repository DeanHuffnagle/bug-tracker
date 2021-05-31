import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { InputField } from '../../../components/InputField';
import { NavBar } from '../../../components/NavBar';
import {
	useFindUsersByOrganizationQuery,
	useMeQuery,
} from '../../../generated/graphql';
import { createUrqlClient } from '../../../utils/createUrqlClient';
import { toErrorMap } from '../../../utils/toErrorMap';
import { useGetOrganizationFromUrl } from '../../../utils/useGetOrganizationFromUrl';

const assignRoles: React.FC<{}> = ({}) => {
	const router = useRouter();
	const [{ data: meData }] = useMeQuery();
	const [{ data: organizationData, fetching }] = useGetOrganizationFromUrl();
	const isOrganizationId = organizationData?.findOrganization?.id;
	const [{ data: userData }] = useFindUsersByOrganizationQuery({
		variables: { options: { organizationId: isOrganizationId as number } },
	});

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
								<Heading>{organizationData?.findOrganization?.name}</Heading>
								{link}
								<Text>
									Projects:{projectData?.findRawOrganizationProjects?.length}
								</Text>
							</Card>
							{/* </Col>

						<Col className="mt-1"> */}
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
export default withUrqlClient(createUrqlClient)(assignRoles);
