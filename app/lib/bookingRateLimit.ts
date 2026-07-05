type RateLimitEntry = {
  count: number
  resetAt: number
}

type RateLimitResult = {
  allowed: boolean
  retryAfterSeconds: number
}

const windowMs = 10 * 60 * 1000
const maxRequests = 5
const maxTrackedClients = 5000
const requestsByClient = new Map<string, RateLimitEntry>()

function removeExpiredEntries(now: number) {
  for (const [clientId, entry] of requestsByClient) {
    if (entry.resetAt <= now) {
      requestsByClient.delete(clientId)
    }
  }
}

function keepStoreBounded(now: number) {
  if (requestsByClient.size < maxTrackedClients) {
    return
  }

  removeExpiredEntries(now)

  if (requestsByClient.size >= maxTrackedClients) {
    const oldestClientId = requestsByClient.keys().next().value

    if (oldestClientId) {
      requestsByClient.delete(oldestClientId)
    }
  }
}

export function checkBookingRateLimit(
  clientId: string,
  now = Date.now()
): RateLimitResult {
  const current = requestsByClient.get(clientId)

  if (!current || current.resetAt <= now) {
    keepStoreBounded(now)
    requestsByClient.set(clientId, {
      count: 1,
      resetAt: now + windowMs,
    })

    return { allowed: true, retryAfterSeconds: 0 }
  }

  if (current.count >= maxRequests) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((current.resetAt - now) / 1000)
      ),
    }
  }

  current.count += 1
  return { allowed: true, retryAfterSeconds: 0 }
}
