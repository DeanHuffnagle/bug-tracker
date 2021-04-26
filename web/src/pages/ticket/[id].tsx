import { Box, Heading, Text } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import NavBar from '../../components/NavBar';
import { useFindCommentsByTicketQuery } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { useGetTicketFromUrl } from '../../utils/useGetTicketFromUrl';

interface TicketProps {}

const Ticket = ({}) => {
	const [{ data, error, fetching }] = useGetTicketFromUrl();
	const isTicketId = data?.findTicket?.id;
	const [{ data: commentData }] = useFindCommentsByTicketQuery({
		variables: {
			options: {
				ticketId: isTicketId as number,
			},
		},
	});
	let body = null;
	if (fetching) {
		body = <Box>Loading...</Box>;
	}
	if (!data?.findTicket) {
		body = <Box>Could not find ticket.</Box>;
	} else {
		body = (
			<Container>
				<Row>
					<Col>
						<Heading>{data.findTicket?.title}</Heading>
						<Box mb={4}>{data.findTicket?.text}</Box>
					</Col>
					<Col>
						{commentData?.findCommentsByTicket.map((c) =>
							!c ? null : (
								<Box>
									<Text>{c.text}</Text>
									<Text>
										{' '}
										{'by '} {c.commenter.firstName} {c.commenter.lastName}
									</Text>
								</Box>
							)
						)}
					</Col>
				</Row>
			</Container>
		);
	}
	return (
		<>
			<NavBar />
			{body}
		</>
	);
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Ticket);
