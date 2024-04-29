# Frontend code for birth helper app

Overview:

1. The User can create a new patient with some initial data
2. Patient data stored in a local store like a big Map
3. The User can mutate this Map in a ways we allow
4. The User can export/share part/whole Map into .csv or .xlsx format
5. To reduce re-renders on such a big we use [`focus-atom`](https://jotai.org/docs/recipes/large-objects)

## Local launch

1. Install dependencies with `yarn`
2. Run the server with `yarn start`
