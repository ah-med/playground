import React from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard">
            <div className="dashboard-content">
                <h2>My Todos</h2>
                <TodoForm />
                <TodoList />
            </div>
        </div>
    );
};

export default Dashboard; 