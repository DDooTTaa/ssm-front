import React, {useState} from 'react';

function Sentence({ todo, onRemove, onToggle, onChangeToggle }) {
    const { id, title, isImportant } = todo;
    const [modifyWord, setModifyWord] = useState('');
    const onChange = (e) => {
        setModifyWord(e.target.value);
    }
    return (
        !isImportant ?
        <div
            className="todo-wrapper"
            style={{
                background: '#f1f1f1f1',
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
        </div> : <div className='todo-wrapper'>
                <input className='modify-input' defaultValue={title} onChange={onChange} />
                <div className="button-wrapper">
                <button className="important-bt" onClick={() => onChangeToggle(id, modifyWord)}>
                    수정
                </button>
                <button className="remove-bt" onClick={() => onRemove(id)}>
                    삭제
                </button>
            </div>
            </div>
    );
}

function SentenceList({ todos, onRemove, onToggle, onChangeToggle }) {
    return (
        <div className="todolist-wrapper">
            {todos.map((todo) => (
                <Sentence key={todo.id} todo={todo} onRemove={onRemove} onToggle={onToggle} onChangeToggle={onChangeToggle} />
            ))}
        </div>
    );
}

export default SentenceList;