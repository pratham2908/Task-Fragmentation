# Task Framentation

Initially it was 1 file - `App.tsx`

Now I converted it into multiple files whose component structure is as follows:

    `App.tsx`
        -- DashBoardLayoutStyled
                -- BurnButtonBar
                -- BurnStatsContainer
        -- TransactionTableStyled

I separated concerns by creating a new file for each component. This way, each component is responsible for its own rendering and logic. This makes the code more readable and maintainable.

- There is only 1 state that belongs to `App.tsx` and is passed to both of the components (one is using it and one is changing it).
- Rest of the states are local to the components.
- I set the state of each component in its own file because
  - That way, concerns are separated
  - Change in that state will not affect other components that are not using it.
- There are few other components in `App.tsx` like-
  ```tsx
  <AppToast />
  <ChainSelector />
  ```
  but we had nothing to do them, they are imported and used as it is.
