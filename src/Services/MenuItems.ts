import { FiHome } from 'react-icons/fi';
import { Tool, MenuCategory } from '../types';

/**
 * List of all available developer tools
 * Add new tools here to make them available throughout the app
 */
export const menuItems: Tool[] = [
  // Example tool structure:
  // {
  //   label: 'JSON Formatter',
  //   secondary: 'Format, validate, and beautify JSON',
  //   route: 'json-formatter',
  //   Icon: VscJson,
  //   category: 'Data & API'
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
 * Tools grouped by category for sidebar navigation
 */
export const menuCategories: MenuCategory[] = [
  // Categories are automatically generated from tools
  // when tools are added to menuItems
];
