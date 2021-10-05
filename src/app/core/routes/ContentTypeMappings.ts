import { ContentTypeMapping } from '@zengenti/contensis-react-base';

import { ContentTypes } from '../schema';
import { HomePage } from '~/dynamic/pages';

const { homePage } = ContentTypes;

const contentTypeMappings: ContentTypeMapping[] = [
  {
    contentTypeID: homePage,
    component: HomePage,
  },
];

export default contentTypeMappings;
