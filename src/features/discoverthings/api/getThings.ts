import {axios} from "@/lib/axios";
import {ExtractFnReturnType, QueryConfig} from "@/lib/react-query";
import {useQuery} from "@tanstack/react-query";
import {Thing} from "@/features/discoverthings/types";

export const getThings = (): Promise<Thing[]> => {
    return axios.get('/things');
};

type QueryFnType = typeof getThings;

type UseThingsOptions = {
    config?: QueryConfig<QueryFnType>;
};

export const useThings = ({config}: UseThingsOptions = {}) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ['things'],
        queryFn: () => getThings(),
        refetchInterval: 5000,//polling 5s
    });
};