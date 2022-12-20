import type { Dispatch, SetStateAction } from 'react';
import type { Category, User } from '@prisma/client';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { api } from '../../api/api';
import AdminHeader from '../../components/Admin/AdminHeader/AdminHeader';
import CategoryCard from '../../components/Admin/Category/CategoryCard/CategoryCard';
import CategoryForm from '../../components/Admin/Category/CategoryForm/CategoryForm';
import InputField from '../../components/InputField/InputField';
import styles from '../../styles/admin/Categories.module.scss';

type Props = {
  categoriesData: Category[],
  isLogged: boolean,
  userLogged: User,
  setShowLoader: Dispatch<SetStateAction<boolean>>,
  setPageTitle: Dispatch<SetStateAction<string>>
};

const Categories: NextPage<Props> = ({
  categoriesData,
  isLogged,
  userLogged,
  setShowLoader,
  setPageTitle
}) => {

  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {

    if(isLogged) {
      if(userLogged.is_banished) {
        router.push('/banned');
      } else if(userLogged.is_admin) {

        setCategories(categoriesData);
        setPageTitle("Modérer les catégories - s'Quizz Game");

      } else {
        router.push('/');
      };
    } else {
      router.push('/');
    };
  }, []);

  const displayedCategories = useMemo(() => {
    if(filter) {
      return categoriesData.filter((category: Category) => {
        return category.name.toLowerCase().includes(filter.toLowerCase());
      });
    };

    return categoriesData;

  }, [filter]);

  return (
    <>
      <AdminHeader />

      <section className={styles.container}>

        <header className={styles.header}>
          <h1 className={styles.title}>
            Catégories
          </h1>
        </header>

        <CategoryForm
          categories={categories}
          setCategories={setCategories}
          setShowLoader={setShowLoader}
        />

        {categoriesData.length > 0 &&
          <div className={styles.categories}>

            {categories?.length > 10 &&
              <InputField
                name={'Filtrer les catégories...'}
                state={filter}
                inputID={'category-filter'}
                type={'search'}
                isDisabled={false}
                required={true}
                autoFocus={true}
                setState={setFilter}
              />
            }

            <ul className={styles.list}>
              {displayedCategories.map((category: Category) =>
                <li key={uuidv4()}>
                  <CategoryCard
                    id={category.id}
                    name={category.name}
                    setCategories={setCategories}
                    setShowLoader={setShowLoader}
                  />
                </li>
              )}
            </ul>
          </div>
        }
      </section>
    </>
  );
};

export default Categories;

export async function getStaticProps() {

  // Get data from API
  const categoriesDataFromAPI = await fetch(`${api}/category/getAll`);

  // Translate to JSON
  const categoriesData = await categoriesDataFromAPI.json();

  // We return data & using it in the state
  return {
    props: {
      categoriesData
    },
    revalidate: 60
  };
};