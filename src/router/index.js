
import News from "../components/News/News";
import Post from "../components/Post/Post";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Select from "../pages/Select/Select";
import Register from "../pages/Register/Register";
import Register2 from "../pages/Register2/Register2";
import Start from "../pages/Start/Start";
import Welcome from "../pages/Welcome/Welcome";
import Test from '../pages/Test/Test'
import Success from '../pages/Success/Success'
import EditProfile from '../pages/EditProfile/EditProfile'
import MyPost from "../pages/MyPost/MyPost";
import Requests from "../pages/Requests/Requests";
import Event from "../components/Event/Event";
import MyPal from '../pages/MyPal/MyPal'
import FirstMatch from '../pages/FirstMatch/FirstMatch'
import MsgBox from "../pages/MsgBox/MsgBox";
import Map from "../components/Map/Map";
import DisplayPic from "../components/DisplayPic/DisplayPic";
import About from "../pages/About/About";
const routes = [
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/start',
        element: <Start />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/beforeSignIn',
        element: <Register2 />
    },
    {
        path: '/welcome',
        element: <Welcome />
    },
    {
        path: '/select',
        element: <Select />
    },
    {
        path: 'success',
        element: <Success />
    },
    {
        path: '/home',
        element: <Home />,
        children: [
            {
                path: 'news',
                element: <News />
            },
            {
                path: 'post',
                element: <Post />
            },
            {
                path: 'myevent',
                element: <Event />
            }, {
                path: 'map',
                element: <Map />
            }, {
                path: 'displaypic',
                element: <DisplayPic />
            }
        ]
    },
    {
        path: 'editprofile',
        element: <EditProfile />
    },
    {
        path: 'mypost',
        element: <MyPost />
    },
    {
        path: '/test',
        element: <Test />
    },
    {
        path: '/requests',
        element: <Requests />
    },
    {
        path: '/myPal',
        element: <MyPal />
    }, {
        path: '/firstMatch',
        element: <FirstMatch />
    }, {
        path: '/messagebox',
        element: <MsgBox />
    }, {
        path: '/about',
        element: <About />
    }
]

export default routes;