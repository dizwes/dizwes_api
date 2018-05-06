import * as restify from 'restify'
import {NotFoundError} from 'restify-errors'
import {UserTodo} from './todos.model'
import {ModelRouter} from '../common/model-router'

class UserTodoRouter extends ModelRouter<UserTodo>{
  constructor(){
    super(UserTodo)
  }

  findTodo = (req, resp, next)=>{
    UserTodo.findById(req.params.id, "+todo")
    .then(usr=>{
      if(!usr){
        throw new NotFoundError('User Todo not found')
      }else{
        resp.json(usr.todo)
        return next()
      }
    }).catch(next)
  }

  replaceTodo = (req, resp, next)=>{
    UserTodo.findById(req.params.id).then(usr=>{
      if(!usr){
        throw new NotFoundError('User todo not found')
      }else{
        usr.todo = req.body
        return usr.save()
      }
    }).then(usr=>{
      resp.json(usr.todo)
      return next()
    }).catch(next)
  }

  applyRoutes(application: restify.Server){
    application.get('/todo-users', this.findAll)
    application.get('/todo-users/:id', [this.validateId,this.findById] )
    application.post('/todo-users', this.save)
    application.put('/todou-sers/:id', [this.validateId, this.replace])
    application.patch('/todo-users/:id',[this.validateId, this.update])
    application.del('/todo-users/:id', [this.validateId, this.delete])

    application.get('/todo-users/:id/todo', [this.validateId, this.findTodo])
    application.put('/todo-users/:id/todo', [this.validateId, this.replaceTodo])
  }
}

export const UsertodoRouter = new UserTodoRouter()
