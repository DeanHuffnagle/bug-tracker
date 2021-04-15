import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

type InputFieldProps = {
	label: string;
	name: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputField: React.FC<InputFieldProps> = ({
	label,
	size: _,
	...props
}) => {
	const [field, { error }] = useField(props);
	return (
		<FormControl isInvalid={!!error}>
			<FormLabel htmlFor={field.name}>{label}</FormLabel>
			<Input
				{...field}
				{...props}
				onChange={field.onChange}
				id={field.name}
				placeholder={props.placeholder}
			/>
			{error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
		</FormControl>
	);
};
