import type { Category } from '@prisma/client';
import type { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { useState } from 'react';
import { api } from '../../../../api/api';

import styles from './CategoryCard.module.scss';
import IconButton from '../../../IconButton/IconButton';
import IconTrash from '../../../../public/Icons/IconTrash';
import Message from '../../../Message/Message';

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

  const [message, setMessage] = useState<string>('');

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
        setMessage(`✅ La catégorie "${name}" a bien été supprimée`);

      } else {
        setMessage('❌ Une erreur est survenue');
      };
    })
    .catch((error) => {
      setMessage('❌ Une erreur est survenue');
    });

      setShowLoader(false);
  };

  return (
    <>
      <article className={styles.card}>
        <header>
          <h2 className={styles.name}>
            {name}
          </h2>
        </header>

        <footer>
          <IconButton
            title="Supprimer cette catégorie"
            handleFunction={handleDeleteCategory}
          >
            <IconTrash />
          </IconButton>
        </footer>
      </article>

      {message &&
        <Message
          message={message}
          setMessage={setMessage}
        />
      }
    </>
  );
};

export default CategoryCard;