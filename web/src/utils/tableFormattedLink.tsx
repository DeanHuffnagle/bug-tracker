import Link from 'next/link';
import React from 'react';

export const tableFormattedLink = (cellInput: string) => {
	switch (cellInput) {
		case '':
			return <span>-</span>;

		default:
			return (
				<Link href={`${cellInput}`}>
					<span id="clickable-text">{cellInput}</span>
				</Link>
			);
	}
};
