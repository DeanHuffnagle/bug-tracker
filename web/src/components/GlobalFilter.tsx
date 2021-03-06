import React from 'react';
import { Input } from '@chakra-ui/react';
import { FormControl, InputGroup } from 'react-bootstrap';

type GlobalFilterProps = {
	filter: any;
	setFilter: any;
};

export const GlobalFilter: React.FC<GlobalFilterProps> = ({
	filter,
	setFilter,
}) => {
	return (
		<span>
			<InputGroup size="sm" className="mb-3">
				<InputGroup.Prepend>
					<InputGroup.Text id="inputGroup-sizing-sm">Search:</InputGroup.Text>
				</InputGroup.Prepend>
				<FormControl
					onChange={(e) => setFilter(e.target.value)}
					aria-label="Small"
					aria-describedby="inputGroup-sizing-sm"
				/>
			</InputGroup>
		</span>
	);
};
