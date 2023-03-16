interface IAlert {
  message: string;
  onClickAlert: () => void;
}

const Alert = ({ onClickAlert, message }: IAlert) => {
  const onClick = () => {
    onClickAlert();
  };
  return (
    <div className="min-w-full min-h-full fixed top-0 left-0 flex justify-center items-center">
      <div
        onClick={onClick}
        className="min-w-full min-h-full fixed top-0 left-0 z-10 bg-red-100/70"
      ></div>
      <div className="z-20 bg-red-300 py-8 px-5 border-2 border-slate-900 rounded-xl">
        <h1 className="font-semibold">E R R O R :</h1>
        {message}
        </div>
    </div>
  );
};
export default Alert;
