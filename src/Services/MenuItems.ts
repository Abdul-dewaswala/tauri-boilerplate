import { FiHome } from 'react-icons/fi';
import { Tool, MenuCategory } from '../types';

/**
 * List of all available developer tools
 * Add new tools here to make them available throughout the app
 */
export const menuItems: Tool[] = [
  // Example tool structure:
  // {
  //   label: 'Home',
  //   secondary: 'Home',
  //   route: '/',
  //   Icon: FiHome,
  //   category: 'Home'
  // },
];

/**
 * All navigation items including home and tools
 */
export const allMenuItems = [
  { label: 'Home', secondary: 'Home', route: '/', Icon: FiHome, category: 'Navigation' },
  ...menuItems
];

/**
 * Routes grouped by category for sidebar navigation
 */
export const menuCategories: MenuCategory[] = [
  // Categories are automatically generated from routes
  // when routes are added to menuItems
  // {
  //   category: 'Home',
  //   description: 'Home',
  //   icon: FiHome,
  //   items: menuItems.filter(t => t.category === 'Home')
  // }
];
