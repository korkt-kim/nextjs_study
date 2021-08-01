//매번 타이틀과 내용이 바뀌기때문에 SSR이 필요해보임
//소스를 보면 이 상품에 대한 어떠한 정보도 얻을 수 없다. 껍데기만 pre-render된 상태이기때문
//getServerSideProps 를 사용하여 ssr을 구현한다.
import axios from 'axios';
import Head from 'next/head';
import { useEffect } from 'react';

const PID = ({ item }) => {
  // title, description이 들어감으로서 검색엔진에서 사용할 수 있다.
  return (
    <>
      <Head>
        <title>{item.name}</title>
        <meta name="description" content={item.description}></meta>
      </Head>
      {item && (
        <div>
          <p>{item?.name}</p>
          <p>{item?.description}</p>
        </div>
      )}
    </>
  );
};

export default PID;

export async function getServerSideProps(context) {
  // context는 params 요청, 응답 쿼리들을 받는다
  const pid = context.params.pid;
  const apiUrl = `http://makeup-api.herokuapp.com/api/v1/products/${pid}.json`;
  const res = await axios.get(apiUrl);
  const data = res.data;

  return {
    props: {
      item: data,
    },
  };
}
