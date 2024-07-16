import axios from "axios";
import {SearchResults, Topic} from "./types";

export const getResultsForQuery = async (query: string): Promise<SearchResults | null> => {
  const response = await axios.get(`http://localhost:8787/search`, {
    params: {
      q: query
    }
  })

  if (!response.data.data) return null

  const topics: Topic[] = []
  for (const topic of response.data.data.RelatedTopics) {
    if (topic.Name) {
      topics.push(...topic.Topics)
    } else {
      topics.push(topic)
    }
  }

  return {
    RelatedTopics: topics
  }
}
