import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Textarea,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> &
	InputHTMLAttributes<HTMLTextAreaElement> & {
		label: string;
		name: string;
		textarea?: boolean;
		required?: boolean;
	};

export const InputField: React.FC<InputFieldProps> = ({
	label,
	textarea,
	required,
	size: _,
	...props
}) => {
	let InputOrTextarea = textarea ? Textarea : Input;
	let RequiredOrNot = required ? true : false;

	const [field, { error }] = useField(props);
	return (
		<FormControl isInvalid={!!error} isRequired={RequiredOrNot}>
			<FormLabel htmlFor={field.name}>{label}</FormLabel>
			<InputOrTextarea
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
