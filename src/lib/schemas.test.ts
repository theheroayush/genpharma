import { describe, it, expect } from 'vitest';
import { validatePassword } from './schemas';

describe('validatePassword', () => {
  it('should reject passwords shorter than 8 characters', () => {
    const result = validatePassword('Short1!');
    expect(result.success).toBe(false);
    expect(result.error).toContain('at least 8 characters');
  });

  it('should reject passwords without uppercase letters', () => {
    const result = validatePassword('lowercase1!');
    expect(result.success).toBe(false);
    expect(result.error).toContain('uppercase letter');
  });

  it('should reject passwords without lowercase letters', () => {
    const result = validatePassword('UPPERCASE1!');
    expect(result.success).toBe(false);
    expect(result.error).toContain('lowercase letter');
  });

  it('should reject passwords without numbers', () => {
    const result = validatePassword('NoNumber!');
    expect(result.success).toBe(false);
    expect(result.error).toContain('number');
  });

  it('should reject passwords without special characters', () => {
    const result = validatePassword('NoSpecial1');
    expect(result.success).toBe(false);
    expect(result.error).toContain('special character');
  });

  it('should accept valid passwords', () => {
    const result = validatePassword('Correct1!');
    expect(result.success).toBe(true);
    expect(result.error).toBeUndefined();
  });
});
