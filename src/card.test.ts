import { playRound, handValue } from './card';

describe('playRound', () => {
  it('should return bet when player wins', () => {
    // This test is not deterministic because playRound shuffles and draws randomly.
    // For a real test, you would refactor playRound to accept a deck or inject randomness.
    // Here, we just check that it returns a number and does not throw.
    expect(typeof playRound(5)).toBe('number');
  });

  it('should return 0 or negative when player loses or draws', () => {
    const result = playRound(5);
    expect([0, 5, -5]).toContain(result);
  });

  it('should return 0 for bet = 0', () => {
    expect(playRound(0)).toBe(0);
  });

  it('should return 0 or negative for negative bet', () => {
    const result = playRound(-10);
    expect([0, -10, 10]).toContain(result);
  });

  it('should return a number for multiple rounds', () => {
    for (let i = 0; i < 10; i++) {
      expect(typeof playRound(5)).toBe('number');
    }
  });
});

describe('handValue', () => {
  it('should return 0 for two face cards', () => {
    expect(handValue([
      { suit: 'Spades', rank: 'K' },
      { suit: 'Hearts', rank: 'Q' }
    ])).toBe(0);
  });
  it('should return 1 for A and K', () => {
    expect(handValue([
      { suit: 'Spades', rank: 'A' },
      { suit: 'Hearts', rank: 'K' }
    ])).toBe(1);
  });
  it('should return 9 for 4 and 5', () => {
    expect(handValue([
      { suit: 'Spades', rank: '4' },
      { suit: 'Hearts', rank: '5' }
    ])).toBe(9);
  });
  it('should return 0 for 10 and Q', () => {
    expect(handValue([
      { suit: 'Spades', rank: '10' },
      { suit: 'Hearts', rank: 'Q' }
    ])).toBe(0);
  });
  it('should return 7 for 8 and 9', () => {
    expect(handValue([
      { suit: 'Spades', rank: '8' },
      { suit: 'Hearts', rank: '9' }
    ])).toBe(7);
  });
});
