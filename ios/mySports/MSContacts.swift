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
    let predicate = CNContact.predicateForContacts(matchingName: "Максим")
    do {
      let contacts = try store.unifiedContacts(matching: predicate, keysToFetch: [
        CNContactIdentifierKey as CNKeyDescriptor,
        CNContactGivenNameKey as CNKeyDescriptor,
        CNContactFamilyNameKey as CNKeyDescriptor,
        CNContactPhoneNumbersKey as CNKeyDescriptor,
        CNContactEmailAddressesKey as CNKeyDescriptor,
        CNContactSocialProfilesKey as CNKeyDescriptor
        ])[0]
      let name = contacts.givenName
      let familyName = contacts.familyName
      let phoneNumbers = "\(contacts.phoneNumbers[1].value)"
      let countryCode = phoneNumbers.substringWithPattern("(?<=countryCode=)\\w+")
      let digits = phoneNumbers.substringWithPattern("(?<=digits=\\D?)[0-9]+")
      
      resolve(contacts)
    } catch (let error) {
      reject(error.localizedDescription, error.localizedDescription, error)
    }
  }
  
  @objc func getContacts(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) ->  Void {
    var result = [[String: [String]]]()
    let store  = CNContactStore()
    let contactRequest = CNContactFetchRequest(keysToFetch: [CNContactIdentifierKey as CNKeyDescriptor,
                                                             CNContactGivenNameKey as CNKeyDescriptor,
                                                             CNContactFamilyNameKey as CNKeyDescriptor,
                                                             CNContactPhoneNumbersKey as CNKeyDescriptor,
                                                             CNContactEmailAddressesKey as CNKeyDescriptor,
                                                             CNContactSocialProfilesKey as CNKeyDescriptor])
    func handleContact (contact: CNContact, point: UnsafeMutablePointer<ObjCBool>) -> Void {
      var contactInfo = [String: [String]]()
      contactInfo["givenName"] = [contact.givenName]
      contactInfo["familyName"] = [contact.familyName]
      var hashes = [String]()
      contact.phoneNumbers.forEach({(phoneNumber: CNLabeledValue<CNPhoneNumber>) -> Void in
        let phoneString = "\(phoneNumber.value)"
        hashes.append("\(phoneString.substringWithPattern("(?<=countryCode=)\\w+"))\(phoneString.substringWithPattern("(?<=digits=\\D?)[0-9]+"))".siphash())
      })
      contact.emailAddresses.forEach({(emailAddress: CNLabeledValue<NSString>) -> Void in
        hashes.append((emailAddress.value as String).siphash())
      })
      contact.socialProfiles.forEach({(profile: CNLabeledValue<CNSocialProfile>) -> Void in
        hashes.append("\(profile.value.service)\(profile.value.userIdentifier)".siphash())
      })
      contactInfo["contactHashes"] = hashes
      result.append(contactInfo)
    }
    do {
      try store.enumerateContacts(with: contactRequest, usingBlock: handleContact)
      resolve(result)
    } catch (let error) {
      reject(error.localizedDescription, error.localizedDescription, error)
    }
  }
  
}
