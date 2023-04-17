import { create } from 'ipfs-http-client'

const ipfs = create({
  host: 'localhost',
  port: 5001,
  protocol: 'http'
})

// Function to insert data to IPFS
export async function addData(data: string): Promise<string> {
  try {
    const result = await ipfs.add(data)
    return result.cid.toString()
  } catch (error) {
    console.error('Error adding data to IPFS:', error)
    throw error
  }
}

// Function to delete data from IPFS
export async function deleteData(cid: string): Promise<void> {
  try {
    await ipfs.pin.rm(cid)
    console.log(`Deleted ${cid} from IPFS`)
  } catch (error) {
    console.error('Error deleting data from IPFS:', error)
    throw error
  }
}

// Function to query data from IPFS
export async function getDataAsBlob(cid: string , type : string): Promise<Blob> {
  try {
    const chunks = [];
    for await (const chunk of ipfs.cat(cid)) {
        chunks.push(chunk);
    }
    const blob = new Blob(chunks, { type: type });
    return blob
  } catch (error) {
    console.error('Error getting data from IPFS:', error)
    throw error
  }
}

export async function getDataAsUrl(cid : string  ,type : string) {
    const chunks = [];
    for await (const chunk of ipfs.cat(cid)) {
        chunks.push(chunk);
    }
    const imageData = new Blob(chunks, { type: type });
    return URL.createObjectURL(imageData);
}


export async function getAllFiles() {
    const files = [];
    for await (const file of ipfs.ls('/')) {
      files.push(file);
    }
    return files;
  }
  