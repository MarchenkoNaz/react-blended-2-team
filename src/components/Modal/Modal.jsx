import { BackDrop } from './Modal.styled';

export const Modal = ({ children, onclose }) => {
  const handleClick = evt => {
    if (evt.target === evt.currentTarget) {
      onclose();
    }
  };
  return <BackDrop onClick={handleClick}>{children}</BackDrop>;
};
