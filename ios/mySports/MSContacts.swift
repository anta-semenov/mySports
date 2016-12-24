//
//  MSContacts.swift
//  mySports
//
//  Created by Anton on 08/10/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

import Foundation
import Contacts

@objc(MSContacts)
class MSContacts: NSObject {
  @objc func getOwnContact(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
    let store = CNContactStore()
    let predicate = CNContact.predicateForContacts(matchingName: "Антон")
    do {
      let contacts = try store.unifiedContacts(matching: predicate, keysToFetch: [
        CNContactIdentifierKey as CNKeyDescriptor,
        CNContactGivenNameKey as CNKeyDescriptor,
        CNContactFamilyNameKey as CNKeyDescriptor,
        CNContactPhoneNumbersKey as CNKeyDescriptor
        ])
      resolve("was called")
    } catch (let error) {
      reject(error.localizedDescription, error.localizedDescription, error)
    }
  }
}
