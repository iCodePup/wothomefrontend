import {axios} from "@/lib/axios";
import {useNotificationStore} from "@/stores/notifications";
import {useMutation} from "@tanstack/react-query";
import {Room} from "@/features/houseplan/types";
import {MutationConfig, queryClient} from "@/lib/react-query";


export const deleteRoom = (id: number): Promise<boolean> => {
        return axios.delete('/houseplan/room' + id)
    }
;

type UseDeleteRoomOptions = {
    config?: MutationConfig<typeof deleteRoom>;
};

export const useDeleteRoom = ({config}: UseDeleteRoomOptions = {}) => {
    const {addNotification} = useNotificationStore();
    const mutation = useMutation<boolean, any, number>(deleteRoom, {
        onMutate: async (deletedRoom) => {
            await queryClient.cancelQueries(['rooms']);
            const previousRoom = queryClient.getQueryData<Room[]>(['rooms']);
            queryClient.setQueryData(
                ['rooms'],
                previousRoom?.filter(
                    (room) => room.id !== deletedRoom
                )
            );

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
                title: "La pièce est supprimée",
            });
        },
        ...config
    });

    return mutation;
};
