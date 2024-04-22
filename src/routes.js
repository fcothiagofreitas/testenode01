import { randomUUID } from "crypto";
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-roud-path.js";

const database = new Database()

export const routes = [
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date()
      }
      database.insert('tasks', task)
      return res.writeHead(201).end()
    }
  },
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const tasks = database.select('tasks')
      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description} = req.body  
      
      database.update( 'tasks', id, {
        title, 
        description,
        update_at: new Date()
      } )  
 
      return res.writeHead(204).end()
    } 
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      database.delete('tasks', id)

      return res.writeHead(200).end()
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params

      // const { completed_at } = req.body 

      // if(completed_at === null || completed_at === 'complet' ){
      //   database.patch( 'tasks', id, {
      //     completed_at: 'complet'
      //   } )
      // } else if (completed_at === 'incomplet') {
      //   database.patch( 'tasks', id, {
      //     completed_at: null
      //   } )
      // }

      database.patch('tasks', id)
      return res.writeHead(200).end()
    }
  }
]