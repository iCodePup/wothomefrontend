import {axios} from "@/lib/axios";
import {ThingInStore} from "@/features/adminmanagethings/types";
import {MutationConfig, queryClient} from '@/lib/react-query';
import {useNotificationStore} from '@/stores/notifications';
import {useMutation} from "@tanstack/react-query";

export type ThingInStoreDTO = {
    id: number;
    thingId: string;
    name: string;
    description: string;
    prix: number;
};

export const createThingInStore = (data: ThingInStoreDTO): Promise<any> => {
    return axios.post('/thinginstore', data);
};

type UseCreateThingInStoreOptions = {
    config?: MutationConfig<typeof createThingInStore>;
};

export const useCreateThingInStore = ({config}: UseCreateThingInStoreOptions = {}) => {
    const {addNotification} = useNotificationStore();
    const mutation = useMutation<ThingInStore, any, ThingInStoreDTO>(createThingInStore, {
        onMutate: async (newThingInStore) => {
            await queryClient.cancelQueries(['thinginstore']);
            const previousThingInStore = queryClient.getQueryData<ThingInStore[]>(['thinginstore']);
            const isFound = previousThingInStore?.some(element => {
                if (element.id === newThingInStore.id) {
                    return true;
                }
                return false;
            });
            if (!isFound) {
                queryClient.setQueryData(['thinginstore'], [...(previousThingInStore || []), newThingInStore]);
            }
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
                title: "L'objet connecté est sauvegardé",
            });
        },
        ...config
    });

    return mutation;
};
