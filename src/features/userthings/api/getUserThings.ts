import {axios} from "@/lib/axios";
import {ExtractFnReturnType, QueryConfig} from "@/lib/react-query";
import {useQuery} from "@tanstack/react-query";
import {Thing} from "@/features/discoverthings/types";

export const getUserThings = (): Promise<Thing[]> => {
    return axios.get('/user/thing');
};

type QueryFnType = typeof getUserThings;

type UseUserThingOptions = {
    config?: QueryConfig<QueryFnType>;
};

export const useUserThing= ({config}: UseUserThingOptions = {}) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ['userthings'],
        queryFn: () => getUserThings(),
    });
};