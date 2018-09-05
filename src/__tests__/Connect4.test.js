import Connect4 from '../Connect4';

test('Start game connect4', () => {
  const instance = new Connect4();
  expect(instance).not.toBe(null);
});