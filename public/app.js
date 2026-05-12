const API_BASE = '/api';

// Load tasks khi page tải
document.addEventListener('DOMContentLoaded', loadTasks);

// Form submit handler
document.getElementById('taskForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();

  if (!title) {
    alert('Vui lòng nhập tiêu đề task');
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    });

    const data = await response.json();

    if (!data.success) {
      alert('Lỗi: ' + data.error);
      return;
    }

    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    loadTasks();
  } catch (error) {
    alert('Lỗi kết nối: ' + error.message);
  }
});

// Load tasks từ API
async function loadTasks() {
  try {
    const response = await fetch(`${API_BASE}/tasks`);
    const data = await response.json();

    const tasksList = document.getElementById('tasksList');
    
    if (!data.tasks || data.tasks.length === 0) {
      tasksList.innerHTML = '<p class="loading">Chưa có task nào. Hãy tạo task đầu tiên!</p>';
      return;
    }

    tasksList.innerHTML = data.tasks.map(task => `
      <div class="task-item">
        <div class="task-title">${escapeHtml(task.title)}</div>
        ${task.description ? `<div class="task-desc">${escapeHtml(task.description)}</div>` : ''}
        <div class="task-meta">
          <span>${new Date(task.created_at).toLocaleString('vi-VN')}</span>
          <span class="task-status">${task.status === 'pending' ? 'Chờ xử lý' : 'Hoàn thành'}</span>
        </div>
        <div class="task-actions">
          <button onclick="markComplete('${task.id}')" style="${task.status === 'completed' ? 'display:none' : ''}">
            ✓ Hoàn thành
          </button>
          <button class="delete-btn" onclick="deleteTask('${task.id}')">
            🗑 Xóa
          </button>
        </div>
      </div>
    `).join('');
  } catch (error) {
    document.getElementById('tasksList').innerHTML = `<p class="error">Lỗi tải tasks: ${error.message}</p>`;
  }
}

async function markComplete(id) {
  try {
    await fetch(`${API_BASE}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'completed' })
    });
    loadTasks();
  } catch (error) {
    alert('Lỗi cập nhật: ' + error.message);
  }
}

async function deleteTask(id) {
  if (!confirm('Xác nhận xóa task này?')) return;

  try {
    const response = await fetch(`${API_BASE}/tasks/${id}`, { method: 'DELETE' });
    const data = await response.json();

    if (!data.success) {
      alert('Lỗi: ' + data.error);
      return;
    }

    loadTasks();
  } catch (error) {
    alert('Lỗi xóa: ' + error.message);
  }
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}