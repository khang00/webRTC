import { useState } from "react";

interface FormProps {
  title: string;
  onSubmit: (username: string) => void;
}

const Form = (props: FormProps) => {
  const [username, setUsername] = useState("");

  const registerUser = (event) => {
    event.preventDefault();
    props.onSubmit(username);
  };

  const onInput = (event) => {
    setUsername(event.target.value);
  };

  return (
    <form onSubmit={registerUser}>
      <label htmlFor="username">{props.title}</label>
      <input
        id="username"
        type="text"
        autoComplete="username"
        required
        onChange={onInput}
      />
      <button type="submit">Begin</button>
    </form>
  );
};

export default Form;
