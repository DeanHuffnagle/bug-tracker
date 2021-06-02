import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react';
import { Image } from 'react-bootstrap';
import { withUrqlClient } from 'next-urql';
import nextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import {
	useFindRawOrganizationProjectsQuery,
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
					<Box mt={3} mb={10}>
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
							<Heading>Join {organizationData?.findOrganization?.name}</Heading>
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
									alert('Request sent successfully!');
									router.push('/');
								}
							}}
						>
							Request to join
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
};

export default withUrqlClient(createUrqlClient)(joinOrganization);
