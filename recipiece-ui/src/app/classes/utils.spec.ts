import {fractionToDecimal} from './utils';

describe('Utility Functions', () => {
  describe('fractionToDecimal', () => {
    it('should handle non-fractions', () => {
      expect(fractionToDecimal('10')).toEqual(10);
    });

    it('should handle regular fractions', () => {
      expect(fractionToDecimal('1/2')).toBeCloseTo(0.5);
    });

    it('should handle improper fractions', () => {
      expect(fractionToDecimal('3/2')).toBeCloseTo(1.5);
    });

    it('should handle compound fractions', () => {
      expect(fractionToDecimal('1 1/2')).toBeCloseTo(1.5);
    });

    it('should handle decimal values', () => {
      expect(fractionToDecimal('0.981')).toBeCloseTo(0.981);
    });
  });
});
