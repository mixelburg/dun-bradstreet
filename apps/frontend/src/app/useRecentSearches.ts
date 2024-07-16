import {atomWithStorage} from "jotai/utils";
import {RecentSearch} from "./types";
import {useAtom} from "jotai/index";

const recentSearchesAtom = atomWithStorage<RecentSearch[]>('recentSearches', [])


export const useRecentSearches = () => {
  const [recentSearches, setRecentSearches] = useAtom(recentSearchesAtom)

  const addRecentSearch = (search: RecentSearch) => {
    setRecentSearches((prev) => {
      const index = prev.findIndex((r) => r.query === search.query)
      if (index !== -1) {
        return prev
      }
      return [search, ...prev].slice(0, 5)
    })
  }

  return {
    recentSearches,
    addRecentSearch,
  }
}
