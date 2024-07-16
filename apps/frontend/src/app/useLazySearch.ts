import {useAtom} from "jotai/index";
import {useEffect, useState} from "react";
import {atomWithHash} from "jotai-location";

export const searchAtom = atomWithHash<string>('q', '')

export const useLazySearch = () => {
  const [search, setSearch] = useAtom(searchAtom)
  const [lazySearch, setLazySearch] = useState<string>('')

  useEffect(() => {
    const timeout = setTimeout(() => setLazySearch(search), 500)
    return () => clearTimeout(timeout)
  }, [search]);

  return {
    search,
    lazySearch,
    setSearch,
  }
}
