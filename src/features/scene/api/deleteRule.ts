import {axios} from "@/lib/axios";
import {useNotificationStore} from "@/stores/notifications";
import {useMutation} from "@tanstack/react-query";
import {MutationConfig, queryClient} from "@/lib/react-query";


export const deleteRule = (id: number): Promise<boolean> => {
        return axios.delete('/rule/' + id)
    }
;

type UseDeleteRuleOptions = {
    config?: MutationConfig<typeof deleteRule>;
};

export const useDeleteRule = ({config}: UseDeleteRuleOptions = {}) => {
    const {addNotification} = useNotificationStore();
    const mutation = useMutation<boolean, any, any>(deleteRule, {
        onMutate: async (rule) => {
            await queryClient.cancelQueries(['rules']);
            return {rule};
        },
        onError: (error, _, context: any) => {
            if (context?.rule) {
                queryClient.setQueryData(['rules'], context.rule);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['rules']);
            addNotification({
                type: 'success',
                title: "La règle est supprimée",
            });
        },
        ...config
    });

    return mutation;
};
