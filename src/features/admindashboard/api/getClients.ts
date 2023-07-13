import {axios} from "@/lib/axios";
import {ExtractFnReturnType, QueryConfig} from "@/lib/react-query";
import {useQuery} from "@tanstack/react-query";
import {Client} from "@/features/authentification";

export const getClients = (): Promise<Client[]> => {
    return axios.get('/client');
};

type QueryFnType = typeof getClients;

type UseClientOptions = {
    config?: QueryConfig<QueryFnType>;
};

export const useClients = ({config}: UseClientOptions = {}) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ['clients'],
        queryFn: () => getClients(),
    });
};