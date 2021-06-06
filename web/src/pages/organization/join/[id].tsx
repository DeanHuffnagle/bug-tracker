import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react';
import { Image } from 'react-bootstrap';
import { withUrqlClient } from 'next-urql';
import nextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
	useFindRawOrganizationProjectsQuery,
	useJoinOrganizationMutation,
	useJoinRequestMutation,
	useLoginMutation,
	useMeQuery,
} from '../../../generated/graphql';
import { createUrqlClient } from '../../../utils/createUrqlClient';
import { useGetOrganizationFromUrl } from '../../../utils/useGetOrganizationFromUrl';

const joinOrganization: React.FC<{}> = ({}) => {
	const router = useRouter();
	const [{ data: organizationData, fetching }] = useGetOrganizationFromUrl();
	const [{ data: meData }] = useMeQuery();
	const [{}, joinRequest] = useJoinRequestMutation();
	const [{}, joinOrganization] = useJoinOrganizationMutation();

	const isOrganizationId = organizationData?.findOrganization?.id;
	const isUserId = meData?.me?.id;
	const [{ data: ticketData }] = useFindRawOrganizationProjectsQuery();
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
	const [asked, setAsked] = useState(false);
	let isPrivacy = '';
	let hiddenColumns: string[] = [''];
	let body;

	switch (organizationData?.findOrganization?.privacy) {
		//================================================================================
		//Open
		//================================================================================
		case 'open':
			isPrivacy = 'open';

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
							<Box mt={3} mb={10}>
								<a href="/">
									<Image
										src="http://workflo.codes/workfloIcon.png"
										alt="website logo"
										width={150}
										className=" ml-auto mr-auto"
									/>
								</a>
							</Box>
							<Box backgroundColor="white" p={1} borderRadius={10}>
								<Box textAlign="center">
									<Heading>
										Join {organizationData?.findOrganization?.name}
									</Heading>
									<Box mt={5}>
										<Link>{link}</Link>
									</Box>
								</Box>

								<Button
									width="full"
									colorScheme="brand"
									mt={5}
									onClick={async () => {
										if (
											window.confirm(
												`"${organizationData.findOrganization?.name}" has joining set to ${isPrivacy}. Are you sure you wish to join?`
											)
										) {
											const response = await joinOrganization({
												options: {
													userId: isUserId as number,
													organizationId: isOrganizationId as number,
												},
											});
											if (!response.data?.joinOrganization.user) {
												window.alert('something went wrong');
											} else if (response.data?.joinOrganization.user) {
												window.alert(
													`Successfully joined "${organizationData?.findOrganization?.name}"!`
												);
												router.push('/');
											}
										}
									}}
								>
									Join
								</Button>
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
		//================================================================================
		//Closed
		//================================================================================
		case 'closed':
			isPrivacy = 'closed';
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
							<Box mt={3} mb={10}>
								<a href="/">
									<Image
										src="http://workflo.codes/workfloIcon.png"
										alt="website logo"
										width={150}
										className=" ml-auto mr-auto"
									/>
								</a>
							</Box>
							<Box backgroundColor="white" p={1} borderRadius={10}>
								<Box textAlign="center">
									<Heading>
										Join {organizationData?.findOrganization?.name}
									</Heading>
									<Box mt={5}>
										<Link>{link}</Link>
									</Box>
								</Box>

								<Button
									width="full"
									colorScheme="brand"
									mt={5}
									onClick={async () => {
										const response = await joinRequest({
											options: {
												userId: isUserId as number,
												organizationId: isOrganizationId as number,
											},
										});
										if (!response.data?.joinRequest.user) {
											alert('something went wrong');
										} else if (response.data?.joinRequest.user) {
											alert(
												`I'm sorry, unfortunately "${organizationData.findOrganization?.name}" has joining turned off. `
											);
											router.push('/organizations');
										}
									}}
								>
									Join
								</Button>
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
		//================================================================================
		//Invite Only
		//================================================================================
		default:
			isPrivacy = 'invite only';

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
							<Box mt={3} mb={10}>
								<a href="/">
									<Image
										src="http://workflo.codes/workfloIcon.png"
										alt="website logo"
										width={150}
										className=" ml-auto mr-auto"
									/>
								</a>
							</Box>
							<Box backgroundColor="white" p={1} borderRadius={10}>
								<Box textAlign="center">
									<Heading>
										Join {organizationData?.findOrganization?.name}
									</Heading>
									<Box mt={5}>
										<Link>{link}</Link>
									</Box>
								</Box>

								<Button
									width="full"
									colorScheme="brand"
									mt={5}
									onClick={async () => {
										if (
											window.confirm(
												`"${organizationData?.findOrganization?.name}" has joining set to ${isPrivacy}. do you wish to send a request to join this organization?`
											)
										) {
											const response = await joinRequest({
												options: {
													userId: isUserId as number,
													organizationId: isOrganizationId as number,
												},
											});
											if (!response?.data?.joinRequest.user) {
												window.alert('something went wrong');
											} else if (response?.data?.joinRequest.user) {
												window.alert('Request sent successfully!');
												router.push('/');
											}
										}
									}}
								>
									Join
								</Button>
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
	}

	return <div>Loading...</div>;
};

export default withUrqlClient(createUrqlClient)(joinOrganization);
