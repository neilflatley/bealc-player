import { ContentTypes } from '~/core/schema';
import { mapEntries } from '~/core/util/json-mapper';

const baseMapping = {
  title: 'entryTitle',
  description: 'entryDescription',
  image: 'image.asset.sys.uri',
  link: 'sys.uri',
};

const articleCardMapping = {
  ...baseMapping,
  category: {
    $path: 'category',
    $formatting: {
      title: 'entryTitle',
      id: 'sys.id',
    },
  },
  featuredAcademic: {
    $path: 'featuredAcademic',
    $formatting: {
      name: 'entryTitle',
      id: 'sys.id',
    },
  },
  date: (entry: any) => entry.publishedDate || entry.sys.version.published,
};

export const mappers = {
  default: baseMapping,
  [ContentTypes.article]: articleCardMapping,
  [ContentTypes.blog]: baseMapping,
};

const mapEntriesToResults = (entries: any[]) => mapEntries(entries, mappers);

// const mapEntriesToResults = (entries: any[]) =>
//   entries.map((entry: any) => {
//     debugger;
//     const template = mappers[entry.sys.contentTypeId];
//     const mappedToJson = mapJson(entry, template);
//     return mappedToJson;
//   });

export default mapEntriesToResults;
