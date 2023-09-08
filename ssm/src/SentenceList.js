import React from 'react';

function Sentence({ todo, onRemove, onToggle }) {
    const { id, title, isImportant } = todo;
    return (
        !isImportant ?
        <div
            className="todo-wrapper"
            style={{
                background: isImportant ? '#FFFFFF' : '#f1f1f1f1',
            }}
        >
      <span
          className="todo-title"
      >
        {title}
      </span>
            <div className="button-wrapper">
            <button className="important-bt" onClick={() => onToggle(id)}>
                수정
            </button>
            <button className="remove-bt" onClick={() => onRemove(id)}>
                삭제
            </button>
            </div>
        </div> : <div>
                <input value={title} />
                <div className="button-wrapper">
                <button className="important-bt" onClick={() => onToggle(id)}>
                    수정
                </button>
                <button className="remove-bt" onClick={() => onRemove(id)}>
                    삭제
                </button>
            </div>
            </div>
    );
}

function SentenceList({ todos, onRemove, onToggle, word }) {
    return (
        <div className="todolist-wrapper">
            {todos.map((todo) => (
                <Sentence key={todo.id} todo={todo} onRemove={onRemove} onToggle={onToggle} />
            ))}
        </div>
    );
}

export default SentenceList;