import React, { useState } from 'react';
import { useTodo } from '../contexts/TodoContext';

const TodoForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const { addTodo } = useTodo();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) return;

        addTodo(title);
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <div className="form-group">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What needs to be done?"
                    className="todo-input"
                    required
                />
                <button type="submit" className="btn btn-primary add-todo-btn">
                    Add Todo
                </button>
            </div>
        </form>
    );
};

export default TodoForm; 