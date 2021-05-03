import { Box } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import DevTicketsTable from '../components/DevTicketsTable';
import { NavBar } from '../components/NavBar';
import { useMeQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

const Tickets = () => {
	const [{ data: meData }] = useMeQuery();
	let body = null;
	if (!meData?.me) {
		body = null;
	} else {
		body = (
			<>
				<Container>
					<Row>
						<Col className="mt-2">
							<DevTicketsTable />
						</Col>
					</Row>
				</Container>
			</>
		);
	}
	return (
		<>
			<NavBar page="Tickets" />
			{body}
		</>
	);
};

export default withUrqlClient(createUrqlClient)(Tickets);
