//
//  String+SipHashExtension.swift
//  mySports
//
//  Created by Anton on 06/01/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

import Foundation

extension String {
  func mySportHash() -> String {
    return self.unicodeScalars.reduce("") {$0 + String.init($1.value, radix: 36)}
  }
}
