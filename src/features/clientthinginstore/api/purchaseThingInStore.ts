import {axios} from "@/lib/axios";
import {useNotificationStore} from "@/stores/notifications";
import {useMutation} from "@tanstack/react-query";
import {ThingInStore} from "@/features/adminmanagethings/types";
import {MutationConfig, queryClient} from "@/lib/react-query";


export const purchaseThingInStore = (t: ThingInStore): Promise<boolean> => {
        return axios.post('/client/thinginstore', t)
    }
;

type UsePurchaseThingInStoreOptions = {
    config?: MutationConfig<typeof purchaseThingInStore>;
};

export const usePurchaseThingInStore = ({config}: UsePurchaseThingInStoreOptions = {}) => {
    const {addNotification} = useNotificationStore();
    const mutation = useMutation<boolean, any, ThingInStore>(purchaseThingInStore, {
        onMutate: async (deletedThingInStore) => {
            await queryClient.cancelQueries(['availablethinginstore']);
            const previousThingInStore = queryClient.getQueryData<ThingInStore[]>(['availablethinginstore']);
            queryClient.setQueryData(
                ['availablethinginstore'],
                previousThingInStore?.filter(
                    (thingInStore) => thingInStore.id !== deletedThingInStore.id
                )
            );

            return {previousThingInStore};
        },
        onError: (error, _, context: any) => {
            if (context?.previousThingInStore) {
                queryClient.setQueryData(['availablethinginstore'], context.previousThingInStore);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['availablethinginstore']);
            addNotification({
                type: 'success',
                title: "Merci pour votre achat. Vous pouvez désormais retrouver votre objet connecté dans votre liste",
            });
        },
        ...config
    });

    return mutation;
};
