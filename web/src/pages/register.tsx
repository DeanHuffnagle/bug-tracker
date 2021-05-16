import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import NextLink from 'next/link';
import { NAVY } from '../constants';

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
	const router = useRouter();
	const [, register] = useRegisterMutation();
	return (
		<Flex
			flex="1"
			alignItems="center"
			bg="black"
			style={{
				backgroundImage: `url("http://localhost:3000/workflo_background.png")`,
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
							<Heading>Register</Heading>
						</Box>
						<Box my={4} textAlign="left">
							<Formik
								initialValues={{
									firstName: '',
									lastName: '',
									email: '',
									password: '',
								}}
								onSubmit={async (values, { setErrors }) => {
									const response = await register({ options: values });
									if (response.data?.register.errors) {
										setErrors(toErrorMap(response.data.register.errors));
									} else if (response?.data?.register.user) {
										router.push('/');
									}
								}}
							>
								{({ isSubmitting }) => (
									<Form>
										<InputField
											name="firstName"
											placeholder="first name"
											label="First name"
											required
										/>
										<Box mt={4}>
											<InputField
												name="lastName"
												placeholder="last name"
												label="Last name"
												required
											/>
											<Box mt={4}>
												<InputField
													name="email"
													placeholder="email"
													label="Email"
													required
												/>
											</Box>
										</Box>
										<Box mt={4}>
											<InputField
												name="password"
												placeholder="password"
												label="Password"
												type="password"
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
											Register
										</Button>
										<Box textAlign="center" mt={2}>
											{'Already have an account? '}
											<NextLink href="/login">
												<Link ml="auto" color={NAVY} fontWeight="semibold">
													Sign in.
												</Link>
											</NextLink>
										</Box>
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
	);
};

export default withUrqlClient(createUrqlClient)(Register);
