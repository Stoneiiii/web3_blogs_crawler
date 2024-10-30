import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './home/page.tsx'

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children:[
      {
        path: '',
        element: <Home/> ,
      }
    ]
  },
])

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>,
)