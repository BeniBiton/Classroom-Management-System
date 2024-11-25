import React from "react";
import store from "./redux/store";
import Router from "./routes/Router";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProviderWithContext } from "./themes/ThemeContext";
import ClassFetcher from "./pages/components/ClassFetcher/ClassFetcher";

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <ThemeProviderWithContext>
        <ClassFetcher>
          <Router />
        </ClassFetcher>
      </ThemeProviderWithContext>
    </Provider>
  </QueryClientProvider>
);

export default App;
