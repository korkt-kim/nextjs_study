/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import { Grid } from 'semantic-ui-react';
import styles from './ItemList.module.css';
import Link from 'next/link';
export default function ItemList({ list }) {
  return (
    <div>
      list
      <Grid columns={3} divided>
        <Grid.Row>
          {list.map((item, index) => {
            return (
              <Grid.Column key={index}>
                <Link href={`/detail/${item.id}`}>
                  <a>
                    <div className={styles.wrap}>
                      <img src={item.image_link} alt={item.name} className={styles.img_item} />
                      <strong className={styles.tit_item}>{item.name}</strong>
                      <span className={styles.txt_info}>
                        {item.category} {item.product_type}
                      </span>
                      <strong>{item.price}</strong>
                    </div>
                  </a>
                </Link>
              </Grid.Column>
            );
          })}
        </Grid.Row>
      </Grid>
    </div>
  );
}
