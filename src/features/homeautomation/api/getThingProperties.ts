import {ExtractFnReturnType, QueryConfig} from "@/lib/react-query";
import {useQuery} from "@tanstack/react-query";
import {ThingProperties} from "@/features/homeautomation/types";
import Axios from "axios";

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

export const getThingProperties = (uri: string | undefined): Promise<ThingProperties> | null => {
    if (uri) {
        return instance.get(uri + "/properties");
    }
    return null
};

type QueryFnType = typeof getThingProperties;

type UseThingPropertiesOptions = {
    config?: QueryConfig<QueryFnType>;
};

export const useThingProperties = (uri: string | undefined, {config}: UseThingPropertiesOptions = {}) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ['thingproperties_' + uri],
        queryFn: () => getThingProperties(uri),
        refetchInterval: 5000,//polling 5s
    });
};