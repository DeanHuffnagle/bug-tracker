import Link from 'next/link';
import React from 'react';

export const tableFormattedExternalLink = (cellInput: string) => {
	if (!cellInput) {
		return <span>-</span>;
	} else {
		return (
			<a target="_blank" href={`${cellInput}`} rel="noopener noreferrer">
				<span id="clickable-text">{cellInput}</span>
			</a>
		);
	}
};
