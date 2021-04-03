interface StreamProps {
  streams: MediaStream[];
}

const Stream = (props: StreamProps) => {
  const streams = props.streams.map((stream) => (
    <video width="250" height="200" src={URL.createObjectURL(stream)}></video>
  ));
  return <div>{streams}</div>;
};

export default Stream;
