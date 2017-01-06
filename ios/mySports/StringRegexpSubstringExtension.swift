//
//  StringRegexpSubstringExtension.swift
//  mySports
//
//  Created by Anton on 30/12/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

import Foundation

extension String {
  func substringWithPattern(_ pattern: String) -> String {
    if let range = self.range(of: pattern, options: .regularExpression) {
      return self.substring(with: range)
    }    
    return ""
  }
}
