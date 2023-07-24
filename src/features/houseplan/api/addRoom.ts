import {axios} from "@/lib/axios";
import {Room} from "@/features/houseplan/types";
import {MutationConfig, queryClient} from '@/lib/react-query';
import {useNotificationStore} from '@/stores/notifications';
import {useMutation} from "@tanstack/react-query";

export type RoomDTO = {
    id: number;
    name: string;
    surface: number;
};

export const addRoom = (data: RoomDTO): Promise<any> => {
    return axios.post('/houseplan/room', data);
};

type UseAddRoomOptions = {
    config?: MutationConfig<typeof addRoom>;
};

export const useAddRoom = ({config}: UseAddRoomOptions = {}) => {
    const {addNotification} = useNotificationStore();
    const mutation = useMutation<Room, any, RoomDTO>(addRoom, {
        onMutate: async (newRoom) => {
            await queryClient.cancelQueries(['rooms']);
            const previousRoom = queryClient.getQueryData<Room[]>(['rooms']);
            const isFound = previousRoom?.some(element => {
                if (element.id === newRoom.id) {
                    return true;
                }
                return false;
            });
            if (!isFound) {
                queryClient.setQueryData(['rooms'], [...(previousRoom || []), newRoom]);
            }
            return {previousRoom};
        },
        onError: (error, _, context: any) => {
            if (context?.previousRoom) {
                queryClient.setQueryData(['rooms'], context.previousRoom);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['rooms']);
            addNotification({
                type: 'success',
                title: "La pièce est sauvegardée",
            });
        },
        ...config
    });

    return mutation;
};
