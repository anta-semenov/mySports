//
//  SiphashTest.swift
//  mySports
//
//  Created by Anton on 06/01/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

import XCTest

class SiphashTest: XCTestCase {
    
    override func setUp() {
        super.setUp()
        // Put setup code here. This method is called before the invocation of each test method in the class.
    }
    
    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        super.tearDown()
    }
    
    func testExample() {
      // This is an example of a functional test case.
      // Use XCTAssert and related functions to verify your tests produce the correct results.
      //Check siphash for uniq
      var hashes = [String: [String]]()
      let rounds = 10000
      var repeatHashes = [String]()
      
      for _ in 0...rounds {
        var code: String
        switch arc4random()%4 {
        case 0:
          code = "us"
        case 1:
          code = "ru"
        case 2:
          code = "fr"
        case 3:
          code = "cz"
        default:
          code = "uk"
        }
        
        var number = Int(arc4random() % 10)
        
        for _ in 0..<10 {
          number = number * 10 + Int(arc4random() % 10)
        }
        
        let testNumber = "\(code)\(number)"
        let hash = testNumber.siphash()
        
        if var testNumberValue = hashes[hash] {
          if testNumberValue.index(of: testNumber) == nil {
            testNumberValue.append(testNumber)
            hashes[hash] = testNumberValue
          }
          
          if repeatHashes.index(of: hash) == nil {
            repeatHashes.append(hash)
          }
        } else {
          hashes[hash] = [testNumber]
        }
      }
      
      for repeatHash in repeatHashes {
        print("repeatHash: \(repeatHash), value: \(hashes[repeatHash])")
      }
      
      XCTAssert(repeatHashes.count == 0)
      
    }
    
    func testPerformanceExample() {
        // This is an example of a performance test case.
        self.measure {
          // Put the code you want to measure the time of here.
          _ = "test short message".siphash()
        }
    }
    
}
