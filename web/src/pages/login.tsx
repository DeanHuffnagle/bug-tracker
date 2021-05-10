import {
	Box,
	Button,
	Center,
	Flex,
	Heading,
	Link,
	Spacer,
	Stack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import NextLink from 'next/link';

const Login: React.FC<{}> = ({}) => {
	const router = useRouter();
	const [, login] = useLoginMutation();
	return (
		<Flex
			flex="1"
			bg="black"
			alignItems="center"
			style={{
				backgroundImage: `url("http://localhost:3000/background.png")`,
				backgroundSize: '100%',
			}}
		>
			<Box ml="auto" mr="auto" bg="white" borderRadius={8}>
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
							<Heading>Login</Heading>
						</Box>

						<Box my={4} textAlign="left">
							<Formik
								initialValues={{ email: '', password: '' }}
								onSubmit={async (values, { setErrors }) => {
									const response = await login({ options: values });
									if (response.data?.login.errors) {
										setErrors(toErrorMap(response.data.login.errors));
									} else if (response.data?.login.user) {
										router.push('/');
									}
								}}
							>
								{({ isSubmitting }) => (
									<Form>
										<InputField
											name="email"
											placeholder="email"
											label="Email"
										/>

										<Box mt={4}>
											<InputField
												name="password"
												placeholder="password"
												label="Password"
												type="password"
											/>
										</Box>
										<Flex mt={1}>
											<NextLink href="/forgot-password">
												<Link mr="auto" color="blue" fontWeight="semibold">
													Forgot password?
												</Link>
											</NextLink>
										</Flex>
										<Button
											width="full"
											colorScheme="teal"
											mt={5}
											type="submit"
											isLoading={isSubmitting}
										>
											sign in
										</Button>
										<Box textAlign="center" mt={2}>
											{'New to bug tracker? '}
											<NextLink href="/register">
												<Link ml="auto" color="blue" fontWeight="semibold">
													Sign up.
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

export default withUrqlClient(createUrqlClient)(Login);
