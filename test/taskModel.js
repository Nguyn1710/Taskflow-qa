export function createTask(title, description) {
  if (!title || title === '') {
    throw new Error('Title is required');
  }
  if (title.length > 255) {
    throw new Error('Title too long');
  }
  if (!description) {
    description = '';
  }
  return { id: '123', title, description, status: 'pending', created_at: new Date() };
}