import {axios} from "@/lib/axios";
import {useNotificationStore} from "@/stores/notifications";
import {useMutation} from "@tanstack/react-query";
import {ThingInStore} from "@/features/adminmanagethings/types";
import {MutationConfig, queryClient} from "@/lib/react-query";


export const deleteThingInStore = (id: number): Promise<boolean> => {
        return axios.delete('/thinginstore/' + id)
    }
;

type UseDeleteThingInStoreOptions = {
    config?: MutationConfig<typeof deleteThingInStore>;
};

export const useDeleteThingInStore = ({config}: UseDeleteThingInStoreOptions = {}) => {
    const {addNotification} = useNotificationStore();
    const mutation = useMutation<boolean, any, number>(deleteThingInStore, {
        onMutate: async (deletedThingInStore) => {
            await queryClient.cancelQueries(['thinginstore']);
            const previousThingInStore = queryClient.getQueryData<ThingInStore[]>(['thinginstore']);
            queryClient.setQueryData(
                ['thinginstore'],
                previousThingInStore?.filter(
                    (thingInStore) => thingInStore.id !== deletedThingInStore
                )
            );

            return {previousThingInStore};
        },
        onError: (error, _, context: any) => {
            if (context?.previousThingInStore) {
                queryClient.setQueryData(['thinginstore'], context.previousThingInStore);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['thinginstore']);
            addNotification({
                type: 'success',
                title: "L'objet connecté est supprimé",
            });
        },
        ...config
    });

    return mutation;
};
