import {axios} from "@/lib/axios";
import {ThingInStore} from "@/features/clientthinginstore/types";
import {ExtractFnReturnType, QueryConfig} from "@/lib/react-query";
import {useQuery} from "@tanstack/react-query";

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