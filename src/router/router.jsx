import { createBrowserRouter } from "react-router-dom"
import Layout from "../layout/Layout"
import Home from "../pages/Home"
import NoteDetail from "../pages/NoteDetail"
import NoteForm from "../pages/NoteForm"
import NotesList from "../pages/NotesList"
import NotFound from "../pages/NotFound"


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { 
        path: "/notes", 
        children: [
          { index: true, element: <NotesList /> },
          { path: "new", element: <NoteForm /> },      // Para crear nueva nota
          { path: ":id/edit", element: <NoteForm /> }, // Para editar nota existente
          { path: ":id", element: <NoteDetail /> }     // Para ver detalle de nota
        ]
      },
      { path: "/form", element: <NoteForm /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);