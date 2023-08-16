import {ExtractFnReturnType, QueryConfig} from "@/lib/react-query";
import {useQuery} from "@tanstack/react-query";
import Axios from "axios";
import {ThingInfo} from "@/features/homeautomation/types";

//create new axios instance for requesting Things to bypass context interceptor
export const instance = Axios.create({
    baseURL: "",
});

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    console.log(error)
    return {};
});

export const getThingInfo = (uri: string |undefined): Promise<ThingInfo> | null => {
    if(uri) {
        return instance.get(uri);
    }
    return null
};

type QueryFnType = typeof getThingInfo;

type UseThingInfoOptions = {
    config?: QueryConfig<QueryFnType>;
};

export const useThingInfo = (uri: string | undefined, {config}: UseThingInfoOptions = {}) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ['thinginfo_'+uri],
        queryFn: () => getThingInfo(uri)
    });
};