import { FormEvent, useState } from "react";
interface IForm {
  onClickPost: (topic: String, content: String) => void;
}
function Form({ onClickPost }: IForm) {
  const [topic, setTopic] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const onClickSubmit = (e: FormEvent) => {
    onClickPost(topic, content);
    clear();
  };

  const clear = () => {
    setTopic("");
    setContent("");
  };

  const onChangeTopic = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    setTopic(target.value);
  };

  const onChangeContent = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    setContent(target.value);
  };

  return (
    <div >
      <input
        type="text"
        placeholder="Input topic"
        onChange={onChangeTopic}
        value={topic}
        maxLength={50}
      />
      <textarea
        placeholder="Input content"
        value={content}
        onChange={onChangeContent}
        maxLength={280}
      />
      <button onClick={onClickSubmit}>
        Send Post
      </button>
    </div>
  );
}

export default Form;
