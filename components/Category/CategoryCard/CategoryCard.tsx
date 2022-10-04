import type { Category } from '@prisma/client';
import type { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { api } from '../../../api/api';
import Image from 'next/image';
import trash from '../../../public/icons/delete.svg';
import styles from './CategoryCard.module.scss';
import ImageButton from '../../ImageButton/ImageButton';

type Props = {
  id: number,
  name: string,
  setCategories: Dispatch<SetStateAction<Category[]>>
  setShowLoader: Dispatch<SetStateAction<boolean>>
};

const CategoryCard: FunctionComponent<Props> = ({
  id,
  name,
  setCategories,
  setShowLoader
}) => {

  const handleDeleteCategory = async() => {
    
    setShowLoader(true);
    const token = localStorage.getItem('token');

    await fetch(`${api}/category/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify({ id })
    })
    .then(async(res) => {
      if(res.status === 200) {

        const data = await res.json();

        setCategories(data);

      } else {
        console.log('une erreur est survenue');
      };

      setShowLoader(false);
    })
    .catch((error) => {
      console.log(error);
      setShowLoader(false);
    });
  };

  return (
    <article className={styles.card}>
      <header>
        <h2 className={styles.name}>
          {name}
        </h2>
      </header>

      <footer>
        <ImageButton
          title={"Supprimer cette catégorie"}
          img={trash}
          alt={"Une poubelle"}
          handleFunction={handleDeleteCategory}
        />
      </footer>
    </article>
  );
};

export default CategoryCard;