function SayHello() {
  alert("Kyaaaaa");
}

function NitroButton() {
  return (
    <button className="btn btn-primary" onClick={SayHello}>
      Touch me daddy
    </button>
  );
}

export default NitroButton;
