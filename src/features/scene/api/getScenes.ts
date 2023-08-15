import {axios} from "@/lib/axios";
import {ExtractFnReturnType, QueryConfig} from "@/lib/react-query";
import {useQuery} from "@tanstack/react-query";
import {Thing} from "@/features/discoverthings/types";

export const getRules = (): Promise<Thing[]> => {
    return axios.get('/rule');
};

type QueryFnType = typeof getRules;

type UseThingsOptions = {
    config?: QueryConfig<QueryFnType>;
};

export const useRules = ({config}: UseThingsOptions = {}) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ['rules'],
        queryFn: () => getRules()
    });
};