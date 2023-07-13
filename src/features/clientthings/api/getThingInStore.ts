import {axios} from "@/lib/axios";
import {ExtractFnReturnType, QueryConfig} from "@/lib/react-query";
import {useQuery} from "@tanstack/react-query";
import {ThingInStore} from "@/features/clientthings/types";

export const getClientThings = (): Promise<ThingInStore[]> => {
    return axios.get('/client/thinginstore');
};

type QueryFnType = typeof getClientThings;

type UseThingsInStoreOptions = {
    config?: QueryConfig<QueryFnType>;
};

export const useClientThings= ({config}: UseThingsInStoreOptions = {}) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ['clientthinginstore'],
        queryFn: () => getClientThings(),
    });
};