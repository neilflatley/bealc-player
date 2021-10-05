import { Express } from 'express';
import imageProxy from './image-proxy';
import middleware from './middleware';

// Import and load any server-side features here
// We have an instance of the express app available to configure
const configureFeatures = (app: Express) => {
  if (!app) return null;
  middleware(app);
  imageProxy(app);
};

export default configureFeatures;
