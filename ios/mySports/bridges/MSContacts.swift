//
//  MSContacts.swift
//  mySports
//
//  Created by Anton on 08/10/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

import Foundation
import Contacts

@available(iOS 9.0, *)
@objc(MSContacts)
class MSContacts: NSObject {
  @objc func getOwnContact(resolver: RCTPromiseResolveBlock, rejecter: RCTPromiseRejectBlock) -> Void {
    let store = CNContactStore()
    let predicate - CnCon
    let contact = try store.unifiedContacts(matching: <#T##NSPredicate#>, keysToFetch: <#T##[CNKeyDescriptor]#>)
  }
}
