import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { CategoryScale, Chart } from "chart.js";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <section>
      <h1>CSR</h1>
      <ul>
        <li>
          <Link href="/Chart/CSR/Chartjs">Chart/CSR/Chartjs</Link>
        </li>
        <li>
          <Link href="/Chart/CSR/Echart">Chart/CSR/Echart</Link>
        </li>
        <li>
          <Link href="/Chart/CSR/Rechart">Chart/CSR/Rechart</Link>
        </li>
      </ul>
      <h1>SSR</h1>
      <ul>
        <li>
          <Link href="/Chart/SSR/Chartjs">Chart/SSR/Chartjs</Link>
        </li>
        <li>
          <Link href="/Chart/SSR/Echart">Chart/SSR/Echart</Link>
        </li>
        <li>
          <Link href="/Chart/SSR/Rechart">Chart/SSR/Rechart</Link>
        </li>
      </ul>
    </section>
  );
}
