import {axios} from "@/lib/axios";
import {Room} from "@/features/homeautomation/types";
import {ExtractFnReturnType, QueryConfig} from "@/lib/react-query";
import {useQuery} from "@tanstack/react-query";

export const getRooms = (): Promise<Room[]> => {
    return axios.get('/houseplan/room/things');
};

type QueryFnType = typeof getRooms;

type UseRoomsOptions = {
    config?: QueryConfig<QueryFnType>;
};

export const useRooms = ({config}: UseRoomsOptions = {}) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ['rooms'],
        queryFn: () => getRooms(),
    });
};