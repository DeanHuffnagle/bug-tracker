import { CheckIcon, CloseIcon, DeleteIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import React from 'react';
import {
	useAcceptJoinRequestMutation,
	useDeclineJoinRequestMutation,
	useDeleteCommentMutation,
	useMeQuery,
} from '../generated/graphql';

type DeclineJoinRequestButtonProps = {
	userIdInput: number;
};

export const DeclineJoinRequestButton: React.FC<DeclineJoinRequestButtonProps> =
	({ userIdInput }) => {
		const [{ data: meData }] = useMeQuery();
		const [{}, declineRequest] = useDeclineJoinRequestMutation();
		const isOrganizationId = meData?.me?.organizationId;
		return (
			<>
				<IconButton
					aria-label="accept join request"
					icon={<CloseIcon />}
					size="xs"
					color="red"
					onClick={() => {
						declineRequest({
							options: {
								userId: userIdInput,
								organizationId: isOrganizationId as number,
							},
						});
					}}
				/>
			</>
		);
	};
