import { afterEach, describe, it } from 'mocha'
import { expect } from 'chai'

import I2C from '../src'

// Setup to read an Iron Pi EEPROM
const EEPROM_DEVICE = '/dev/i2c-1'
const EEPROM_I2C_ADDR = 0x50
const EEPROM_OFFSET = 248 // EEPROM has 256 bytes, so read the last 8
const TEST_SEQUENCE_LEN = 8

describe('node-i2c', () => {
  let i2c: I2C | undefined

  afterEach(() => {
    if (i2c) i2c.close()
    i2c = undefined
  })

  it('reads and writes from a JCore Iron Pi EEPROM device', async function(): Promise<
    void
  > {
    this.timeout(2000)
    i2c = new I2C({ device: EEPROM_DEVICE, address: EEPROM_I2C_ADDR })
    const testBuf = Buffer.from(new Array(TEST_SEQUENCE_LEN).map(idx => idx))
    await i2c.write(EEPROM_OFFSET, testBuf)

    // wait 1 ms before reading back
    await new Promise(resolve => setTimeout(resolve, 1))

    const readBack = await i2c.read(EEPROM_OFFSET, TEST_SEQUENCE_LEN)
    expect(readBack).to.deep.equal(testBuf)
  })
})
