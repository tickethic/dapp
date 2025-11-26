'use client'

import { useMemo } from 'react'
import { parseAbiItem, decodeEventLog } from 'viem'

// Event signature for EventCreated
const EVENT_CREATED_SIGNATURE = 'EventCreated(uint256,address)'

export function useEventLogs(receipt: any) {
  const eventData = useMemo(() => {
    if (!receipt?.logs) return null

    // Find the EventCreated event log
    const eventLog = receipt.logs.find((log: any) => {
      // The EventCreated event signature hash
      const eventSignature = '0x...' // This would be the actual keccak256 hash
      return log.topics[0] === eventSignature
    })

    if (!eventLog) return null

    try {
      // Decode the event log
      const decoded = decodeEventLog({
        abi: [parseAbiItem(`event ${EVENT_CREATED_SIGNATURE}`)],
        data: eventLog.data,
        topics: eventLog.topics,
      })

      return {
        eventId: decoded.args[0],
        eventAddress: decoded.args[1],
      }
    } catch (error) {
      console.error('Error decoding event log:', error)
      return null
    }
  }, [receipt])

  return eventData
}
