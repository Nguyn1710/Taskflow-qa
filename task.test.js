import { describe, it, expect } from 'vitest';
import { createTask } from './taskModel.js';

describe('createTask()', () => {
  it('should reject empty title', () => {
    expect(() => createTask('', 'description')).toThrow('Title is required');
  });

  it('should reject null title', () => {
    expect(() => createTask(null, 'description')).toThrow('Title is required');
  });

  it('should reject title > 255 chars', () => {
    const longTitle = 'a'.repeat(256);
    expect(() => createTask(longTitle, 'desc')).toThrow('Title too long');
  });

  it('should accept valid title and description', () => {
    const task = createTask('Buy milk', 'Go to store');
    expect(task.id).toBeDefined();
    expect(task.title).toBe('Buy milk');
    expect(task.description).toBe('Go to store');
    expect(task.status).toBe('pending');
    expect(task.created_at).toBeInstanceOf(Date);
  });

  it('should accept title without description', () => {
    const task = createTask('Call mom');
    expect(task.description).toBe('');
  });
});