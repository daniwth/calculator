import { useState } from 'react'
import { Pencil, Trash2, Crown, User, Shield, Search } from 'lucide-react'
import { getUsers, updateUser, deleteUser } from '../../lib/auth'
import { formatDateTime } from '../../lib/utils'
import { useAuth } from '../../context/AuthContext'

export default function AdminUsers() {
  const { user: currentUser, refreshUser } = useAuth()
  const [users, setUsers] = useState(getUsers())
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState(null)
  const [editData, setEditData] = useState({})
  const [confirmDelete, setConfirmDelete] = useState(null)

  const filtered = users.filter(u =>
    u.nombre.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  function startEdit(user) {
    setEditing(user.id)
    setEditData({ nombre: user.nombre, email: user.email, plan: user.plan, role: user.role })
  }

  function saveEdit(id) {
    updateUser(id, editData)
    setUsers(getUsers())
    if (id === currentUser?.id) refreshUser()
    setEditing(null)
  }

  function handleDelete(id) {
    if (id === currentUser?.id) return
    deleteUser(id)
    setUsers(getUsers())
    setConfirmDelete(null)
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Gestión de Usuarios</h1>
            <p className="text-gray-500 text-sm">{users.length} usuarios registrados</p>
          </div>
        </div>

        <div className="relative mb-5 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Buscar usuarios..." className="input-field w-full pl-10" />
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800 text-left">
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Usuario</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Plan</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Rol</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Registrado</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Último acceso</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filtered.map(user => (
                  <tr key={user.id} className="hover:bg-gray-800/30 transition-colors">
                    {editing === user.id ? (
                      <>
                        <td className="px-5 py-3">
                          <div className="space-y-1">
                            <input type="text" value={editData.nombre} onChange={e => setEditData(p => ({ ...p, nombre: e.target.value }))} className="input-field text-sm py-1 w-full" />
                            <input type="email" value={editData.email} onChange={e => setEditData(p => ({ ...p, email: e.target.value }))} className="input-field text-sm py-1 w-full" />
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <select value={editData.plan} onChange={e => setEditData(p => ({ ...p, plan: e.target.value }))} className="input-field text-sm py-1 bg-gray-800">
                            <option value="basic">Básico</option>
                            <option value="premium">Premium</option>
                          </select>
                        </td>
                        <td className="px-5 py-3">
                          <select value={editData.role} onChange={e => setEditData(p => ({ ...p, role: e.target.value }))} className="input-field text-sm py-1 bg-gray-800">
                            <option value="user">Usuario</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td colSpan={2} />
                        <td className="px-5 py-3">
                          <div className="flex gap-2">
                            <button onClick={() => saveEdit(user.id)} className="px-3 py-1 rounded-lg bg-primary-500 text-white text-xs font-medium hover:bg-primary-400">Guardar</button>
                            <button onClick={() => setEditing(null)} className="px-3 py-1 rounded-lg bg-gray-700 text-gray-300 text-xs hover:bg-gray-600">Cancelar</button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500/30 to-violet-500/30 flex items-center justify-center text-sm font-bold text-primary-300 flex-shrink-0">
                              {user.nombre[0].toUpperCase()}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white">{user.nombre}</div>
                              <div className="text-xs text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <span className={`flex items-center gap-1 text-xs font-semibold ${user.plan === 'premium' ? 'text-amber-400' : 'text-gray-400'}`}>
                            <Crown className="w-3 h-3" />{user.plan === 'premium' ? 'Premium' : 'Básico'}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <span className={`flex items-center gap-1 text-xs font-semibold ${user.role === 'admin' ? 'text-red-400' : 'text-gray-400'}`}>
                            {user.role === 'admin' ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />}
                            {user.role === 'admin' ? 'Admin' : 'Usuario'}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-xs text-gray-500 hidden md:table-cell">{formatDateTime(user.createdAt)}</td>
                        <td className="px-5 py-3 text-xs text-gray-500 hidden md:table-cell">{user.lastLogin ? formatDateTime(user.lastLogin) : '—'}</td>
                        <td className="px-5 py-3">
                          <div className="flex gap-2">
                            <button onClick={() => startEdit(user)} className="p-1.5 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            {user.id !== currentUser?.id && (
                              <button onClick={() => setConfirmDelete(user.id)} className="p-1.5 rounded-lg bg-gray-800 text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && <div className="text-center py-12 text-gray-500">No se encontraron usuarios</div>}
        </div>

        {confirmDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setConfirmDelete(null)} />
            <div className="relative bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-2">¿Eliminar usuario?</h3>
              <p className="text-gray-400 text-sm mb-6">Esta acción no se puede deshacer. El usuario perderá acceso permanentemente.</p>
              <div className="flex gap-3">
                <button onClick={() => handleDelete(confirmDelete)} className="flex-1 py-2 rounded-xl bg-red-500 hover:bg-red-400 text-white font-semibold text-sm transition-colors">Eliminar</button>
                <button onClick={() => setConfirmDelete(null)} className="flex-1 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold text-sm transition-colors">Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
