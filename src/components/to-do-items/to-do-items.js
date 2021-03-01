import React from 'react';
import './to-do-items.css';

const ToDoItems = ({toDoItems, isLoading, onTableClick}) => {
  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <table onClick={onTableClick}>
      <tbody>
        <tr>
          <td className="table-title" data-name="number">№ п/п</td>
          <td className="table-title" data-name="title">Заголовок</td>
          <td className="table-title" data-name="status">Статус</td>
        </tr>
        {toDoItems.map((toDoItem, index) => {
          return (
            <tr key={index}>
              <td className="toDoNumber">{toDoItem.id}</td>
              <td className="toDoTitle">{toDoItem.title}</td>
              <td className="toDoCompleted">{toDoItem.completed ? `Сделано` : `Не сделано`}</td>
            </tr>
          )
        })}
      </tbody>
    </table >
  )
};

export default ToDoItems;