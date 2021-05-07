import { Link } from '@chakra-ui/layout';
import NextLink from 'next/link';

export const linkTo = (
	linkInput: string,
	children: string,
	asInput?: string
) => {
	if (asInput) {
		const display = children;
		return (
			<>
				<NextLink href={linkInput} as={asInput}>
					<Link>{display}</Link>
				</NextLink>
			</>
		);
	} else {
		return (
			<>
				<NextLink href={linkInput}>
					<td>{children}</td>
				</NextLink>
			</>
		);
	}
};
