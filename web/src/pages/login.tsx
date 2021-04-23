import {
	Box,
	Button,
	Center,
	Flex,
	Heading,
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

interface loginProps {}

const login: React.FC<loginProps> = ({}) => {
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

										<Button
											width="full"
											colorScheme="teal"
											mt={10}
											type="submit"
											isLoading={isSubmitting}
										>
											sign in
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
	);
};

export default login;
