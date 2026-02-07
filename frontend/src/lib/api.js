async function parseJsonSafe(response) {
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch (err) {
    return text;
  }
}

export async function apiFetch(method, path, body = null) {
  const base = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) ? import.meta.env.VITE_API_URL : (process.env.NEXT_PUBLIC_API_URL || '');
  const url = `${base}${path}`;

  const headers = {};
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  if (token) headers.Authorization = `Bearer ${token}`;

  let opts = { method, headers };

  if (body && !(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(body);
  } else if (body instanceof FormData) {
    // allow browser to set Content-Type for multipart
    opts.body = body;
  }

  const res = await fetch(url, opts);
  const parsed = await parseJsonSafe(res);

  if (!res.ok) {
    const errMsg = (parsed && (parsed.error || parsed.message)) || res.statusText || 'Request failed';
    const err = new Error(errMsg);
    err.status = res.status;
    err.body = parsed;
    throw err;
  }

  return parsed;
}

export function get(path) {
  return apiFetch('GET', path, null);
}

export function post(path, body) {
  return apiFetch('POST', path, body);
}

export function patch(path, body) {
  return apiFetch('PATCH', path, body);
}

export function upload(path, formData) {
  return apiFetch('POST', path, formData);
}

export default {
  apiFetch,
  get,
  post,
  patch,
  upload
};
