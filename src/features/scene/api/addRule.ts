import {axios} from "@/lib/axios";
import {useNotificationStore} from "@/stores/notifications";
import {useMutation} from "@tanstack/react-query";
import {MutationConfig, queryClient} from "@/lib/react-query";


export const addRule = (json: string): Promise<boolean> => {
        return axios.post('/rule', json)
    }
;

type UseAddRuleOptions = {
    config?: MutationConfig<typeof addRule>;
};

export const useAddRule = ({config}: UseAddRuleOptions = {}) => {
    const {addNotification} = useNotificationStore();
    const mutation = useMutation<boolean, any, any>(addRule, {
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
                title: "Votre règle est ajoutée à votre liste.",
            });
        },
        ...config
    });

    return mutation;
};
