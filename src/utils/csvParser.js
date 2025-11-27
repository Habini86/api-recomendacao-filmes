import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { parse } from 'csv-parse/sync'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const csvParser = {
  readCsv: (filePath) => {
    const absolutePath = path.resolve(__dirname, filePath)
    const fileContent = fs.readFileSync(absolutePath)
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      relax_column_count: true, // Adicionado para ignorar linhas inválidas
    })
    return records
  },
}

export default csvParser