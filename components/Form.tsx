interface FormProps {
  title: string;
  onSubmit: (username: string) => void;
}

const Form = (props: FormProps) => {
  const registerUser = (event) => {
    event.preventDefault();
    props.onSubmit(event.target.value);
  };

  return (
    <form onSubmit={registerUser}>
      <label htmlFor="username">{props.title}</label>
      <input id="username" type="text" autoComplete="username" required />
      <button type="submit">Begin</button>
    </form>
  );
};

export default Form;
