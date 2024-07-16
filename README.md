# How to run

1. Clone the repository
2. Install dependencies

```shell
npm i 
bun i
pnpm i

# yarn - please don't use it
```

3. Run the project

```shell
npx nx serve backend
npx nx serve frontend
```


# Some design decisions

### Nx
used to manage the monorepo, it's a great tool to manage multiple projects in a single repository

### Hono
minimalistic framework to create APIs, it's a great tool to create APIs with a few lines of code

### Mui
Material UI is a great library to create UIs, it's a vendor lock type of marriage, but it's a great library

### Jotai
Jotai is a great library to manage the state, it's a great alternative to Recoil and Redux
why people still write new apps with redux? I don't know...
