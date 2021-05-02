import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '../components/InputField';
import {
	useCreateCommentMutation,
	useFindAssignedTicketsQuery,
	useFindRawAssignedTicketsQuery,
} from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useGetIntId } from '../utils/useGetIntId';

const test: React.FC<{}> = ({}) => {
	const router = useRouter();
	const [{ data: ticketData }] = useFindRawAssignedTicketsQuery();
	const isTicketId = 5;
	const intId = useGetIntId();
	if (!ticketData?.findRawAssignedTickets) {
		return null;
	}

	return (
		<>
			<div>
				{JSON.stringify(ticketData.findRawAssignedTickets.reverse(), null, 2)}
			</div>
		</>
	);
};

export default withUrqlClient(createUrqlClient)(test);
