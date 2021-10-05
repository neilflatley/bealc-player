export default (body: any) =>
  body?.Search?.map((r: any) => ({
    title: r.Title + ' ' + r.Year,
    description: '',
    image: r.Poster && r.Poster !== 'N/A' ? r.Poster : null,
    link: 'https://www.imdb.com/title/' + r.imdbID,
  }));
