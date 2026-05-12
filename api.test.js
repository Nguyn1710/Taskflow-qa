// import { describe, it, expect, beforeEach, afterEach } from 'vitest';
// import request from 'supertest';
// import app from './src/app.js';
// import Database from 'better-sqlite3';
// import path from 'path';

// describe('POST /api/tasks', () => {
//   let db;

//   beforeEach(() => {
//     // Create in-memory database for testing
//     db = new Database(':memory:');
//     db.exec(`
//       CREATE TABLE tasks (
//         id TEXT PRIMARY KEY,
//         title TEXT NOT NULL,
//         description TEXT,
//         status TEXT DEFAULT 'pending',
//         created_at DATETIME DEFAULT CURRENT_TIMESTAMP
//       )
//     `);
//   });

//   afterEach(() => {
//     db.close();
//   });

//   it('should create task with valid title and description', async () => {
//     const response = await request(app)
//       .post('/api/tasks')
//       .send({ title: 'Buy milk', description: 'Go to store' })
//       .expect(201);

//     expect(response.body.success).toBe(true);
//     expect(response.body.task.id).toBeDefined();
//     expect(response.body.task.title).toBe('Buy milk');
//     expect(response.body.task.description).toBe('Go to store');
//     expect(response.body.task.status).toBe('pending');
//   });

//   it('should create task with title only', async () => {
//     const response = await request(app)
//       .post('/api/tasks')
//       .send({ title: 'Call mom' })
//       .expect(201);

//     expect(response.body.success).toBe(true);
//     expect(response.body.task.description).toBe('');
//   });

//   it('should reject missing title', async () => {
//     const response = await request(app)
//       .post('/api/tasks')
//       .send({ description: 'No title' })
//       .expect(400);

//     expect(response.body.success).toBe(false);
//     expect(response.body.error).toBe('Title is required');
//   });

//   it('should reject empty title', async () => {
//     const response = await request(app)
//       .post('/api/tasks')
//       .send({ title: '', description: 'Empty title' })
//       .expect(400);

//     expect(response.body.success).toBe(false);
//     expect(response.body.error).toBe('Title is required');
//   });

//   it('should reject title > 255 chars', async () => {
//     const longTitle = 'a'.repeat(256);
//     const response = await request(app)
//       .post('/api/tasks')
//       .send({ title: longTitle })
//       .expect(400);

//     expect(response.body.success).toBe(false);
//     expect(response.body.error).toBe('Title must be <= 255 chars');
//   });
// });
import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import request from 'supertest';
import path from 'path';
import app from './src/app.js';
import Database from 'better-sqlite3';

const DB_PATH = path.resolve(__dirname, './data/tasks.db');
const db = new Database(DB_PATH);

describe('GET /api/tasks', () => {
  
  // Clean the database before each test to ensure isolation
  beforeEach(() => {
    db.prepare('DELETE FROM tasks').run();
  });

  // Close DB connection after all tests are finished
  afterAll(() => {
    db.close();
  });

  it('should return an empty array when the database is empty', async () => {
    const response = await request(app).get('/api/tasks');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.tasks).toBeInstanceOf(Array);
    expect(response.body.tasks).toHaveLength(0);
  });

  it('should return 3 tasks ordered by created_at DESC', async () => {
    // 1. Seed data with specific timestamps
    const insert = db.prepare(
      'INSERT INTO tasks (title, description, status, created_at) VALUES (?, ?, ?, ?)'
    );

    insert.run('Old Task', 'Oldest one', 'done', '2023-01-01 10:00:00');
    insert.run('Newest Task', 'Most recent', 'todo', '2023-01-01 12:00:00');
    insert.run('Middle Task', 'In between', 'in-progress', '2023-01-01 11:00:00');

    // 2. Execute Request
    const response = await request(app).get('/api/tasks');

    // 3. Assertions
    expect(response.status).toBe(200);
    expect(response.body.tasks).toHaveLength(3);
    
    // Verify Order (Newest first)
    expect(response.body.tasks[0].title).toBe('Newest Task');
    expect(response.body.tasks[1].title).toBe('Middle Task');
    expect(response.body.tasks[2].title).toBe('Old Task');
  });

  it('should verify that task objects contain all required fields', async () => {
    // 1. Seed one task
    const insert = db.prepare(
      'INSERT INTO tasks (title, description, status, created_at) VALUES (?, ?, ?, ?)'
    );
    insert.run('Field Test', 'Testing structure', 'todo', '2023-05-12 08:00:00');

    // 2. Execute Request
    const response = await request(app).get('/api/tasks');
    const task = response.body.tasks[0];

    // 3. Structural Assertions
    expect(task).toMatchObject({
      id: expect.any(String),
      title: 'Field Test',
      description: 'Testing structure',
      status: 'todo',
      created_at: expect.any(String)
    });

    // Explicit field checks
    expect(task).toHaveProperty('id');
    expect(task).toHaveProperty('title');
    expect(task).toHaveProperty('description');
    expect(task).toHaveProperty('status');
    expect(task).toHaveProperty('created_at');
  });
});