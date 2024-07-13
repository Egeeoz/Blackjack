import '../styling/button.scss';

interface ButtonProps {
  handleClick: () => void;
  text: string;
}

const Button = ({ handleClick, text }: ButtonProps) => {
  return <button onClick={handleClick}>{text}</button>;
};

export default Button;
