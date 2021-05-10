import { useGetIntId } from './useGetIntId';
import { useFindProjectQuery } from '../generated/graphql';
export const useGetProjectFromUrl = () => {
	const intId = useGetIntId();
	return useFindProjectQuery({
		pause: intId === -1,
		variables: {
			id: intId,
		},
	});
};
