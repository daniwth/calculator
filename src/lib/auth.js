const USERS_KEY = 'calcpro_users'
const SESSION_KEY = 'calcpro_session'

// Initialize with admin user if not present
function initUsers() {
  const users = getUsers()
  if (users.length === 0) {
    const admin = {
      id: 'admin-001',
      nombre: 'Administrador',
      email: 'admin@calcpro.es',
      password: 'admin123',
      plan: 'premium',
      role: 'admin',
      avatar: null,
      createdAt: new Date('2024-01-01').toISOString(),
      lastLogin: null,
    }
    const demo = {
      id: 'user-001',
      nombre: 'Usuario Demo',
      email: 'demo@calcpro.es',
      password: 'demo123',
      plan: 'basic',
      role: 'user',
      avatar: null,
      createdAt: new Date('2024-01-15').toISOString(),
      lastLogin: null,
    }
    saveUsers([admin, demo])
  }
}

export function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  } catch {
    return []
  }
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function getUserByEmail(email) {
  return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase()) || null
}

export function getUserById(id) {
  return getUsers().find(u => u.id === id) || null
}

export function createUser({ nombre, email, password }) {
  initUsers()
  const users = getUsers()
  if (getUserByEmail(email)) {
    throw new Error('Ya existe una cuenta con ese email')
  }
  const newUser = {
    id: `user-${Date.now()}`,
    nombre,
    email,
    password,
    plan: 'basic',
    role: 'user',
    avatar: null,
    createdAt: new Date().toISOString(),
    lastLogin: null,
  }
  saveUsers([...users, newUser])
  return newUser
}

export function updateUser(id, data) {
  const users = getUsers()
  const idx = users.findIndex(u => u.id === id)
  if (idx === -1) throw new Error('Usuario no encontrado')
  users[idx] = { ...users[idx], ...data }
  saveUsers(users)
  return users[idx]
}

export function deleteUser(id) {
  const users = getUsers().filter(u => u.id !== id)
  saveUsers(users)
}

export function login(email, password) {
  initUsers()
  const user = getUserByEmail(email)
  if (!user) throw new Error('Email o contraseña incorrectos')
  if (user.password !== password) throw new Error('Email o contraseña incorrectos')
  const session = {
    id: user.id,
    nombre: user.nombre,
    email: user.email,
    plan: user.plan,
    role: user.role,
    avatar: user.avatar,
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  updateUser(user.id, { lastLogin: new Date().toISOString() })
  return session
}

export function logout() {
  localStorage.removeItem(SESSION_KEY)
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
  } catch {
    return null
  }
}

export function isPremium(session) {
  return session?.plan === 'premium'
}

export function isAdmin(session) {
  return session?.role === 'admin'
}

// Initialize on first import
initUsers()
