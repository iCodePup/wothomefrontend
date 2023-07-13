import {axios} from "@/lib/axios";
import {ThingInStore, ThingType} from "@/features/adminmanagethings/types";
import {ExtractFnReturnType, QueryConfig} from "@/lib/react-query";
import {useQuery} from "@tanstack/react-query";

export const getThingsInStore = (): Promise<ThingInStore[]> => {
    return axios.get('/thinginstore');
};

type QueryFnType = typeof getThingsInStore;

type UseThingsInStoreOptions = {
    config?: QueryConfig<QueryFnType>;
};

export const useThingsInStore = ({config}: UseThingsInStoreOptions = {}) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ['thinginstore'],
        queryFn: () => getThingsInStore(),
    });
};