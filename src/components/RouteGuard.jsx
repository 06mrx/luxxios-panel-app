import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { storageService } from '../services/storage.service';
import { NextRequest } from 'next/server';
// import { userService }
export { RouterGuard };

function RouterGuard({ children }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        
        // on initial load - run auth check 
        authCheck(router.asPath, router);
        // console.log(router.pathname.startsWith("/team/"))
        // on route change start - hide page content by setting authorized to false  
        const hideContent = () => setAuthorized(false);
        // router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }
    }, [authCheck, router]);

    function authCheck(url, xrouter) {
        const publicPaths = ['/auth/login', '/', '/auth/register', '/team/2', 'team/3', '/career'];
        const path = url.split('?')[0];

        // localStorage.setItem('users', JSON.stringify(res.data.data))
        const userString = storageService.get("user")
        var user = null
        if (userString) {
            user = JSON.parse(storageService.get("user"));
        }

        if (!user && !publicPaths.includes(path) && !router.pathname.startsWith('/parent')) {
            setAuthorized(false);
            router.push({
                pathname: '/auth/login',
                query: { returnUrl: router.asPath }
            })

            //dev --disable when add login
            // setAuthorized(true)
        } else {
            setAuthorized(true)
            if(user) {
                let role = storageService.checkRole(user.role_id);
                if (role == 'Administrator') {
                    if (router.pathname.startsWith('/head-office') || router.pathname.startsWith('/head-section') || router.pathname.startsWith('/teacher') || router.pathname.startsWith('/principal') || router.pathname.startsWith('/public')) {
                        router.push('/administrator')
                    }
                } else if (role == 'Publik') {
                    if (router.pathname.startsWith('/head-office') || router.pathname.startsWith('/head-section') || router.pathname.startsWith('/teacher') || router.pathname.startsWith('/principal') || router.pathname.startsWith('/administrator')) {
                        router.push('/public')
                    }
                } 




                // else if (role == 'Kepala Sekolah') {
                //     if (router.pathname.startsWith('/teacher') || router.pathname.startsWith('/administrator') || router.pathname.startsWith('/education-authorities') || router.pathname.startsWith('/ministry') || router.pathname.startsWith('/leader')) {
                //         router.push('/headmaster')
                //     }
                // } else if (role == 'Tenaga Kesehatan') {
                //     if (router.pathname.startsWith('/teacher') || router.pathname.startsWith('/administrator') || router.pathname.startsWith('/education-authorities') || router.pathname.startsWith('/headmaster') || router.pathname.startsWith('/leader')) {
                //         router.push('/ministry')
                //     }
                // } else if (role == 'Bunda Paud') {
                //     if (router.pathname.startsWith('/teacher') || router.pathname.startsWith('/administrator') || router.pathname.startsWith('/education-authorities') || router.pathname.startsWith('/headmaster') || router.pathname.startsWith('/ministry')) {
                //         router.push('/leader')
                //     }
                // }
            }
           
        }

        // const user = storageService.get("user")

    }
    return (authorized && children);
}