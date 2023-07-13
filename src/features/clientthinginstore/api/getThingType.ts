import {axios} from "@/lib/axios";
import {ThingType} from "@/features/clientthinginstore/types";
import {ExtractFnReturnType, QueryConfig} from "@/lib/react-query";
import {useQuery} from "@tanstack/react-query";

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