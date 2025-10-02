import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext';
import { router } from "./router/router";
import LoadingScreen from "./components/LoadingScreen";
import { NotesProvider } from "./context/NotesContext"; 
import "./App.css";


function App() {
  return (
    <ThemeProvider>
    <NotesProvider>
      <RouterProvider
        router={router}
        fallbackElement={<LoadingScreen />}
      />
    </NotesProvider>
    </ThemeProvider>
  );
}

export default App;
