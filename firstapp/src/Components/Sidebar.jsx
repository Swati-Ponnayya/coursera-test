import React from 'react';
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { auth } from '../firebase/firebase';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as HiIcons from 'react-icons/hi';
import * as MdIcons from 'react-icons/md';

// const [authUser, setAuthUser] = useState(null);
// useEffect(() => {
//   const listen = onAuthStateChanged(auth, (user) => {
//       if (user) {
//           setAuthUser(user);
//       } else {
//           setAuthUser(null);
//       }
//   });

//   return () => {
//       listen();
//   };
// }, []);

export const SidebarData = [
  
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Shopping',
    path: 'https://www.bigbasket.com',
    icon: <FaIcons.FaShoppingCart />,
    cName: 'nav-text'
  },
  {
    title: 'Popular Recipes',
    path: '',
    icon: <HiIcons.HiTrendingUp />,
    cName: 'nav-text'
  },
  {
    title: 'Article',
    path: '/articles',
    icon: <MdIcons.MdArticle />,
    cName: 'nav-text'
  },
  {
    title: 'Saved Recipes',
    path: '',
    icon: <MdIcons.MdBookmark />,
    cName: 'nav-text'
  },
  {
    title: 'Suggestion',
    path: '/suggestion',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  },
  {
    title: 'About Us',
    path: '',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Settings',
    path: '',
    icon: <MdIcons.MdSettings />,
    cName: 'nav-text'
  // },
  // {
  //   // if(authUser) {
  //   //   return {
  //       title: 'Log Out',
  //       path: '/signOut',
  //       icon: <MdIcons.MdLogout />,
  //       cName: 'nav-text'
  //     }
  // //   },
  // else() {
  //     return {
  //       title: 'Log In',
  //       path: '/login',
  //       icon: <MdIcons.MdLogin />,
  //       cName: 'nav-text'
  //     }
  //   }
  }
];
