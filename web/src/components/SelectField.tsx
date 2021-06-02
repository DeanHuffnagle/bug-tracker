import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Select,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

type SelectFieldProps = InputHTMLAttributes<HTMLSelectElement> &
	InputHTMLAttributes<HTMLTextAreaElement> & {
		label: string;
		name: string;
		required?: boolean;
	};

export const SelectField: React.FC<SelectFieldProps> = ({
	label,
	children,
	required,
	size: _,
	...props
}) => {
	let RequiredOrNot = required ? true : false;

	const [field, { error }] = useField(props);
	return (
		<FormControl isInvalid={!!error} isRequired={RequiredOrNot}>
			<FormLabel htmlFor={field.name}>{label}</FormLabel>
			<Select
				{...field}
				{...props}
				onChange={field.onChange}
				id={field.name}
				placeholder={props.placeholder}
			>
				{children}
			</Select>
			{error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
		</FormControl>
	);
};
