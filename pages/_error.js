// 500번대 에러는 정적으로 제공할 수 없다.
// 500대 에러는 서버에서 에러메세지를 보내주고 이를 이용하여 페이지가 바뀔수 있기때문
// _error.js같은 경우 모든 400 500 에러 모두 처리한다.

function Error({ statusCode }) {
  return <p>{statusCode ? `An error ${statusCode} occured on server` : `An error occured on client`}</p>;
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
