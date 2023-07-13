import {axios} from "@/lib/axios";
import {ThingInStore, ThingType} from "@/features/adminmanagethings/types";
import {ExtractFnReturnType, QueryConfig} from "@/lib/react-query";
import {useQuery} from "@tanstack/react-query";

export const getAvailableThingsInStore = (): Promise<ThingInStore[]> => {
    return axios.get('/thinginstore/available');
};

type QueryFnType = typeof getAvailableThingsInStore;

type UseAvailableThingsInStoreOptions = {
    config?: QueryConfig<QueryFnType>;
};

export const useAvailableThingsInStore = ({config}: UseAvailableThingsInStoreOptions = {}) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ['availablethinginstore'],
        queryFn: () => getAvailableThingsInStore(),
    });
};