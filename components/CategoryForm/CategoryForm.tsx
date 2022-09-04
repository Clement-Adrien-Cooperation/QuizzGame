import { Category } from '@prisma/client';
import { useRouter } from 'next/router';
import { ChangeEvent, Dispatch, FormEvent, FunctionComponent, SetStateAction, useState } from 'react';
import InputField from '../InputField/InputField';
import Notification from '../Notification/Notification';
import styles from './CategoryForm.module.scss';

type Props = {
  categories: Category[],
  setCategories: Dispatch<SetStateAction<Category[]>>
  setShowLoader: Dispatch<SetStateAction<boolean>>,
};

const CategoryForm: FunctionComponent<Props> = ({
  categories,
  setCategories,
  setShowLoader
}) => {

  const router = useRouter();

  const [categoryName, setCategoryName] = useState<string>('');

  const [notification, setNotification] = useState<string>('');
  const [warningMessage, setWarningMessage] = useState<string>('');
  const [disableButton, setDisableButton] = useState<boolean>(false);

  const handleChangeCategoryName = (event: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  const handleSubmitForm = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setDisableButton(true);
    setShowLoader(true);
    setWarningMessage('');
    setNotification('');

    const token = localStorage.getItem('token');

    await fetch('/api/category/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify({ name: categoryName })
    })
    .then(async(res) => {

      if(res.status == 201) {

        const data = await res.json();
        // push our new category on a new array
        const newCategories = [...categories, data];
        // update state with this new array
        setCategories(newCategories);
        
      } else {
        router.push('/');
      };
      
      setDisableButton(false);
      setShowLoader(false);
    })
    .catch((error) => {
      setWarningMessage('Cette catégorie existe pas');
      
      setShowLoader(false);
      console.log(error);
    });
  };

  return (
    <>
      <form
        className={styles.form}
        title='Ajouter une nouvelle catégorie'
        aria-label='Ajouter une nouvelle catégorie'
        onSubmit={handleSubmitForm}
      >
        <InputField
          name={'Ajouter une catégorie'}
          state={categoryName}
          inputID={'category'}
          type={'text'}
          isDisabled={disableButton}
          required={true}
          autoFocus={false}
          handleFunction={handleChangeCategoryName}
        />
        
        <button
          className={styles.button}
          type='submit'
          title='Ajouter une nouvelle catégorie'
          aria-label='Ajouter une nouvelle catégorie'
        >
          +
        </button>
      </form>

      {notification && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}
    </>
  );
};

export default CategoryForm;