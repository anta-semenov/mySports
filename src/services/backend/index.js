import Scorocode from 'scorocode'

// Scorocode.Init({
//   ApplicationID: '7e09cfe241c82d217c47dcec9798f017',
//   JavaScriptKey: '3124285e19e9e3393f9ec86757c2f87e'
// })

export const getAvailableSports = async () => {
  try {
    Scorocode.Init({
      ApplicationID: '7e09cfe241c82d217c47dcec9798f017',
      JavaScriptKey: '3124285e19e9e3393f9ec86757c2f87e'
    })
    const query = new Scorocode.Query('available_sports')
    const queryResult = await query.limit(1000).find()
    return queryResult.result.map(({_id, title}) => ({id: _id, title}))
  } catch (e) {
    console.log(e);
    return []
  }
}

export const getSportHashes = async (sportsIds) => {
  try {
    const query = new Scorocode.Query('sport_hashes')
    const data = await query.limit(1000).select('sport_id', 'hash').containedIn('sport_id', sportsIds).find()
    console.log(data);
    //data.for

  } catch (e) {
    console.log(e);
    return []
  }
}
