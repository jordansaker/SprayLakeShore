type Farm = 'Main' | 'Top' | 'Lavers' | 'Bertolas'

interface Block {
  id?: number,
  blockName: string,
  blockSize: number,
  farm: Farm,
  fencing?: string
}

export default Block