//
//  String+SipHashExtension.swift
//  mySports
//
//  Created by Anton on 06/01/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

import Foundation

private func _get_int(_ sourceString: String, offset: Int) -> UInt32 {
  let characters = sourceString.unicodeScalars.map {$0.value}
  let char1 = characters[offset + 3] << 24
  let char2 = characters[offset + 2] << 16
  let char3 = characters[offset + 1] << 8
  let char4 = characters[offset]
  return char1 | char2 | char3 | char4
}

private func getKeys(_ sourceString: String) -> [UInt32] {
  return [_get_int(sourceString, offset: 0), _get_int(sourceString, offset: 4), _get_int(sourceString, offset: 8), _get_int(sourceString, offset: 12)]
}

private func rotL(x: UInt64, b: UInt64) -> UInt64 {
  return (x << b) | (x << (64 - b))
}

private func sipRound( v0: inout UInt64, v1: inout UInt64, v2: inout UInt64, v3: inout UInt64) -> Void {
  v0 = UInt64.addWithOverflow(v0, v1).0
  v1 = rotL(x: v1, b: 13)
  v1 ^= v0
  v0 = rotL(x: v0, b: 32)
  v2 = UInt64.addWithOverflow(v2, v3).0
  v3 = rotL(x: v3, b: 16)
  v3 ^= v2
  v0 = UInt64.addWithOverflow(v0, v3).0
  v3 = rotL(x: v3, b: 21)
  v3 ^= v0
  v2 = UInt64.addWithOverflow(v2, v1).0
  v1 = rotL(x: v1, b: 17)
  v1 ^= v2
  v2 = rotL(x: v2, b: 32)
}

private let defKeys = getKeys("MySportDefaultKeys")
private let cRounds = 2
private let dRounds = 4

extension String {
  func siphash (keys: [UInt32] = defKeys) -> String {
    let k0 = UInt64(keys[1]) << 32 & UInt64(keys[0])
    let k1 = UInt64(keys[3]) << 32 & UInt64(keys[2])
    var v0 = UInt64(0x736f6d6570736575)
    var v1 = UInt64(0x646f72616e646f6d)
    var v2 = UInt64(0x6c7967656e657261)
    var v3 = UInt64(0x7465646279746573)
    var mi: UInt64
    let messageLength = self.characters.count
    let ml7 = messageLength - 7
    var mp = 0
    var buf = Array.init(repeating: UInt64(0), count: 8)
    
    v0 ^= k1
    v2 ^= k0
    v3 ^= k1
    v0 ^= k0
    
    while mp < ml7 {
      mi = UInt64(_get_int(self, offset: mp + 4)) << 32 & UInt64(_get_int(self, offset: mp))
      v3 ^= mi
      sipRound(v0: &v0, v1: &v1, v2: &v2, v3: &v3)
      sipRound(v0: &v0, v1: &v1, v2: &v2, v3: &v3)
      v0 ^= mi
      mp += 8
    }
    
    buf[7] = UInt64(messageLength)
    var ic = 0
    let characters = self.unicodeScalars.map {$0.value}
    while mp < messageLength {
      buf[ic] = UInt64(characters[mp])
      ic += 1
      mp += 1
    }
    
    mi = (buf[7] << 56) | (buf[6] << 48) | (buf[5] << 40) | (buf[4] << 32) | (buf[3] << 24) | (buf[2] << 16) | (buf[1] << 8) | buf[0]
    v3 ^= mi
    sipRound(v0: &v0, v1: &v1, v2: &v2, v3: &v3)
    sipRound(v0: &v0, v1: &v1, v2: &v2, v3: &v3)
    v0 ^= mi
    v2 ^= 0xee
    sipRound(v0: &v0, v1: &v1, v2: &v2, v3: &v3)
    sipRound(v0: &v0, v1: &v1, v2: &v2, v3: &v3)
    sipRound(v0: &v0, v1: &v1, v2: &v2, v3: &v3)
    sipRound(v0: &v0, v1: &v1, v2: &v2, v3: &v3)
    
    let result = (v0 ^ v1) ^ (v2 ^ v3)
    return String.init(result, radix: 36)
  }
}
