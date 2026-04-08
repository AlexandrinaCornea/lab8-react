import { useEffect, useState } from 'react'
import { getCachedValue, setCachedValue } from '../lib/cache'

export function useFetch(url, options = {}) {
  const { ttl = 0, initialData = null, enabled = true } = options
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(Boolean(enabled && url && !initialData))
  const [error, setError] = useState('')

  useEffect(() => {
    if (!enabled || !url) {
      return undefined
    }

    const controller = new AbortController()

    const load = async () => {
      const cached = getCachedValue(url, ttl)

      if (cached) {
        setData(cached)
        setError('')
        setLoading(false)
        return
      }

      setLoading(true)
      setError('')

      try {
        const response = await fetch(url, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const result = await response.json()
        setData(result)
        setCachedValue(url, result)
        setLoading(false)
      } catch (fetchError) {
        if (fetchError.name === 'AbortError') {
          return
        }

        setError(fetchError.message || 'Unknown error')
        setLoading(false)
      }
    }

    load()

    return () => controller.abort()
  }, [enabled, initialData, ttl, url])

  return { data, loading, error }
}
