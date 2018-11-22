/**
 * Mnemonic words functionalities.
 */

const bip39 = require('bip39')
const bip32 = require('bip32')

const VET_PATH = 'm/44\'/818\'/0\'/0'  // Derive path for the VET key.
const VET_FIRST_PATH = VET_PATH + '/0'  // First key.

const findDuplicateWord = function(anArray){
  for (let i=0; i < anArray.length ;i++){
    for (let j=i+1; j < anArray.length;j++){
      if (anArray[i] == anArray[j]){
        return true
      }
    }
  }

  return false
}
  
const getRandomWords = function(){
  // return a string, which contains space separated words.
  var theString;
  
  for (;;){
    theString = bip39.generateMnemonic(128)
    words = theString.split(' ')
    if (findDuplicateWord(words)){
      continue
    } else {
      break
    }
  }

  return theString  // 12 words in a single string, separated by space.
}

/**
 * 
 * @param {String} words space separated words.
 * @returns {Buffer} 64 Bytes of Buffer
 */
const getBIP32Seed = function(words){
  return bip39.mnemonicToSeed(words)
}

/**
 * 
 * @param {Buffer} seed 
 * @param {String} derive_path
 * @returns {Buffer} 32 Bytes buffer of private key
 */
const getFirstPrivateKey = function(seed, first_derive_path){
  let node = bip32.fromSeed(seed)
  // let bip32RootKey = node.toBase58()
  let key_pair = node.derivePath(first_derive_path)
  return key_pair.privateKey
}

/**
 * VET version of mnemonic derive path.
 * @param {String} words space separated words.
 * @returns {Buffer}
 */
const getFirstVetPrivateKeyFromWords = function(words){
  let mySeed = getBIP32Seed(words)
  let firstPrivateKey = getFirstPrivateKey(mySeed, VET_FIRST_PATH)
  return firstPrivateKey
}

module.exports = {
  getRandomWords,
  getFirstVetPrivateKeyFromWords
}