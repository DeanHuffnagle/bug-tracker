import { useGetIntId } from './useGetIntId';
import { useFindTicketQuery } from '../generated/graphql';
export const useGetTicketFromUrl = () => {
	const intId = useGetIntId();
	return useFindTicketQuery({
		pause: intId === -1,
		variables: {
			id: intId,
		},
	});
};
