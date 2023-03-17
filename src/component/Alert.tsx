interface IAlert {
  message: string;
  onClickAlert: () => void;
}

const Alert = ({ onClickAlert, message }: IAlert) => {
  const onClick = () => {
    onClickAlert();
  };
  return (
    <div>
      <div onClick={onClick}></div>
      <div>
        <h1>E R R O R :</h1>
        {message}
      </div>
    </div>
  );
};
export default Alert;
