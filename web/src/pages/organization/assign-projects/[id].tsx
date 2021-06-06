import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { CustomTable } from '../../../components/CustomTable';
import { NavBar } from '../../../components/NavBar';
import { SelectField } from '../../../components/SelectField';
import {
	useMeQuery,
	useFindUsersByOrganizationQuery,
	useFindRawOrganizationUsersQuery,
	useChangeUserRoleMutation,
	useFindProjectsByOrganizationQuery,
	useAssignProjectMutation,
} from '../../../generated/graphql';
import { USER_COLUMNS } from '../../../utils/Columns';
import { createUrqlClient } from '../../../utils/createUrqlClient';
import { toErrorMap } from '../../../utils/toErrorMap';
import { useGetOrganizationFromUrl } from '../../../utils/useGetOrganizationFromUrl';

const assignProjects = ({}) => {
	const router = useRouter();
	const [{ data: meData }] = useMeQuery();
	const [{ data: organizationData, fetching }] = useGetOrganizationFromUrl();
	const isOrganizationId = organizationData?.findOrganization?.id;
	const [, assignProject] = useAssignProjectMutation();
	const [{ data: userData }] = useFindUsersByOrganizationQuery({
		variables: { options: { organizationId: isOrganizationId as number } },
	});
	const [{ data: projectData }] = useFindProjectsByOrganizationQuery();
	const [{ data: userRawData }] = useFindRawOrganizationUsersQuery();

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

	const userTableData = userRawData?.findRawOrganizationUsers
		? userRawData.findRawOrganizationUsers
		: [{}];

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
								{' '}
								<Box py={2} px={3}>
									<CustomTable
										columnInput={USER_COLUMNS}
										dataInput={userTableData}
										userInput={meData?.me}
									/>
								</Box>
								<Formik
									initialValues={{
										userId: '',
										projectId: '',
									}}
									onSubmit={async (values, { setErrors }) => {
										const response = await assignProject({
											options: values,
										});
										if (response.data?.assignProject.errors) {
											setErrors(toErrorMap(response.data.assignProject.errors));
										} else {
											window.alert(`User was successfully assigned to project`);
										}
									}}
								>
									{({ isSubmitting }) => (
										<Form>
											<Box mt={1} px={5} width="full">
												<SelectField
													label="Project:"
													name="projectId"
													placeholder="-Select-"
												>
													{projectData?.findProjectsByOrganization?.map((p) =>
														!p ? null : (
															<option key={p.id} value={p.id}>
																{p.name}
															</option>
														)
													)}
												</SelectField>
											</Box>

											<Box mt={1} px={5} width="full">
												<SelectField
													label="User:"
													name="userId"
													placeholder="-Select-"
												>
													{userData?.findUsersByOrganization?.map((u) =>
														!u ? null : (
															<option key={u.id} value={u.id}>
																{u.firstName} {u.lastName}
															</option>
														)
													)}
												</SelectField>
											</Box>

											<Box px={5} pb={5} mt="auto">
												<Button
													width="full"
													colorScheme="brand"
													mt={5}
													type="submit"
													isLoading={isSubmitting}
												>
													assign role
												</Button>
											</Box>
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
export default withUrqlClient(createUrqlClient)(assignProjects);
