import {axios} from "@/lib/axios";
import {useNotificationStore} from "@/stores/notifications";
import {useMutation} from "@tanstack/react-query";
import {ThingInStore} from "@/features/adminmanagethings/types";
import {MutationConfig, queryClient} from "@/lib/react-query";


export const stopClientThing = (t: ThingInStore): Promise<boolean> => {
        return axios.post('/client/thinginstore/stop', t)
    }
;

type UseStopClientThingOptions = {
    config?: MutationConfig<typeof stopClientThing>;
};

export const useStopClientThing = ({config}: UseStopClientThingOptions = {}) => {
    const {addNotification} = useNotificationStore();
    const mutation = useMutation<boolean, any, ThingInStore>(stopClientThing, {
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
                title: "Votre objet connecté est arreté.",
            });
        },
        ...config
    });

    return mutation;
};
