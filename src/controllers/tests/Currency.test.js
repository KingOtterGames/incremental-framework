import Currency from '../Currency'
import DefaultState from '../../__DefaultState__.json'
const state = DefaultState

/**
 * Action: Add
 */
test('add - adds 1 gold', () => {
    expect(state.player.currency.gold).toBe(0)
    Currency.actions.add(state, { currency: 'gold', amount: 1 })
    expect(state.player.currency.gold).toBe(1)
})

test('add - adds 1 gold when number is string', () => {
    const state = DefaultState
    expect(state.player.currency.gold).toBe(1)
    Currency.actions.add(state, { currency: 'gold', amount: '1' })
    expect(state.player.currency.gold).toBe(2)
})

test('add - adds 0 gold', () => {
    expect(state.player.currency.gold).toBe(2)
    Currency.actions.add(state, { currency: 'gold', amount: 0 })
    expect(state.player.currency.gold).toBe(2)
})

/**
 * Action: Remove
 */
test('remove - removes 1 gold', () => {
    expect(state.player.currency.gold).toBe(2)
    Currency.actions.remove(state, { currency: 'gold', amount: 1 })
    expect(state.player.currency.gold).toBe(1)
})

test('remove - shouldnt remove anything since too much', () => {
    expect(state.player.currency.gold).toBe(1)
    Currency.actions.remove(state, { currency: 'gold', amount: 100 })
    expect(state.player.currency.gold).toBe(1)
})

test('remove - removes 1 gold when number is string', () => {
    expect(state.player.currency.gold).toBe(1)
    Currency.actions.remove(state, { currency: 'gold', amount: '1' })
    expect(state.player.currency.gold).toBe(0)
})

test('remove - removes 0 gold', () => {
    expect(state.player.currency.gold).toBe(0)
    Currency.actions.remove(state, { currency: 'gold', amount: 0 })
    expect(state.player.currency.gold).toBe(0)
})
