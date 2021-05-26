import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react';
import { Image } from 'react-bootstrap';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '../../../components/InputField';
import { NAVY } from '../../../constants';
import {
	useFindRawOrganizationProjectsQuery,
	useMeQuery,
	useLoginMutation,
} from '../../../generated/graphql';
import { createUrqlClient } from '../../../utils/createUrqlClient';
import { toErrorMap } from '../../../utils/toErrorMap';
import { useGetOrganizationFromUrl } from '../../../utils/useGetOrganizationFromUrl';

const joinOrganization: React.FC<{}> = ({}) => {
	const router = useRouter();
	const [{ data: organizationData, fetching }] = useGetOrganizationFromUrl();
	const isOrganizationId = organizationData?.findOrganization?.id;
	const [{ data: ticketData }] = useFindRawOrganizationProjectsQuery();
	const [{ data: meData }] = useMeQuery();
	const link = organizationData?.findOrganization?.link ? (
		<a
			target="_blank"
			href={`${organizationData.findOrganization.link}`}
			rel="noopener noreferrer"
		>
			{organizationData.findOrganization.link}
		</a>
	) : (
		'no link'
	);
	let hiddenColumns: string[] = [''];
	let body;

	const [, login] = useLoginMutation();
	return (
		<Flex
			flex="1"
			bg="black"
			alignItems="center"
			style={{
				backgroundImage: `url("http://localhost:3000/workflo_background.png")`,
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
					<Box>
						<a href="/">
							<Image
								src="http://localhost:3000/workfloIcon.png"
								alt="website logo"
								width={150}
								className=" ml-auto mr-auto"
							/>
						</a>
					</Box>
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
												<Link mr="auto" color={NAVY} fontWeight="semibold">
													Forgot password?
												</Link>
											</NextLink>
										</Flex>
										<Button
											width="full"
											colorScheme="brand"
											mt={5}
											type="submit"
											isLoading={isSubmitting}
										>
											sign in
										</Button>
										<Box textAlign="center" mt={2}>
											{'new to Workflo? '}
											<NextLink href="/register">
												<Link ml="auto" color={NAVY} fontWeight="semibold">
													Join now
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

export default withUrqlClient(createUrqlClient)(joinOrganization);
