import { Box, Flex, Heading, Link, Button } from '@chakra-ui/react';
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
	useJoinRequestMutation,
	useTransferOwnershipMutation,
	useFindUsersByOrganizationQuery,
} from '../../../generated/graphql';
import { createUrqlClient } from '../../../utils/createUrqlClient';
import { toErrorMap } from '../../../utils/toErrorMap';
import { useGetOrganizationFromUrl } from '../../../utils/useGetOrganizationFromUrl';
import { SelectField } from '../../../components/SelectField';

const transferOwnership: React.FC<{}> = ({}) => {
	const router = useRouter();
	const [{ data: organizationData, fetching }] = useGetOrganizationFromUrl();
	const [{ data: meData }] = useMeQuery();
	const [{}, transferOwnership] = useTransferOwnershipMutation();
	const isOrganizationId = organizationData?.findOrganization?.id;
	const isUserId = meData?.me?.id;
	const [{ data: ticketData }] = useFindRawOrganizationProjectsQuery();
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
					<Box backgroundColor="white" p={1} borderRadius={10}>
						<Box textAlign="center">
							<Heading>Transfer Ownership</Heading>
						</Box>

						<Box my={4} textAlign="left">
							<Formik
								initialValues={{ userId: '' }}
								onSubmit={async (values, { setErrors }) => {
									const response = await transferOwnership({ options: values });
									if (response.data?.transferOwnership.errors) {
										setErrors(
											toErrorMap(response.data.transferOwnership.errors)
										);
									} else if (response.data?.transferOwnership.user) {
										alert('ownership transferred successfully');
										router.push('/');
									}
								}}
							>
								{({ isSubmitting }) => (
									<Form>
										<Box>
											<Box>
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
											<Box>
												<Button
													width="full"
													colorScheme="brand"
													mt={5}
													type="submit"
													isLoading={isSubmitting}
												>
													Transfer Ownership
												</Button>
											</Box>
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

export default withUrqlClient(createUrqlClient)(transferOwnership);
