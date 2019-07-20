# @nuel/frogger
Frogger helps to chain together a sequence of tasks, it works like `reduce` but for asynchronous steps that are more complex than you might want to just throw into an array of functions.

## Example
```typescript
type FruitBasketState = {
    apples: 0,
    oranges: 0,
};

const sequence = new Sequence<FruitBasketState>([
    /* always give people 2 free apples */
    new ExecuteStep({
        name: 'GiveFreeApples',
        execute: (state) => Promise.resolve({
            ...state,
            apples: 2,
        })
    }),

    /* try to get fruit state from a store, but if we fail
     * default to just adding 1 to the current count */
    new ExecuteOrFallbackStep({
        name: 'TryGetOrangeCountOrDefault',
        execute: async (state) => {
            const count = await fruitDB.get('oranges');

            if (count) {
                return { ...state, oranges: count };
            } else {
                return undefined;
            }
        },
        fallback: (state) => Promise.resolve({
            ...state,
            oranges: state.oranges + 1,
        }),
    })
]);

/* run the sequence, given some initial state */
const basket = await sequence.run({ 
    apples: 0, 
    oranges: 0,
});
```
