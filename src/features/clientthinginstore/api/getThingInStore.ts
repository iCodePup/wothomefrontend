import {axios} from "@/lib/axios";
import {ThingInStore} from "@/features/clientthinginstore/types";
import {ExtractFnReturnType, QueryConfig} from "@/lib/react-query";
import {useQuery} from "@tanstack/react-query";

export const getThingsInStore = (): Promise<ThingInStore[]> => {
    return axios.get('/thinginstore/available');
};

type QueryFnType = typeof getThingsInStore;

type UseThingsInStoreOptions = {
    config?: QueryConfig<QueryFnType>;
};

export const useThingsInStore = ({config}: UseThingsInStoreOptions = {}) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ['availablethinginstore'],
        queryFn: () => getThingsInStore(),
    });
};