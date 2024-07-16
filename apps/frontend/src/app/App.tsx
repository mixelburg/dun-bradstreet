import {Box, CircularProgress, InputAdornment, Pagination, Stack, TextField, Typography} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {ChangeEvent, useEffect, useState} from "react";
import {atomWithHash} from "jotai-location";
import {useAtom} from "jotai";
import {SearchResults, Topic,} from "./types";
import {TopicCard} from "./TopicCard";
import {getResultsForQuery} from "./query";

const searchAtom = atomWithHash<string>('q', '')
const pageSize = 10

export const App = () => {
  const [search, setSearch] = useAtom(searchAtom)
  const [lazySearch, setLazySearch] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const timeout = setTimeout(() => setLazySearch(search), 500)
    return () => clearTimeout(timeout)
  }, [search]);

  const [results, setResults] = useState<SearchResults | null>(null)
  useEffect(() => {
    const fetchResults = async () => {
      if (!lazySearch) return
      const data = await getResultsForQuery(lazySearch)
      setResults(data)
    }
    setLoading(true)
    fetchResults().catch(console.error).finally(() => setLoading(false))
  }, [lazySearch])

  const [page, setPage] = useState<number>(1);
  const numPages = results ? Math.ceil(results.RelatedTopics.length / pageSize) : 0
  const currentPageResults = results ? results.RelatedTopics.slice((page - 1) * pageSize, page * pageSize) : []

  return <Stack
    sx={{
      height: '100vh',
      width: '100vw',
    }}
  >
    <Stack
      sx={{
        p: 4,
        height: '100%',
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
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
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
                      <TopicCard key={topic.FirstUrl} topic={topic} search={lazySearch}/>
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
  </Stack>
}
