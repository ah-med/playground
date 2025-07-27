import React, { useState } from 'react';
import { useTodo } from '../contexts/TodoContext';
import { Todo } from '../types';

const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
    const { toggleTodo, deleteTodo, updateTodo } = useTodo();
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        if (editTitle.trim()) {
            updateTodo(todo.id, editTitle);
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setEditTitle(todo.title);
        setIsEditing(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <div className="todo-content">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="todo-checkbox"
                />

                {isEditing ? (
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={handleKeyPress}
                        className="todo-edit-input"
                        autoFocus
                    />
                ) : (
                    <span
                        className="todo-title"
                        onDoubleClick={handleEdit}
                    >
                        {todo.title}
                    </span>
                )}
            </div>

            <div className="todo-actions">
                {!isEditing && (
                    <button
                        onClick={handleEdit}
                        className="btn btn-small btn-secondary"
                    >
                        Edit
                    </button>
                )}
                <button
                    onClick={() => deleteTodo(todo.id)}
                    className="btn btn-small btn-danger"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

const TodoList: React.FC = () => {
    const { todos, loading } = useTodo();

    if (loading) {
        return <div className="loading">Loading todos...</div>;
    }

    if (todos.length === 0) {
        return (
            <div className="empty-state">
                <p>No todos yet. Add one above!</p>
            </div>
        );
    }

    return (
        <div className="todo-list">
            {todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </div>
    );
};

export default TodoList; 