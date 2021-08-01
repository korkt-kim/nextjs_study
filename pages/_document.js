import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

//nextJS에서 제공하는 document를 customizeing할 수 있다.
//html head body 태그를 만들기 위해서는 이 파일을 만들어야한다.
// css event같은거 처리하지 않는다.
