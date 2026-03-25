function fmtDate(iso) {
  if (!iso) return 'Unknown';
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

function setStatus(el, msg, isError = false, loading = false) {
  el.className = 'status show' + (isError ? ' error' : '');
  el.innerHTML = loading
    ? `<span class="spinner"></span>${msg}`
    : msg;
}

function hideStatus(el) {
  el.className = 'status';
  el.innerHTML = '';
}

async function fetchUser(username) {
  const res = await fetch(`https://api.github.com/users/${username}`);
  if (res.status === 404) throw new Error(`User "${username}" not found.`);
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json();
}

async function fetchRepos(reposUrl) {
  const res = await fetch(`${reposUrl}?sort=updated&per_page=5`);
  if (!res.ok) return [];
  return res.json();
}

function buildRepoHTML(repos) {
  if (!repos.length) return '<p class="empty">No public repositories.</p>';

  return repos.map(repo => `
    <div class="repo-item">
      <a class="repo-name" href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
        ↗ ${repo.name}
      </a>
      <div class="repo-meta">
        <span class="star-icon">★ ${repo.stargazers_count}</span>
        ${repo.language ? `<span>${repo.language}</span>` : ''}
        <span>Updated ${fmtDate(repo.updated_at)}</span>
      </div>
    </div>
  `).join('');
}

document.getElementById('form-single').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('input-single').value.trim();
  const statusEl = document.getElementById('status-single');
  const cardEl   = document.getElementById('card-single');
  const btn      = e.target.querySelector('button');

  if (!username) {
    setStatus(statusEl, 'Please enter a username.', true);
    return;
  }

  btn.disabled = true;
  cardEl.classList.remove('show');
  document.getElementById('s-repos-list').innerHTML = '<p class="empty">Loading repositories…</p>';
  setStatus(statusEl, 'Fetching data from GitHub…', false, true);

  try {
    const user  = await fetchUser(username);
    const repos = await fetchRepos(user.repos_url);

    document.getElementById('s-avatar').src            = user.avatar_url;
    document.getElementById('s-avatar').alt            = user.login;
    document.getElementById('s-name').textContent      = user.name || user.login;
    document.getElementById('s-login').textContent     = `@${user.login}`;
    document.getElementById('s-bio').textContent       = user.bio || 'No bio provided.';
    document.getElementById('s-followers').textContent = user.followers.toLocaleString();
    document.getElementById('s-following').textContent = user.following.toLocaleString();
    document.getElementById('s-repos').textContent     = user.public_repos;
    document.getElementById('s-joined').textContent    = fmtDate(user.created_at);
    document.getElementById('s-url').href              = user.html_url;
    document.getElementById('s-repos-list').innerHTML  = buildRepoHTML(repos);

    hideStatus(statusEl);
    cardEl.classList.add('show');

  } catch (err) {
    setStatus(statusEl, `⚠ ${err.message}`, true);
  } finally {
    btn.disabled = false;
  }
});