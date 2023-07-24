import {axios} from "@/lib/axios";
import {useNotificationStore} from "@/stores/notifications";
import {useMutation} from "@tanstack/react-query";
import {MutationConfig, queryClient} from "@/lib/react-query";
import {Thing} from "../types";


export const addClientThing = (t: Thing): Promise<boolean> => {
        return axios.post('/user/thing', t)
    }
;

type UseAddClientThingOptions = {
    config?: MutationConfig<typeof addClientThing>;
};

export const useAddClientThing = ({config}: UseAddClientThingOptions = {}) => {
    const {addNotification} = useNotificationStore();
    const mutation = useMutation<boolean, any, Thing>(addClientThing, {
        onMutate: async (thing) => {
            await queryClient.cancelQueries(['userthings']);
            return {thing};
        },
        onError: (error, _, context: any) => {
            if (context?.previousThingInStore) {
                queryClient.setQueryData(['userthings'], context.previousThingInStore);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['userthings']);
            addNotification({
                type: 'success',
                title: "Votre objet connecté est ajouté à la liste de vos objets.",
            });
        },
        ...config
    });

    return mutation;
};
