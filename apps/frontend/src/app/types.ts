

export type Topic = {
  FirstUrl: string;
  Text: string;
}


export type SearchResults = {
  RelatedTopics: Topic[];
}

export type RecentSearch = {
  query: string;
  url: string;
}
