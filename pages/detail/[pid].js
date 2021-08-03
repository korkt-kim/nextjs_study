//매번 타이틀과 내용이 바뀌기때문에 SSR이 필요해보임
//소스를 보면 이 상품에 대한 어떠한 정보도 얻을 수 없다. 껍데기만 pre-render된 상태이기때문
//getServerSideProps 를 사용하여 ssr을 구현한다.
import axios from 'axios';
import Head from 'next/head';
import { useEffect } from 'react';

const PID = ({ item, name }) => {
  // title, description이 들어감으로서 검색엔진에서 사용할 수 있다.
  return (
    <>
      <Head>
        <title>{item.name}</title>
        <meta name="description" content={item.description}></meta>
      </Head>
      {name} 환경 입니다.
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
export async function getStaticPaths() {
  // 빌드시점에 paths로 넘어온 페이지를 getStaticProps에서 동적으로 정적 HTML을 생성한다.
  return {
    paths: [{ params: { pid: '495' } }, { params: { pid: '488' } }, { params: { pid: '477' } }],
    fallback: false,
  };
}

/*495,488,477 html페이지들이 만들어졌다.*/
/*fallback이 false면 에러 대응을 해주지 않는다. paths에 없는 pid에 대해서 404에러를 바로띄운다
  fallback을 true로 바꾸면 처음 접속한 유저만 CSR로 빈화면을 보게되고 이후 정적파일이 생성되어 이후 유저들은 정적파일을 볼수 있다.
  위의 상황은 prefetch가 false일때이고 prefetch가 default로 true이기때문에 scroll만 내려도 정적파일이 생성된다.
*/
export async function getStaticProps(context) {
  // 빌드시 딱 한번 호출되고 바로 static file로 빌드시킴
  // context는 params 요청, 응답 쿼리들을 받는다
  const pid = context.params.pid;
  const apiUrl = `http://makeup-api.herokuapp.com/api/v1/products/${pid}.json`;
  const res = await axios.get(apiUrl);
  const data = res.data;

  return {
    props: {
      item: data,
      name: process.env.name,
    },
  };
}
