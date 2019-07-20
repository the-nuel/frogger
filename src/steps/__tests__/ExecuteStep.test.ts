import { ExecuteStep } from '../ExecuteStep';

describe('ExecuteStep', () => {
    it('executes the specified function', async () => {
        const execute = jest.fn((state) => Promise.resolve(state));
        const step = new ExecuteStep<string>({ name: 'test', execute });

        const result = await step.run('hello world');

        expect(execute).toHaveBeenCalled();
        expect(result).toBe('hello world');
    });
});
