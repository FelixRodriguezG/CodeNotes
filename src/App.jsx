import { RouterProvider } from 'react-router-dom'
import { router } from "./router/router";
import LoadingScreen from "./components/LoadingScreen";
import "./App.css";

function App() {
  return (
    <RouterProvider
      router={router}
      fallbackElement={<LoadingScreen />}
    />
  );
}

export default App;
