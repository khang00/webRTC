interface RoomProps {
  streams: MediaStream[]
}

const Room = (props: RoomProps) => {
  props.streams.map(stream => <video width="250" height="200" src={URL.createObjectURL(stream)}>
  </video>);
};

export default Room;
