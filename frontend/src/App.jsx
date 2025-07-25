import logo from './logo.svg';
import './App.css';
import Signup from './components/Signup/Signup';
import Header from './components/Header';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './RootLayout';
import Signin from './components/Signin/Signin';
import Home from './components/Home';
import LoginContextProvider from './components/context/LoginContextProvider';
import UserProfile from './components/UserProfile';
import ManagerProfile from './components/ManagerProfile';
import AdminProfile from './components/AdminProfile';
import Addmovie from './components/Addmovie';
import AddTheatre from './components/AddTheatre';
import AddManager from './components/AddManager';
import AssignTheatre from './components/AssignTheatre';
import Assignmovie from './components/AssignMovie';
import Movies from './components/Movies';
import TheatresList from './components/TheatresList';
import Ticket from './components/Ticket';
import { CityProvider } from './components/context/CityContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx'; 
import PastBookings from './components/PastBookings.jsx';


function App() {

    const browser=createBrowserRouter([{
    path:'',
    element:<RootLayout/>,
    children:[
      {
      path:'',
      element:<Home/>
      },
      {
        path:'/signup',
        element:<Signup/>
      },
      {
        path:'/signin',
        element:<Signin/>,
        
      },
      {
        path:'/userprofile',
        element:(<ProtectedRoute>
      <UserProfile />
    </ProtectedRoute>),
        children:[
        ]
      },{
            path:'bookings',
            element:(<ProtectedRoute>
      <PastBookings />
    </ProtectedRoute>)
          },
      {
        path:'/theatres/:movieId/:city',
        element:(<ProtectedRoute>
        <TheatresList/>
    </ProtectedRoute>)
      },{
      path:'/ticket/:bookingId',
      element:<Ticket/>
      },
      {
        path:'/managerprofile',
        element:(<ProtectedRoute>
      <ManagerProfile />
    </ProtectedRoute>),
        children:[{
          path:'assignmovie',
          element:<Assignmovie/> 
        }

        ]
      },
      {
        path:'/adminprofile',
        element:(<ProtectedRoute>
      <AdminProfile />
    </ProtectedRoute>),
        children:[{
          path:'addmovie',
          element:<Addmovie/>
        },
        {
          path:'addtheatre',
          element:<AddTheatre/>
        },
        {
        path:'addmanager',
        element:<AddManager/>
        },
        {
          path:'assign',
          element:<AssignTheatre/>
        }
        ]
      }
    ]
  }

  ])
  return (
    <CityProvider>
      <LoginContextProvider>
        <RouterProvider router={browser}/>
        </LoginContextProvider>
        </CityProvider>
      
    
  );
}

export default App;
