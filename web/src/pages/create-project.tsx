import React from 'react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { InputField } from '../components/InputField';
import { SelectField } from '../components/SelectField';
import { useCreateProjectMutation } from '../generated/graphql';
import { useRouter } from 'next/router';
import { toErrorMap } from '../utils/toErrorMap';

export type CreateProjectProps = {};

const CreateProject: React.FC<CreateProjectProps> = ({}) => {
	const router = useRouter();
	const [, createProject] = useCreateProjectMutation();
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
							maxWidth="900px"
							borderWidth={1}
							borderRadius={8}
							bg="white"
							boxShadow="lg"
						>
							<Box backgroundColor="white" p={1} borderRadius={10}>
								<Box textAlign="center">
									<Heading>Create Project</Heading>
								</Box>
								<Box my={4} textAlign="left">
									<Formik
										initialValues={{
											name: '',
											description: '',
											repositoryLink: '',
										}}
										onSubmit={async (values, { setErrors }) => {
											const response = await createProject({
												options: values,
											});
											if (response.data?.createProject.errors) {
												setErrors(
													toErrorMap(response.data.createProject.errors)
												);
											} else if (response?.data?.createProject.project) {
												alert('Project was created successfully.');
												router.push('/');
											}
										}}
									>
										{({ isSubmitting }) => (
											<Form>
												<Flex mt={4}>
													<InputField
														name="name"
														placeholder="Name"
														label="Project name"
														required
													/>
													<InputField
														name="repositoryLink"
														placeholder="Link"
														label="Repository Link"
													/>
												</Flex>
												<Box mt={4}>
													<InputField
														name="description"
														placeholder="Enter a Brief Description Here"
														label="Project Description"
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
													Submit Project
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

export default withUrqlClient(createUrqlClient)(CreateProject);
