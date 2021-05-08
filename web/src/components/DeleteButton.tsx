import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import React from 'react';
import { useDeleteCommentMutation } from '../generated/graphql';

type DeleteButtonProps = {
	commentIdInput: number;
};

export const DeleteButton: React.FC<DeleteButtonProps> = ({
	commentIdInput,
}) => {
	const [{}, deleteComment] = useDeleteCommentMutation();
	return (
		<>
			<IconButton
				aria-label="delete comment"
				icon={<DeleteIcon />}
				size="xs"
				onClick={() => {
					console.log('deleted comment', commentIdInput);
					deleteComment({ commentId: commentIdInput });
				}}
			/>
		</>
	);
};
