"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify_errors_1 = require("restify-errors");
const todos_model_1 = require("./todos.model");
const model_router_1 = require("../common/model-router");
class UserTodoRouter extends model_router_1.ModelRouter {
    constructor() {
        super(todos_model_1.UserTodo);
        this.findTodo = (req, resp, next) => {
            todos_model_1.UserTodo.findById(req.params.id, "+todo")
                .then(usr => {
                if (!usr) {
                    throw new restify_errors_1.NotFoundError('User Todo not found');
                }
                else {
                    resp.json(usr.todo);
                    return next();
                }
            }).catch(next);
        };
        this.replaceTodo = (req, resp, next) => {
            todos_model_1.UserTodo.findById(req.params.id).then(usr => {
                if (!usr) {
                    throw new restify_errors_1.NotFoundError('User todo not found');
                }
                else {
                    usr.todo = req.body;
                    return usr.save();
                }
            }).then(usr => {
                resp.json(usr.todo);
                return next();
            }).catch(next);
        };
    }
    applyRoutes(application) {
        application.get('/todo-users', this.findAll);
        application.get('/todo-users/:id', [this.validateId, this.findById]);
        application.post('/todo-users', this.save);
        application.put('/todou-sers/:id', [this.validateId, this.replace]);
        application.patch('/todo-users/:id', [this.validateId, this.update]);
        application.del('/todo-users/:id', [this.validateId, this.delete]);
        application.get('/todo-user/:id/todo', [this.validateId, this.findTodo]);
        application.put('/todo-user/:id/todo', [this.validateId, this.replaceTodo]);
    }
}
exports.UsertodoRouter = new UserTodoRouter();
