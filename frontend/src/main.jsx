import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { Provider } from "react-redux";
import { store } from "./redux/store";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Create a new router instance
const router = createRouter({ routeTree });

// Create a client
const queryClient = new QueryClient();

// Render the app
const rootElement = document.getElementById("root");
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Provider>
    </StrictMode>
  );
}
