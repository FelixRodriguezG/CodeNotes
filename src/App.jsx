import { RouterProvider } from 'react-router-dom'
import { router } from "./router/router";
import LoadingScreen from "./components/LoadingScreen";
import { NotesProvider } from "./context/NotesContext"; 
import "./App.css";


function App() {
  return (
    <NotesProvider>
      <RouterProvider
        router={router}
        fallbackElement={<LoadingScreen />}
      />
    </NotesProvider>
  );
}

export default App;
