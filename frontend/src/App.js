import logo from './logo.svg';
import './App.css';
import Room from './routes/Room';
import CreateRoom from './routes/CreateRoom';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { useEffect, useRef } from 'react';

import io from "socket.io-client";



function App() {

  const socketRef = useRef()

  const router = createBrowserRouter([
    {
      path: "/",
      element: <CreateRoom />,
      // loader: rootLoader,
     
    },
    {
      path: "room/:id",
      element: <Room socket={socketRef}/>,
      // loader: teamLoader,
    },
   
  ]);


  useEffect(()=>{
    socketRef.current = io.connect("http://localhost:8000")
    if(socketRef.current != undefined) {
      socketRef.current.on('connected', (data)=> {
        console.log(data,'zzz')
      })
      console.log(socketRef.current, "connected")
    }
  },[])
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
