# i2c

Bindings for i2c-dev. Plays well with Raspberry Pi and Beaglebone.

Based on [kelly/node-i2c](https://github.com/kelly/node-i2c), converted from CoffeeScript
to TypeScript and from callbacks to promises, but with only a subset of the original
project's methods.

## Install

````bash
$ yarn add @jcoreio/i2c
````

## Usage

```typescript
import I2C from '@jcoreio/i2c'
const i2c = new I2C({ device: '/dev/i2c-1', address: 0x50 })
const OFFSET = 16

// In an async function
const writeData = Buffer.alloc(8)
try {
  await i2c.write(OFFSET, writeData)
  // wait 1 ms before reading back
  await new Promise(resolve => setTimeout(resolve, 1))
  // read back
  const readData = await i2c.read(OFFSET, 8)
} finally {
  i2c.close()
}
```

## Raspberry Pi Setup

```bash
$ sudo vi /etc/modules
```

Add these two lines

```bash
i2c-bcm2708 
i2c-dev
```

```bash
$ sudo vi /etc/modprobe.d/raspi-blacklist.conf
```

Comment out blacklist i2c-bcm2708

```
#blacklist i2c-bcm2708
```

Load kernel module

```bash
$ sudo modprobe i2c-bcm2708
$ sudo modprobe i2c-dev
```

Make device writable 

```bash
sudo chmod o+rw /dev/i2c*
```

Install gcc 4.8 (required for Nan)

```bash
sudo apt-get install gcc-4.8 g++-4.8
sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.6 60 --slave /usr/bin/g++ g++ /usr/bin/g++-4.6
sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.8 40 --slave /usr/bin/g++ g++ /usr/bin/g++-4.8
sudo update-alternatives --config gcc 
```

Set correct device for version

```javascript

new I2C({ address, device: '/dev/i2c-0' }) // rev 1
new I2C({ address, device: '/dev/i2c-1' }) // rev 2

```

## Beaglebone

```bash
$ ntpdate -b -s -u pool.ntp.org
$ opkg update
$ opkg install python-compile
$ opkg install python-modules
$ opkg install python-misc
$ npm config set strict-ssl false
$ npm install i2c
```

## Node 0.11 and under

```bash
npm install i2c@0.1.8
```

## Projects using i2c

- **bonescript** https://github.com/jadonk/bonescript/
- **ADXL345** https://github.com/timbit123/ADXL345 
- **HMC6343** https://github.com/omcaree/node-hmc6343
- **LSM303** https://github.com/praneshkmr/node-lsm303
- **MPU6050** https://github.com/jstapels/mpu6050/
- **MCP3424** https://github.com/x3itsolutions/mcp3424
- **blinkm** https://github.com/korevec/blinkm
- **click boards** https://github.com/TheThingSystem/node-click-boards
- more: https://www.npmjs.org/browse/depended/i2c

## Contributors

Thanks to @alphacharlie for Nan rewrite, and @J-Cat for Node 14 updates.

## Questions?

http://www.twitter.com/korevec
