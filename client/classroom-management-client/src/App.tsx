import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Router from "./routes/Router";
import { Provider } from "react-redux";
import store from "./redux/store";
import ClassFetcher from "./pages/components/ClassFetcher/ClassFetcher";
import { ThemeProviderWithContext } from "./themes/ThemeContext";

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
