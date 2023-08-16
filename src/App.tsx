import {AppRoutes} from '@/routes';
import {BrowserRouter} from "react-router-dom";
import {QueryClientProvider} from '@tanstack/react-query';

import React from "react";
import {AuthLoader} from "@/lib/auth";
import {queryClient} from './lib/react-query';
import {Notifications} from "@/components/notifications";


function App() {
    return (
        // <React.Suspense
        //     fallback={
        //         <div className="flex items-center justify-center w-screen h-screen">
        //             <CircularProgress/>
        //         </div>
        //     }>
        <QueryClientProvider client={queryClient} >
            <Notifications />
            <AuthLoader
                renderLoading={() => <div>Loading ...</div>}
                //renderUnauthenticated={() => App()}
            >
                <BrowserRouter>
                    <AppRoutes/>
                </BrowserRouter>
            </AuthLoader>
        </QueryClientProvider>
        // </React.Suspense>
    );
}

export default App;
