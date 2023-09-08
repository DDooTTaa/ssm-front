import React from 'react';

function CreateSentence({ title, onCreate, onChange, word, isUpper }) {
    function runScript(e) {
        if(e.keyCode === 13) {
            onCreate();
        }
    }

    return (
        <div className="create-wrapper">
            <input
                className="create-title"
                name="title"
                placeholder={(isUpper % 2 === 0 ? word + "이 " : word + "가 ") + "들어간 문장을 입력해 주세요."}
                value={title}
                onChange={onChange}
                autoComplete="off"
                onKeyDown={runScript}
            />
            <button className="create-bt" onClick={onCreate}>
                등록
            </button>
        </div>
    );
}

export default CreateSentence;