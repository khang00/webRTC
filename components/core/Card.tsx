const Card = (props) => {
  return (
    <div className="card" style={{ textAlign: "center" }}>
      <div className="card-body">
        <p className="card-text">{props.title}</p>
        <h3 className="card-title">{props.quantity}</h3>
      </div>
    </div>
  );
};

export default Card;
