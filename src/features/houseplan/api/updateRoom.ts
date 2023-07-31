import {axios} from "@/lib/axios";
import {Room} from "@/features/houseplan/types";
import {MutationConfig, queryClient} from '@/lib/react-query';
import {useNotificationStore} from '@/stores/notifications';
import {useMutation} from "@tanstack/react-query";

export type RoomDTO = {
    id: number;
    name: string;
    surface: number;
    thingsId: [];
};

export const updateRoom = (data: RoomDTO): Promise<any> => {
    return axios.put('/houseplan/room', data);
};

type UseUpdateRoomOptions = {
    config?: MutationConfig<typeof updateRoom>;
};

export const useUpdateRoom = ({config}: UseUpdateRoomOptions = {}) => {
    const {addNotification} = useNotificationStore();
    const mutation = useMutation<Room, any, RoomDTO>(updateRoom, {
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
