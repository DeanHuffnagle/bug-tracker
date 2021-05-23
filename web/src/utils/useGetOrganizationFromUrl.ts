import { useFindOrganizationQuery } from '../generated/graphql';
import { useGetIntId } from './useGetIntId';
export const useGetOrganizationFromUrl = () => {
	const intId = useGetIntId();
	return useFindOrganizationQuery({
		pause: intId === -1,
		variables: {
			id: intId,
		},
	});
};
