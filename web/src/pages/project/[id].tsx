import { EditIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	Flex,
	Heading,
	IconButton,
	Link,
	Text,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { CustomTable } from '../../components/CustomTable';
import { InputField } from '../../components/InputField';
import { NavBar } from '../../components/NavBar';
import {
	useCreateCommentMutation,
	useDeleteCommentMutation,
	useFindCommentsByTicketQuery,
	useMeQuery,
} from '../../generated/graphql';
import { COMMENT_COLUMNS } from '../../utils/Columns';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { toErrorMap } from '../../utils/toErrorMap';
import { useGetIntId } from '../../utils/useGetIntId';
import { useGetProjectFromUrl } from '../../utils/useGetProjectFromUrl';

const ticket = ({}) => {
	const router = useRouter();
	const [{ data: projectData, fetching }] = useGetProjectFromUrl();
	const [{ data: meData }] = useMeQuery();

	const isProjectId = projectData?.findProject?.id;
	const intId = useGetIntId();

	if (fetching) {
		return (
			<>
				<Box>Loading...</Box>;
			</>
		);
	}
	if (!isProjectId) {
		return (
			<>
				<NavBar />
				<Box>Could not find project.</Box>;
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
											{isProjectId}
											{projectData?.findProject?.name}
										</Heading>
									</Box>
									<Box mr="auto" mt={1}>
										<NextLink
											href="/project/edit-project/[id]"
											as={`/project/edit-project/${isProjectId}`}
										>
											<IconButton
												as={Link}
												aria-label="edit post"
												icon={<EditIcon />}
												size="xs"
												mr={1}
											/>
										</NextLink>
									</Box>
								</Flex>
								<Text ml={2} my={2}>
									Description: {projectData?.findProject?.description}
								</Text>
								<Text ml={2} mb={2}>
									Assigned Developer:{' '}
									{projectData?.findTicket?.manager?.firstName}{' '}
									{projectData?.findTicket?.manager?.lastName}
								</Text>
							</Card>
						</Col>
						<Col md={12} lg={6} className="mt-1">
							<Card>===== add table with tickets by project later =====</Card>
						</Col>
					</Row>
				</Container>
			</>
		);
	}
};

export default withUrqlClient(createUrqlClient)(ticket);
