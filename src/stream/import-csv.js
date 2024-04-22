import { parse } from "csv-parse";
import fs from 'node:fs'

const pathCsv = new URL('./tasks.csv', import.meta.url)
const stream = fs.createReadStream(pathCsv)

const csvParse = parse({
  delimiter: ',',
  skipEmptyLines: true, 
  fromLine: 2
})

async function run(){
  const linesParrse = stream.pipe(csvParse)

  for await ( const line of linesParrse){
    const [title, description] = line

    await fetch('http://localhost:3334/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/jason',
      },
      body: JSON.stringify({
        title,
        description
      })
    })
  }
}
run()

function wait(ms){
  return new Promise((resolve) => setTimeout(resolve, ms))
}