/**
 * Adapted from ETH open source projects.
 * Special thanks go to https://github.com/bokub/vanity-eth
 * @author laalaguer
 */
const secp256k1 = require('secp256k1')
const keccak = require('keccak')
const randomBytes = require('randombytes')
const scrypt = require('scrypt-js')
const CryptoJS = require('crypto-js')
const uuid = require('uuid')

/**
 * Helper: slice WordArray
 * @param wordArray {CryptoJS.lib.WordArray}
 * @param start {Number} starting from 0
 * @param end {Number} end till length-1
 * @returns {CryptoJS.lib.WordArray}
 */
const sliceWordArray = function (wordArray, start, end) {
  const newArray = wordArray.clone()
  newArray.words = newArray.words.slice(start, end)
  newArray.sigBytes = (end - start) * 4
  return newArray
}

/**
 * Helper: Buffer to WordArray
 * @param buffer {Buffer}
 * @returns {CryptoJS.lib.WordArray}
 */
const bufferToWordArray = function (buffer) {
  return CryptoJS.enc.Hex.parse(buffer.toString('hex'))
}

/**
 * Helper: bytes[] to WordArray
 * @param bytes {byte[]}
 * @returns {CryptoJS.lib.WordArray}
 */
const bytesToWordArray = function (bytes) {
  let buffer = Buffer.from(bytes)
  let hexString = buffer.toString('hex')
  return CryptoJS.enc.Hex.parse(hexString)
}

/**
 * Create a random private key buffer.
 * @returns {Buffer} private key: a 32 bytes buffer
 */
const createRandomPrivateKey = function () {
  const privateKey = randomBytes(32)
  return privateKey
}

/**
 * Turn private key into address
 * @param privateKey {Buffer} 32 bytes of private key
 * @returns {Buffer} 20 bytes of address
 */
const privateKeyToAddress = function (privateKey) {
  // 32 bytes of private key buffer to generate 65 bytes of public key.
  // Get rid of 0x04 at the begin of public key. (65-1=64 bytes remains)
  const publicKey = secp256k1.publicKeyCreate(privateKey, false).slice(1)
  // Take right-most 20 bytes and turn to hex representation.
  return keccak('keccak256').update(publicKey).digest().slice(-20)
}

/**
 * Create a random {address, privatekey} pair
 * @returns {Object} as of {address, privatekey} address has standard 0x prefix
 */
const createWallet = function () {
  const priv = createRandomPrivateKey()
  const addr = privateKeyToAddress(priv)

  const privHex = priv.toString('hex')
  const addrHex = addr.toString('hex')

  return {
    address: addrHex,
    addressPrefixed: '0x' + addrHex,
    addressEIP55: toEIP55Address(addrHex),
    addressEIP55Prefixed: '0x' + toEIP55Address(addrHex),
    privateKey: privHex
  }
}

/**
 * Form a wallet from a given private key.
 * @param {Buffer} priv
 */
const gatherWallet = function (priv) {
  const addr = privateKeyToAddress(priv)

  const privHex = priv.toString('hex')
  const addrHex = addr.toString('hex')

  return {
    address: addrHex,
    addressPrefixed: '0x' + addrHex,
    addressEIP55: toEIP55Address(addrHex),
    addressEIP55Prefixed: '0x' + toEIP55Address(addrHex),
    privateKey: privHex
  }
}

/**
 * Turn a lower case address to case sensitive address as per EIP 55.
 * @param {String} address A hex presenting the address, without leading 0x.
 * @returns {String} A hex address but with lower/upper case.
 */
const toEIP55Address = function (address) {
  address = address.toLowerCase()
  const hash = keccak('keccak256').update(address).digest().toString('hex')
  let ret = ''
  for (let i = 0; i < address.length; i++) {
    ret += parseInt(hash[i], 16) >= 8 ? address[i].toUpperCase() : address[i]
  }
  return ret
}

/**
 * Check if is valid EIP55 address.
 * @param {String} address A hex presenting the address, without leading 0x.
 * @returns {Boolean} is valid or not.
 */
const isEIP55Address = function (address) {
  let temp = address.toLowerCase()
  let constructed = toEIP55Address(temp)
  if (constructed === address) {
    return true
  } else {
    return false
  }
}

/**
 * Check if is valid address by length, uppper/lower case.
 * @param {String} address A hex presenting the address, without leading 0x.
 * @returns {Boolean} If is valid or not.
 */
const isValidAddress = function (address) {
  if (address.length !== 40) {
    return false
  }
  if (!onlyAlphanumeric(address)) {
    return false
  }
  let temp = address.toLowerCase()
  if (temp === address) {
    return true
  } else { // upper/lower case mixed.
    return isEIP55Address(address)
  }
}

/**
 * Check if only alphanumero.
 * @param {String} aString a string input.
 */
const onlyAlphanumeric = function (aString) {
  const pattern = /^[A-Za-z0-9]+$/i
  return pattern.test(aString)
}

/**
 * Generate a keystore using private key and use chosen password.
 * @param {String} privKey A hex string of private key, without 0x prefix
 * @param {String} password A ASCII user password eg. /^[A-Za-z0-9!@#$%^&*()]+$/
 * @param {Function} cb Which takes (error, progress, result), progress 0.0~1.0 result is a JS Object of keystore.
 */
const createKeystore = function (privKey, password, cb) {
  if (!cb) {
    throw Error('Need a callback. Which takes (error, result)')
  }
  const N = 262144
  const r = 8
  const p = 1
  const dkLen = 32

  let passwordBuffer = Buffer.from(password) // Buffer
  let salt = randomBytes(32) // Buffer
  let iv = bufferToWordArray(randomBytes(16)) // WordArray

  scrypt(passwordBuffer, salt, N, r, p, dkLen, function (error, progress, dkey) {
    if (error) {
      console.log('Error:', error)
      cb(error, 0, null)
    } else if (dkey) {
      // dkey: Array, 32 bytes
      let derivedKeyWordArray = bytesToWordArray(dkey)

      const cipher = CryptoJS.AES.encrypt(
        CryptoJS.enc.Hex.parse(privKey),
        sliceWordArray(derivedKeyWordArray, 0, 4),
        {
          iv: iv,
          mode: CryptoJS.mode.CTR,
          padding: CryptoJS.pad.NoPadding
        }
      )

      const mac = CryptoJS.SHA3(sliceWordArray(derivedKeyWordArray, 4, 8).concat(cipher.ciphertext), {
        outputLength: 256
      })

      const ret = {
        version: 3,
        id: uuid.v4(),
        address: privateKeyToAddress(Buffer.from(privKey, 'hex')).toString('hex'),
        crypto: {
          kdf: 'scrypt',
          kdfparams: { dklen: dkLen, salt: salt.toString('hex'), n: N, r: r, p: p },
          cipher: 'aes-128-ctr',
          ciphertext: cipher.ciphertext.toString(),
          cipherparams: { iv: iv.toString() },
          mac: mac.toString()
        }
      }
      cb(null, 1.0, ret)
    } else {
      // console.log('Progress:', progress)
      cb(null, progress, null)
    }
  })
}

export {
  createWallet,
  gatherWallet,
  privateKeyToAddress,
  toEIP55Address,
  isEIP55Address,
  isValidAddress,
  onlyAlphanumeric,
  createKeystore
}
