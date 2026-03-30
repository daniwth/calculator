const HISTORY_KEY = 'calcpro_history'
const FAVORITES_KEY = 'calcpro_favorites'
const PREFS_KEY = 'calcpro_prefs'

export function getHistory(userId) {
  try {
    const all = JSON.parse(localStorage.getItem(HISTORY_KEY) || '{}')
    return all[userId] || []
  } catch {
    return []
  }
}

export function addToHistory(userId, entry, isPremiumUser = false) {
  try {
    const all = JSON.parse(localStorage.getItem(HISTORY_KEY) || '{}')
    const userHistory = all[userId] || []
    const newEntry = {
      id: Date.now(),
      ...entry,
      timestamp: new Date().toISOString(),
    }
    // Basic users: max 10 entries, premium: unlimited
    const maxEntries = isPremiumUser ? 1000 : 10
    all[userId] = [newEntry, ...userHistory].slice(0, maxEntries)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(all))
  } catch {}
}

export function clearHistory(userId) {
  try {
    const all = JSON.parse(localStorage.getItem(HISTORY_KEY) || '{}')
    delete all[userId]
    localStorage.setItem(HISTORY_KEY, JSON.stringify(all))
  } catch {}
}

export function getFavorites(userId) {
  try {
    const all = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '{}')
    return all[userId] || []
  } catch {
    return []
  }
}

export function toggleFavorite(userId, calculatorSlug) {
  try {
    const all = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '{}')
    const favs = all[userId] || []
    if (favs.includes(calculatorSlug)) {
      all[userId] = favs.filter(f => f !== calculatorSlug)
    } else {
      all[userId] = [...favs, calculatorSlug]
    }
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(all))
    return all[userId]
  } catch {
    return []
  }
}

export function getPrefs() {
  try {
    return JSON.parse(localStorage.getItem(PREFS_KEY) || '{}')
  } catch {
    return {}
  }
}

export function setPrefs(prefs) {
  localStorage.setItem(PREFS_KEY, JSON.stringify(prefs))
}

// Calculator usage stats (for admin panel)
const STATS_KEY = 'calcpro_stats'

export function trackUsage(calculatorSlug) {
  try {
    const stats = JSON.parse(localStorage.getItem(STATS_KEY) || '{}')
    stats[calculatorSlug] = (stats[calculatorSlug] || 0) + 1
    localStorage.setItem(STATS_KEY, JSON.stringify(stats))
  } catch {}
}

export function getStats() {
  try {
    return JSON.parse(localStorage.getItem(STATS_KEY) || '{}')
  } catch {
    return {}
  }
}
