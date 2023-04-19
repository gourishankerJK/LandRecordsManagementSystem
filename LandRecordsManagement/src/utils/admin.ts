export const getAllUsers = async (contract: any, accounts: any) => {
  const data = await contract.methods.getAllUsers().call({ from: accounts[0] })
  let officals = []
  let user = []
  console.log(data)
  return data
}

export const getProfile = async (contract: any, accounts: any) => {
  try {
    const data = await contract.methods
      .getOwnProfile()
      .call({ from: accounts[0] })
    return data
  } catch (err) {
    console.log(err)
    return null
  }
}


export const getAllLands = async (contract: any, accounts: any) => {
  const data = await contract.methods.getAllLandRecords().call({ from: accounts[0] })
  let officals = []
  let user = []
  console.log(data)
  return data
}