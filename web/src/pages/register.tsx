import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
	const router = useRouter();
	const [, register] = useRegisterMutation();
	return (
		<Wrapper variant="small">
			<Formik
				initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
				onSubmit={async (values, { setErrors }) => {
					const response = await register(values);
					if (response.data?.register.errors) {
						setErrors(toErrorMap(response.data.register.errors));
					} else if (response.data.register.user) {
						router.push('/');
					}
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<InputField
							name="firstName"
							placeholder="first name"
							label="First name"
						/>
						<Box mt={4}>
							<InputField
								name="lastName"
								placeholder="last name"
								label="Last name"
							/>
							<Box mt={4}>
								<InputField name="email" placeholder="email" label="Email" />
							</Box>
						</Box>
						<Box mt={4}>
							<InputField
								name="password"
								placeholder="password"
								label="Password"
								type="password"
							/>
						</Box>

						<Button mt={4} type="submit" isLoading={isSubmitting}>
							Register
						</Button>
					</Form>
				)}
			</Formik>
		</Wrapper>
	);
};

export default Register;
