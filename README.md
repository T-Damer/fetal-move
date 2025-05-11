# Frontend code for birth helper app

Overview:

1. The User can create a new patient with some initial data
2. Patient data stored in a local store like a big Map
3. The User can mutate this Map in a ways we allow
4. The User can export/share part/whole Map into .csv or .xlsx format
5. To reduce re-renders on such a big we use [`focus-atom`](https://jotai.org/docs/recipes/large-objects)
6. To make the app work locally we use `vite-plugin-pwa`

## Local launch

1. Install [`nvm`](https://github.com/nvm-sh/nvm) (or [windows version](https://github.com/coreybutler/nvm-windows))
2. Install node.js through nvm using `nvm install lts` in your cli
3. Install `yarn` via `npm i -g yarn`
4. Clone this repo vai `git clone https://github.com/T-Damer/fetal-move.git` (install [git](https://git-scm.com/) if needed)
5. Go to the folder via `cd fetal-move`
6. Install dependencies with `yarn`
7. Run the server with `yarn start`
8. Open the link from cli
