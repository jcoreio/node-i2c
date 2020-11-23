import { promisify } from 'util'
import bindings from 'bindings'

const i2c = bindings('i2c')

export default class I2C {
  readonly device: string
  readonly address: number

  private isOpen = false

  private readonly readBlock = promisify(i2c.readBlock)
  private readonly writeBlock = promisify(i2c.writeBlock)

  constructor({ device, address }: { device: string; address: number }) {
    this.device = device
    this.address = address
  }

  async open(): Promise<void> {
    if (!this.isOpen) {
      await promisify(i2c.open)(this.device)
      i2c.setAddress(this.address)
      this.isOpen = true
    }
  }

  close(): void {
    if (this.isOpen) i2c.close()
    this.isOpen = false
  }

  async read(offset: number, len: number): Promise<Buffer> {
    await this.open()
    return await this.readBlock(offset, len, null)
  }

  async write(offset: number, buf: Buffer): Promise<void> {
    await this.open()
    await this.writeBlock(offset, buf)
  }
}
