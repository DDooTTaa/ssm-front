import React, {useEffect, useRef, useState} from 'react';
import CreateSentence from './CreateSentence';
import SentenceList from './SentenceList';
import './App.css';

//가 (끝에 받침 없음)
const underRandomWord = ['의자','감자', '커피', '버스', '담배', '나무', '비', '해', '대파', '소화기', '배', '경고', '버그', '위기'];
//이 (끝에 받침 있음)
const upperRandomWord = ['달','책상', '섬', '꽃', '커튼', '선인장', '벚꽃', '칼', '별', '결혼', '꿀', '총', '병', '가을', '간', '연인', '인연', '끝'];

function App() {
  const appTitle = '진부하지 않은 문장 만들기';
  const [inputs, setInputs] = useState({
    title: '',
  });
  const [sentence, setSentence] = useState('');
  const [randomCount, setRandomCount] = useState(0);
  const [changeWord, setChangeWord] = useState('');
  const [todos, setTodos] = useState([]);
  const [newWord, setNewWord] = useState('');
  const [changeMode, setChangeMode] = useState(false);
  const { title } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
    if(e.keyCode === 13) {
      setInputs({
        ...inputs,
        [name]: value,
      });
    }
  };

  const onWordChange = (e) => {
    const { value } = e.target;
    setChangeWord(value);
  }
  useEffect(() => {
    setTodos([]);
  }, [sentence]);

  const nextId = useRef(1);
  const onCreate = () => {
    if (title.length < 1) {
      return;
    } else {
      const newTodo = {
        id: nextId.current,
        title,
      };
      setTodos([...todos, newTodo]);
      setInputs({
        title: '',
      });
      nextId.current += 1;
    }
  };

  const onRemove = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const onToggle = (id) => {
    setTodos(
        todos.map((todo) => (todo.id === id ? { ...todo, isImportant: !todo.isImportant } : todo)),
    );
  };
  const onChangeToggle = (id, word) => {
    console.log(word);
    setTodos(
        todos.map((todo) => (todo.id === id ? { ...todo, isImportant: !todo.isImportant, title: word } : todo)),
    );
  }
  const chooseSentence = () => {
    setRandomCount(randomCount + 1);
    setSentence(randomCount % 2 === 0 ? underRandomWord[Math.floor(Math.random() * underRandomWord.length)] : upperRandomWord[Math.floor(Math.random() * upperRandomWord.length)] );
    setChangeMode(false);
  }
  const allChange = () => {
    let list;
    if(changeMode) {
      list = todos.map((todo) => {
        const title = todo.title.replaceAll(newWord, changeWord);
        return {id:todo.id, title: title}
      })
    } else {
      list = todos.map((todo) => {
        const title = todo.title.replaceAll(sentence, changeWord);
        return {id:todo.id, title: title}
      });
    }
    setTodos(list);
    setChangeMode(true);
    setNewWord(changeWord);
  }
  function runScript(e) {
    if(e.keyCode === 13) {
      allChange();
    }
  }

  return (
      <div className="app-wrapper">
        <div className="todo-logo">
          {appTitle}
        </div>
        <div className="sentence-button">
          <button className="choose-sentence" onClick={chooseSentence}>
            단어 뽑기
          </button>
          <p className='word'>{sentence}</p>
        </div>
        {sentence === '' ? <></> :
            <>
            {changeMode ? <></> : <CreateSentence title={title} onCreate={onCreate} onChange={onChange} word={sentence} isUpper={randomCount}/>}
            <SentenceList todos={todos} onRemove={onRemove} onToggle={onToggle} onChangeToggle={onChangeToggle}/>
            </>
        }
        {todos.length === 0 ? <></> :
            <div className='change-wrapper'>
              <p className='change-word'>바꿀 단어:</p>
              <input placeholder={sentence} onChange={onWordChange} className='change-input' onKeyDown={runScript}/>
              <button className='all-change' onClick={allChange}>바꾸기</button>
            </div>
        }
      </div>
  );
}

export default App;