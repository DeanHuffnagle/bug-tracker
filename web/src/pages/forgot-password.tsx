import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { InputField } from '../components/InputField';
import {
	useForgotPasswordMutation,
	useLoginMutation,
} from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { toErrorMap } from '../utils/toErrorMap';
import NextLink from 'next/link';

const ForgotPassword: React.FC<{}> = ({}) => {
	const router = useRouter();
	const [complete, setComplete] = useState(false);
	const [, forgotPassword] = useForgotPasswordMutation();
	return (
		<Flex
			flex="1"
			bg="black"
			alignItems="center"
			style={{
				backgroundImage: `url("http://workflo.codes/workflo_background.png")`,
				backgroundSize: 2450,
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
							{complete ? null : <Heading>Forgot Password?</Heading>}
						</Box>

						<Box my={4} textAlign="left">
							<Formik
								initialValues={{ email: '' }}
								onSubmit={async (values) => {
									const response = await forgotPassword(values);
									setComplete(true);
								}}
							>
								{({ isSubmitting }) =>
									complete ? (
										<Box>
											If an account with that email exists, we sent you an
											email.
										</Box>
									) : (
										<Form>
											<InputField
												name="email"
												placeholder="email"
												label="Email"
											/>

											<Button
												width="full"
												colorScheme="brand"
												mt={10}
												type="submit"
												isLoading={isSubmitting}
											>
												send email
											</Button>
											<Box textAlign="center" mt={2}>
												<NextLink href="/login">
													<Link ml="auto" fontWeight="semibold" color="grey">
														Back
													</Link>
												</NextLink>
											</Box>
										</Form>
									)
								}
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

export default withUrqlClient(createUrqlClient)(ForgotPassword);
