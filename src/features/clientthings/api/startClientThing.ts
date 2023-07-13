import {axios} from "@/lib/axios";
import {useNotificationStore} from "@/stores/notifications";
import {useMutation} from "@tanstack/react-query";
import {ThingInStore} from "@/features/adminmanagethings/types";
import {MutationConfig, queryClient} from "@/lib/react-query";


export const startClientThing = (t: ThingInStore): Promise<boolean> => {
        return axios.post('/client/thinginstore/start', t)
    }
;

type UseStartClientThingOptions = {
    config?: MutationConfig<typeof startClientThing>;
};

export const useStartClientThing = ({config}: UseStartClientThingOptions = {}) => {
    const {addNotification} = useNotificationStore();
    const mutation = useMutation<boolean, any, ThingInStore>(startClientThing, {
        onMutate: async (thing) => {
            await queryClient.cancelQueries(['clientthinginstore']);
            return {thing};
        },
        onError: (error, _, context: any) => {
            if (context?.previousThingInStore) {
                queryClient.setQueryData(['clientthinginstore'], context.previousThingInStore);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['clientthinginstore']);
            addNotification({
                type: 'success',
                title: "Votre objet connecté est démarré.",
            });
        },
        ...config
    });

    return mutation;
};
