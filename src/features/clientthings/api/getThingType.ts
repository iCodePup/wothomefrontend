import {axios} from "@/lib/axios";
import {ExtractFnReturnType, QueryConfig} from "@/lib/react-query";
import {useQuery} from "@tanstack/react-query";
import { ThingType } from "../types";

export const getThingTypes = (): Promise<ThingType[]> => {
    return axios.get('/thing/type');
};

type QueryFnType = typeof getThingTypes;

type UseThingTypesOptions = {
    config?: QueryConfig<QueryFnType>;
};

export const useThingTypes = ({config}: UseThingTypesOptions = {}) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ['thingtypes'],
        queryFn: () => getThingTypes(),
    });
};