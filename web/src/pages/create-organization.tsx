import React from 'react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { InputField } from '../components/InputField';
import { SelectField } from '../components/SelectField';
import {
	useCreateOrganizationMutation,
	useCreateProjectMutation,
} from '../generated/graphql';
import { useRouter } from 'next/router';
import { toErrorMap } from '../utils/toErrorMap';

export type CreateOrganizationProps = {};

const CreateOrganization: React.FC<CreateOrganizationProps> = ({}) => {
	const router = useRouter();
	const [, CreateOrganization] = useCreateOrganizationMutation();
	return (
		<>
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
							maxWidth="500px"
							borderWidth={1}
							borderRadius={8}
							bg="white"
							boxShadow="lg"
						>
							<Box backgroundColor="white" p={1} borderRadius={10}>
								<Box textAlign="center">
									<Heading>Create Organization</Heading>
								</Box>
								<Box my={4} textAlign="left">
									<Formik
										initialValues={{
											name: '',
											link: '',
											privacy: '',
										}}
										onSubmit={async (values, { setErrors }) => {
											const response = await CreateOrganization({
												options: values,
											});
											if (response.data?.createOrganization.errors) {
												setErrors(
													toErrorMap(response.data.createOrganization.errors)
												);
											} else if (
												response?.data?.createOrganization.organization
											) {
												const newOrganizationId =
													response.data.createOrganization.organization.id;
												alert('Organization was created successfully.');
												if (
													window.confirm(
														'Now that you have an organization, you can get started on making a project. Would you like to make a project now? '
													)
												) {
													router.push(`/create-project`);
												} else {
													router.push(`/organization/${newOrganizationId}`);
												}
											}
										}}
									>
										{({ isSubmitting }) => (
											<Form>
												<Box mt={4}>
													<InputField
														name="name"
														placeholder="Name"
														label="Organization name"
														required
													/>
													<InputField
														name="link"
														placeholder="Link"
														label="Organization Link (optional)"
													/>
												</Box>
												<Box mt={1} width="full">
													<SelectField
														label="Joining:"
														name="privacy"
														placeholder="-Select-"
														required
													>
														<option value="open">Open</option>
														<option value="inviteOnly">Invite Only</option>
														<option value="closed">Closed</option>
													</SelectField>
												</Box>

												<Button
													width="full"
													colorScheme="brand"
													mt={10}
													type="submit"
													isLoading={isSubmitting}
												>
													Create
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
		</>
	);
};

export default withUrqlClient(createUrqlClient)(CreateOrganization);
