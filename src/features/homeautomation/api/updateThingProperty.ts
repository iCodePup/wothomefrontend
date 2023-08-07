import {axios} from "@/lib/axios";
import {useNotificationStore} from "@/stores/notifications";
import {useMutation} from "@tanstack/react-query";
import {queryClient} from "@/lib/react-query";
import {ThingProperties} from "@/features/homeautomation/types";


export const useUpdateThingProperty = (uri: string | undefined) => {
    const {addNotification} = useNotificationStore();
    const mutation = useMutation<ThingProperties, any, ThingProperties>({
        mutationFn: (data) => {
            const propertyUri = Object.keys(data)[0];
            const requestOptions = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            };
            return fetch(uri + '/properties/' + propertyUri, requestOptions)
                .then(response => response.json())
        },
        onMutate: async (thing) => {
            await queryClient.cancelQueries(['thingproperties_' + uri]);
            return {thing};
        },
        onError: (error, _, context: any) => {
            if (context?.previousThingInStore) {
                queryClient.setQueryData(['thingproperties_' + uri], context.previousThingInStore);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['thingproperties_' + uri]);
            addNotification({
                type: 'success',
                title: "La propriété de votre objet connecté a été mise à jour.",
            });
        },
    });

    return mutation;
};
