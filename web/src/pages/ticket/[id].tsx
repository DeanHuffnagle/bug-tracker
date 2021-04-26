import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import { InputField } from '../../components/InputField';
import NavBar from '../../components/NavBar';
import {
	useCreateCommentMutation,
	useFindCommentsByTicketQuery,
} from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { toErrorMap } from '../../utils/toErrorMap';
import { useGetIntId } from '../../utils/useGetIntId';
import { useGetTicketFromUrl } from '../../utils/useGetTicketFromUrl';

const ticket = ({}) => {
	const router = useRouter();
	const [{ data: ticketData, error, fetching }] = useGetTicketFromUrl();
	const [{}, createComment] = useCreateCommentMutation();
	const isTicketId = ticketData?.findTicket?.id;
	const intId = useGetIntId();
	const [{ data }] = useFindCommentsByTicketQuery({
		variables: {
			options: {
				ticketId: isTicketId as number,
			},
		},
	});

	if (fetching) {
		return (
			<>
				<NavBar />
				<Box>Loading...</Box>;
			</>
		);
	}
	if (!isTicketId) {
		return (
			<>
				<NavBar />
				<Box>Could not find ticket.</Box>;
			</>
		);
	} else {
		return (
			<>
				<NavBar />
				<Container>
					<Row>
						<Col className="mt-1">
							<Card>
								<Heading>{ticketData?.findTicket?.title}</Heading>
								<Box mb={4}>{ticketData?.findTicket?.text}</Box>
							</Card>
						</Col>
						<Col className="mt-1">
							<Card>
								<Table striped bordered hover responsive variant="dark">
									<thead>
										<tr>
											<th>Comment</th>
											<th>User</th>
											<th>Date</th>
										</tr>
									</thead>
									<tbody>
										{data?.findCommentsByTicket.map((c) =>
											!c ? null : (
												<tr key={c.id}>
													<td>{c.text}</td>

													<td>
														{c.commenter.firstName} {c.commenter.lastName}
													</td>
													<td>
														{new Date(parseInt(c.createdAt)).toLocaleDateString(
															'en-US'
														)}
													</td>
												</tr>
											)
										)}
									</tbody>
								</Table>
								<Formik
									initialValues={{ commentText: '' }}
									onSubmit={async (values, { setErrors }) => {
										const response = await createComment({
											commentText: values.commentText,
											ticketId: isTicketId,
										});
										if (response.data?.createComment.errors) {
											setErrors(
												toErrorMap(response?.data?.createComment.errors)
											);
										} else {
										}
									}}
								>
									{({ isSubmitting }) => (
										<Form>
											<Box mt={1}>
												<InputField
													textarea
													name="commentText"
													placeholder="comment text"
													label="Comment Text"
												/>
											</Box>

											<Button
												width="full"
												colorScheme="teal"
												mt={5}
												type="submit"
												isLoading={isSubmitting}
											>
												submit
											</Button>
										</Form>
									)}
								</Formik>
							</Card>
						</Col>
					</Row>
				</Container>
			</>
		);
	}
};

export default withUrqlClient(createUrqlClient)(ticket);
