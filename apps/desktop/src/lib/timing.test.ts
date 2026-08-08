import { describe, expect, it } from 'vitest'

import {
  STREAM_BACKGROUND_BATCH_MS,
  STREAM_BATCH_MS,
  STREAM_BATTERY_BATCH_MS,
  STREAM_HIDDEN_BATCH_MS,
  streamViewBatchInterval
} from './timing'

describe('streamViewBatchInterval', () => {
  it('uses the normal and battery cadences in a focused visible window', () => {
    expect(streamViewBatchInterval({ focused: true, hidden: false, onBattery: false })).toBe(STREAM_BATCH_MS)
    expect(streamViewBatchInterval({ focused: true, hidden: false, onBattery: true })).toBe(
      STREAM_BATTERY_BATCH_MS
    )
  })

  it('prioritizes background and hidden cadences over the power source', () => {
    expect(streamViewBatchInterval({ focused: false, hidden: false, onBattery: false })).toBe(
      STREAM_BACKGROUND_BATCH_MS
    )
    expect(streamViewBatchInterval({ focused: false, hidden: true, onBattery: true })).toBe(STREAM_HIDDEN_BATCH_MS)
  })
})
