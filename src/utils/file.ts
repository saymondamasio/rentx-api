import fs from 'fs/promises'

export const deleteFile = async (filename: string) => {
  try {
    // verifica se existe o arquivo, se não existir retorna um erro
    await fs.stat(filename)
  } catch (error) {
    return
  }

  // se o arquivo existir, deleta
  await fs.unlink(filename)
}
