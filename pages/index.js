//굳이 서버사이드 렌더링이 필요해보이지 않음
import axios from 'axios';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import ItemList from '../src/component/ItemList';
import { Loader } from 'semantic-ui-react';

export default function Home({ list }) {
  return (
    <div>
      <Head>
        <title>korkt-kim</title>
        <meta name="description" content="홈입니다."></meta>
      </Head>
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
    </div>
  );
}

export async function getStaticProps() {
  const API_URL = process.env.api_url; // 클라이언트 환경이 아니기때문에 NEXT_PUBLIC에서 바꿔준다
  const res = await axios.get(API_URL);
  const data = res.data;
  return {
    props: {
      list: data,
    },
  };
}

/*getStaticProps 빌드결과 .next/server/pages/view에 3개의 html이 생성되었다.*/
