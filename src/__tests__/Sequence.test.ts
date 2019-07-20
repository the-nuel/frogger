import Sequence from "../Sequence";
import { ExecuteOrFallbackStep, ExecuteStep } from "../steps";

describe('Sequence', () => {
    type FruitBasketState = {
        apples: number;
        oranges: number;
    };

    describe('sanity checks', () => {
        it('executes a sequence of steps', async () => {
            const sequence = new Sequence<FruitBasketState>([
                {
                    name: 'add-apples',
                    run: (state) => Promise.resolve({ ...state, apples: 2 }),
                },
                {
                    name: 'add-oranges',
                    run: (state) => Promise.resolve({ ...state, oranges: 1 }),
                }
            ]);
    
            const result = await sequence.run({ apples: 0, oranges: 0 });
            expect(result).toStrictEqual({ apples: 2, oranges: 1 });
        });
    })
    
    it('executes a sequence of real steps, passing state', async () => {
        const sequence = new Sequence<FruitBasketState>([
            new ExecuteOrFallbackStep({
                name: 'add-apples',
                execute: (state) => Promise.resolve({ 
                    ...state, 
                    apples: state.apples + 1,
                }),
                fallback: (state) => Promise.resolve(state),
            }),
            new ExecuteOrFallbackStep({
                name: 'add-oranges',
                execute: () => Promise.resolve(undefined),
                fallback: (state) => Promise.resolve({
                    ...state, 
                    oranges: state.oranges + 1,
                }),
            }),
            new ExecuteStep({
                name: 'reset-apples',
                execute: (state) => Promise.resolve({ ...state, apples: 0 }),
            }),
        ]);

        const result = await sequence.run({ apples: 1, oranges: 0 });
        expect(result).toStrictEqual({ apples: 0, oranges: 1 });
    });
});
