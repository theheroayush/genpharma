import { describe, it, expect } from 'vitest';
import { validatePassword } from './validation';

describe('validatePassword', () => {
  it('should return invalid for password shorter than 8 characters', () => {
    const result = validatePassword('Short1!');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Password must be at least 8 characters long.');
  });

  it('should return invalid for password without uppercase letter', () => {
    const result = validatePassword('lowercase1!');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Password must contain at least one uppercase letter.');
  });

  it('should return invalid for password without lowercase letter', () => {
    const result = validatePassword('UPPERCASE1!');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Password must contain at least one lowercase letter.');
  });

  it('should return invalid for password without number', () => {
    const result = validatePassword('NoNumber!');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Password must contain at least one number.');
  });

  it('should return invalid for password without special character', () => {
    const result = validatePassword('NoSpecialChar1');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Password must contain at least one special character.');
  });

  it('should return valid for a strong password', () => {
    const result = validatePassword('StrongPass1!');
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should return valid for passwords with common symbols like underscores and dashes', () => {
    const result = validatePassword('Pass_Word-1');
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should return valid for passwords with brackets and slashes', () => {
    const result = validatePassword('Bracket[1]/');
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });
});
