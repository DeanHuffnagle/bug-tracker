export const tableFormatted = (cellInput: string) => {
	let value = '';
	switch (cellInput) {
		case 'null null':
			value = '-';
			break;
		case 'low':
			value = 'Low';
			break;
		case 'medium':
			value = 'Medium';
			break;
		case 'high':
			value = 'High';
			break;
		case 'unassigned':
			value = 'Unassigned';
			break;
		case 'inProgress':
			value = 'In Progress';
			break;
		case 'awaitingConfirmation':
			value = 'Awaiting Confirmation';
			break;
		case 'resolved':
			value = 'Resolved';
			break;
		case 'bugOrError':
			value = 'Bug/Error';
			break;
		case 'featureRequest':
			value = 'Feature Request';
			break;
		case 'trainingRequest':
			value = 'Training Request';
			break;
		case 'other':
			value = 'Other';
			break;
		default:
			value = `${cellInput}`;
			break;
	}
	return value;
};
