import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>korkt-kim</title>
      </Head>
      create next app
      <br />
      1.컴파일과 번들링이 자동으로 된다.(webpack과 babel)
      <br />
      2. 핫로딩이 된다
      <br />
      3. 서버사이드 렌더링이 지원된다
      <br />
      4. 스태틱 파일을 지원한다.
      <br />- public 폴더 밑에 만들면된다.
    </div>
  );
}
