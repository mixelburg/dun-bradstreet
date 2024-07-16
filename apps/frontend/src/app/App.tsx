import {Box, CircularProgress, InputAdornment, Link, Pagination, Stack, TextField, Typography} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {ChangeEvent, useEffect, useState} from "react";
import {atomWithHash} from "jotai-location";
import {useAtom} from "jotai";
import {RecentSearch, SearchResults, Topic,} from "./types";
import {TopicCard} from "./TopicCard";
import {getResultsForQuery} from "./query";
import {atomWithStorage} from "jotai/utils";
import {useLazySearch} from "./useLazySearch";
import {useRecentSearches} from "./useRecentSearches";

const pageSize = 10

export const App = () => {
  const {
    search,
    lazySearch,
    setSearch
  } = useLazySearch()
  const [loading, setLoading] = useState<boolean>(false)

  const [results, setResults] = useState<SearchResults | null>(null)

  const {recentSearches, addRecentSearch} = useRecentSearches()

  useEffect(() => {
    const fetchResults = async () => {
      if (!lazySearch) return
      addRecentSearch({
        query: lazySearch,
        url: window.location.href
      })
      const data = await getResultsForQuery(lazySearch)
      setResults(data)
    }
    setLoading(true)
    fetchResults().catch(console.error).finally(() => setLoading(false))
  }, [lazySearch])

  const [page, setPage] = useState<number>(1);
  const numPages = results ? Math.ceil(results.RelatedTopics.length / pageSize) : 0
  const currentPageResults = results ? results.RelatedTopics.slice((page - 1) * pageSize, page * pageSize) : []
  console.log('recentSearches', recentSearches)

  return <Stack
    sx={{
      height: '100vh',
      width: '100vw',
    }}
    direction='row'
  >
    <Stack
      sx={{
        p: 4,
        width: '100%',
      }}
      spacing={2}
    >
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon/>
            </InputAdornment>
          ),
        }}
        variant="standard"
        sx={{
          width: '100%',
          maxWidth: '400px',
        }}
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <Typography variant='h5'>Results</Typography>

      {
        loading ? <>
          <Box sx={{display: 'flex'}}>
            <CircularProgress/>
          </Box>
        </> : <>
          {
            results && <>
              <Stack justifyContent='space-between' height='100%'>
                <Stack
                  spacing={1}
                  sx={{
                    overflowY: 'auto',
                    height: 400
                  }}
                >
                  {
                    currentPageResults.map((topic) => (
                      <TopicCard key={topic.FirstURL} topic={topic} search={lazySearch}/>
                    ))
                  }
                </Stack>

                <Pagination count={numPages} page={page} onChange={(e, p) => setPage(p)}/>
              </Stack>
            </>
          }

        </>
      }
    </Stack>
    <Stack
      p={4}
      sx={{
        minWidth: 200
      }}
    >
      <Typography variant='h5'>Recent Searches</Typography>
      <Stack>
        {
          recentSearches.map(search => <>
            <Link
              href={search.url}
              variant='body1'
              sx={{
                // set overflow to ellipsis
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {search.query}
            </Link>
          </>)
        }
      </Stack>
    </Stack>
  </Stack>
}
