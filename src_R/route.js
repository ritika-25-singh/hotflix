// we import all the pages that we want to add to our app
import LandingPage from './pages/LandingPage';
import errorPage from './pages/errorPage';
// import BackUp from './focus_backup';
import tvShows from './pages/tvShows';
// import TvShow from './pages/tvShow';

export default {
    boot: (params)=>{
        console.log(params)
        // boot request will always fire
        // on root and deeplink
    },
    // First we define a root, this is the hash were the browser will point to
    // at the moment that you boot your app
    // root: 'home',
    // Next we can define the rest of our routes
    routes: [{
        path: '$',
        component: LandingPage,
    },
    {
        path: 'tvShows',
        component: tvShows,
    },
    {
        path: '*',
        component: errorPage,
    }
    ],
    beforeEachRoute: async(from ,to)=>{
        return true;
    }
}