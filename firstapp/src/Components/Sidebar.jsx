import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as HiIcons from 'react-icons/hi';
import * as MdIcons from 'react-icons/md';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Shopping',
    path: '/reports',
    icon: <FaIcons.FaShoppingCart />,
    cName: 'nav-text'
  },
  {
    title: 'Popular Recipes',
    path: '/products',
    icon: <HiIcons.HiTrendingUp />,
    cName: 'nav-text'
  },
  {
    title: 'Article',
    path: '/team',
    icon: <MdIcons.MdArticle />,
    cName: 'nav-text'
  },
  {
    title: 'Saved Recipes',
    path: '/messages',
    icon: <MdIcons.MdBookmark />,
    cName: 'nav-text'
  },
  {
    title: 'Suggestion',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle/>,
    cName: 'nav-text'
  },
  {
    title: 'About Us',
    path: '/support',
    icon: <IoIcons.IoMdPeople/>,
    cName: 'nav-text'
  },
  {
    title: 'Settings',
    path: '/support',
    icon: <MdIcons.MdSettings/>,
    cName: 'nav-text'
  }
];
