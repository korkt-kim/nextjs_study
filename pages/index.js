//굳이 서버사이드 렌더링이 필요해보이지 않음
import axios from 'axios';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import ItemList from '../src/component/ItemList';
import { Loader } from 'semantic-ui-react';

export default function Home() {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  function getData() {
    axios.get(API_URL).then((res) => {
      setList(res.data);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Head>
        <title>korkt-kim</title>
        <meta name="description" content="홈입니다."></meta>
      </Head>
      {isLoading && (
        <div style={{ padding: '300px 0' }}>
          <Loader inline="centered" active>
            Loading
          </Loader>
        </div>
      )}
      {!isLoading && (
        <div>
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
          <ItemList list={list}></ItemList>
        </div>
      )}
    </div>
  );
}
