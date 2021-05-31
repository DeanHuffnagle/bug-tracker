import { CheckIcon, DeleteIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import React from 'react';
import {
	useAcceptJoinRequestMutation,
	useDeleteCommentMutation,
	useMeQuery,
} from '../generated/graphql';

type AcceptJoinRequestButtonProps = {
	userIdInput: number;
};

export const AcceptJoinRequestButton: React.FC<AcceptJoinRequestButtonProps> =
	({ userIdInput }) => {
		const [{ data: meData }] = useMeQuery();
		const [{}, acceptRequest] = useAcceptJoinRequestMutation();
		const isOrganizationId = meData?.me?.organizationId;
		return (
			<>
				<IconButton
					aria-label="accept join request"
					icon={<CheckIcon />}
					size="xs"
					color="green"
					onClick={() => {
						acceptRequest({
							options: {
								userId: userIdInput,
								organizationId: isOrganizationId as number,
							},
						});
						alert('request accepted.');
						alert({ userIdInput });
					}}
				/>
			</>
		);
	};
