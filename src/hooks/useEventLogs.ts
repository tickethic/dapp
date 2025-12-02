'use client'

import { useMemo } from 'react'
import { parseAbiItem, decodeEventLog, Address, Log } from 'viem'
import { TransactionReceipt } from 'viem'

// Event signature for EventCreated
const EVENT_CREATED_SIGNATURE = 'EventCreated(uint256,address)'

// Remplacez '0x...' par le vrai hash keccak256 de votre event
const EVENT_CREATED_TOPIC = '0x...' as `0x${string}`

export function useEventLogs(receipt: TransactionReceipt | null) {
  const eventData = useMemo(() => {
    if (!receipt?.logs) return null

    // Find the EventCreated event log
    const eventLog = receipt.logs.find((log: Log) => {
      return log.topics[0] === EVENT_CREATED_TOPIC
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
        eventId: decoded.args[0] as bigint,
        eventAddress: decoded.args[1] as Address,
      }
    } catch (error) {
      console.error('Error decoding event log:', error)
      return null
    }
  }, [receipt])

  return eventData
}
