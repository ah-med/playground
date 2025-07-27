import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Todo } from '../types';
import { useAuth } from './AuthContext';

interface TodoContextType {
    todos: Todo[];
    addTodo: (title: string) => void;
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
    updateTodo: (id: string, title: string) => void;
    loading: boolean;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

interface TodoProviderProps {
    children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    // Load todos from localStorage on mount and when user changes
    useEffect(() => {
        if (user) {
            const savedTodos = localStorage.getItem(`todos_${user.id}`);
            if (savedTodos) {
                try {
                    const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
                        ...todo,
                        createdAt: new Date(todo.createdAt)
                    }));
                    setTodos(parsedTodos);
                } catch (err) {
                    console.error('Error loading todos:', err);
                    setTodos([]);
                }
            } else {
                setTodos([]);
            }
        } else {
            setTodos([]);
        }
        setLoading(false);
    }, [user]);

    // Save todos to localStorage whenever todos change
    useEffect(() => {
        if (user) {
            localStorage.setItem(`todos_${user.id}`, JSON.stringify(todos));
        }
    }, [todos, user]);

    const addTodo = (title: string) => {
        if (!user) return;

        const newTodo: Todo = {
            id: Date.now().toString(),
            title: title.trim(),
            completed: false,
            createdAt: new Date(),
            userId: user.id,
        };

        setTodos(prev => [newTodo, ...prev]);
    };

    const toggleTodo = (id: string) => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );
    };

    const deleteTodo = (id: string) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    };

    const updateTodo = (id: string, title: string) => {
        if (!title.trim()) return;

        setTodos(prev =>
            prev.map(todo =>
                todo.id === id
                    ? { ...todo, title: title.trim() }
                    : todo
            )
        );
    };

    const value: TodoContextType = {
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        updateTodo,
        loading,
    };

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodo = (): TodoContextType => {
    const context = useContext(TodoContext);
    if (context === undefined) {
        throw new Error('useTodo must be used within a TodoProvider');
    }
    return context;
}; 