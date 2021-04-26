import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '../components/InputField';
import { useCreateCommentMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useGetIntId } from '../utils/useGetIntId';

const test: React.FC<{}> = ({}) => {
	const router = useRouter();
	const [{}, createComment] = useCreateCommentMutation();
	const isTicketId = 5;
	const intId = useGetIntId();
	return (
		<Flex
			flex="1"
			bg="black"
			alignItems="center"
			style={{
				backgroundImage: `url("http://localhost:3000/background.png")`,
				backgroundSize: '100%',
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
							<Heading>Test</Heading>
						</Box>

						<Box my={4} textAlign="left">
							<Formik
								initialValues={{ commentText: '' }}
								onSubmit={async (values, { setErrors }) => {
									await createComment({
										commentText: values.commentText,
										ticketId: isTicketId,
									});
								}}
							>
								{({ isSubmitting }) => (
									<Form>
										<Box mt={4}>
											<InputField
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

export default withUrqlClient(createUrqlClient)(test);
