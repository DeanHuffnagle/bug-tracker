import { EditIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, IconButton, Link, Text } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { CustomTable } from '../../components/CustomTable';
import { NavBar } from '../../components/NavBar';
import { useFindOrganizationQuery, useMeQuery } from '../../generated/graphql';
import { TICKET_COLUMNS } from '../../utils/Columns';
import { createUrqlClient } from '../../utils/createUrqlClient';

import { useGetOrganizationFromUrl } from '../../utils/useGetOrganizationFromUrl';

const organization = ({}) => {
	const router = useRouter();
	const [{ data: organizationData, fetching }] = useGetOrganizationFromUrl();
	const [{ data: meData }] = useMeQuery();
	const isOrganizationId = organizationData?.findOrganization?.id;

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
	if (!meData?.me?.organizationId) {
		body = <div>request to join organization</div>;
	}
	if (meData?.me?.organizationId === isOrganizationId) {
  body = (<><CustomTable
  dataInput={}
  columnInput={}
  /></>
  
  </>);
}
	if (meData?.me?.organizationId !== isOrganizationId) {
		body = <div>less organization data</div>;
	}
	if (fetching) {
		return (
			<>
				<Box>Loading...</Box>;
			</>
		);
	}
	if (!isOrganizationId) {
		return (
			<>
				<NavBar />
				<Box>Could not find Organization.</Box>;
			</>
		);
	} else {
		return (
			<>
				<NavBar />
				<Container>
					<Row>
						<Col md={12} lg={6} className="mt-1">
							<Card>
								<Flex width="full">
									<Box width="full">
										<Heading ml={2} mt={1}>
											{organizationData?.findOrganization?.name}
										</Heading>
									</Box>
									<Box mr="auto" mt={1}>
										<NextLink
											href="/project/edit-organization/[id]"
											as={`/project/edit-organization/${isOrganizationId}`}
										>
											<IconButton
												as={Link}
												aria-label="edit organization"
												icon={<EditIcon />}
												size="xs"
												mr={1}
											/>
										</NextLink>
									</Box>
								</Flex>
								<Text ml={2} mb={2}>
									<strong>Link: </strong> {link}
								</Text>
							</Card>
						</Col>
						<Col md={12} lg={6} className="mt-1">
							<Card>{body}</Card>
						</Col>
					</Row>
				</Container>
			</>
		);
	}
};

export default withUrqlClient(createUrqlClient)(organization);
