import { IStorageProvider } from '../IStorageProvider'

export class StorageProviderInMemory implements IStorageProvider {
  private storage: string[] = []

  public async saveFile(file: string): Promise<string> {
    this.storage.push(file)

    return file
  }

  public async deleteFile(file: string): Promise<void> {
    const findIndex = this.storage.findIndex(findFile => findFile === file)

    this.storage.splice(findIndex, 1)
  }
}
