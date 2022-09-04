import { Category, User } from '@prisma/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import CategoryForm from '../../components/CategoryForm/CategoryForm';
import InputField from '../../components/InputField/InputField';
import styles from '../../styles/admin/Categories.module.scss';

type Props = {
  categoriesData: Category[],
  isLogged: boolean,
  userLogged: User,
  setShowLoader: Dispatch<SetStateAction<boolean>>
};

const Categories: NextPage<Props> = ({
  categoriesData,
  isLogged,
  userLogged,
  setShowLoader
}) => {

  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  
  useEffect(() => {

    if(isLogged) {
      if(userLogged.is_banished) {
        router.push('/banned');
      } else if(userLogged.is_admin) {

        setCategories(categoriesData);
        document.title = "Modérer les catégories - s'Quizz Game";

      } else {
        router.push('/');
      };
    } else {
      router.push('/');
    };
  }, []);

  const handleChangeCategoryFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setCategoryFilter(event.target.value);
  };

  return (
    <>
      <AdminHeader />

      <section className={styles.container}>

        <CategoryForm
          categories={categories}
          setCategories={setCategories}
          setShowLoader={setShowLoader}
        />

        {categories.length > 0 && (
          <div className={styles.categories}>

            <header className={styles.header}>
              <h1 className={styles.title}>
                Catégories
              </h1>
            </header>

            {categories?.length < 10 ? '' :
            
              <InputField
                name={'Filtrer les catégories...'}
                state={categoryFilter}
                inputID={'category-filter'}
                type={'text'}
                isDisabled={false}
                required={true}
                autoFocus={true}
                handleFunction={handleChangeCategoryFilter}
              />
            }

            <ul className={styles.list}>
              {categories?.map((category: Category) => {

                const filteredName = category.name.toLocaleLowerCase();
                const filter = categoryFilter.toLowerCase();

                if(filteredName.includes(filter)) {
                  return (
                    <li key={uuidv4()}>
                      <CategoryCard
                        id={category.id}
                        name={category.name}
                        setCategories={setCategories}
                        setShowLoader={setShowLoader}
                      />
                    </li>
                  );
                };
              })}
            </ul>
          </div>
        )}
      </section>
    </>
  );
};

export default Categories;

export async function getStaticProps() {

  // Get data from API
  const categoriesDataFromAPI = await fetch('http://localhost:3000/api/category/getAll');

  // Translate to JSON
  const categoriesData = await categoriesDataFromAPI.json();

  // We return data & using it in the state
  return {
    props: {
      categoriesData
    }
  };
};