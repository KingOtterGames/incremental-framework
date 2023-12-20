import DefaultState from '../../__DefaultState__.json'
const state = DefaultState

/**
 * Action: Example
 */
test('action - description', () => {
    expect(state.player.currency.gold).toBe(0)
})
