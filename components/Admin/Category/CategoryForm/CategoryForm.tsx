import type { Dispatch, FormEvent, FunctionComponent, SetStateAction } from 'react';
import type { Category } from '@prisma/client';
import { useState, useEffect } from 'react';
import { api } from '../../../../api/api';
import InputField from '../../../InputField/InputField';
import Message from '../../../Message/Message';
import Warning from '../../../Warning/Warning';
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
  
  const [categoryName, setCategoryName] = useState<string>('');

  const [message, setMessage] = useState<string>('');
  const [warningMessage, setWarningMessage] = useState<string>('');
  const [disableButton, setDisableButton] = useState<boolean>(false);

  useEffect(() => {
    if(categoryName.length > 30) {
      setWarningMessage("Le nom d'une catégorie ne doit pas excéder 30 caractères");
      setDisableButton(true);
    } else {
      setWarningMessage('');
      setDisableButton(false);
    };
  }, [categoryName]);

  const checkForm = () => {
    if(categoryName.length > 30) {
      setWarningMessage("Le nom d'une catégorie ne doit pas excéder 30 caractères");
      setDisableButton(true);
      return false;

    } else if(categoryName.trim() === '') {
      setWarningMessage("Entre un nom de catégorie valide");
      setDisableButton(true);
      return false;

    } else {
      return true;
    };
  };

  const handleSubmitForm = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(checkForm()) {
      setDisableButton(true);
      setShowLoader(true);
      setWarningMessage('');
      setMessage('');

      const token = localStorage.getItem('token');

      await fetch(`${api}/category/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify({ name: categoryName })
      })
      .then(async(res) => {

        const data = await res.json();

        if(res.status == 201) {
          // push our new category on a new array
          const newCategories = [...categories, data];
          // update state with this new array
          setCategories(newCategories);

          setMessage('Catégorie ajoutée ✅');

          // then, reset state
          setCategoryName('');

        } else if(data.meta.target.includes('name')) {

          setWarningMessage('Cette catégorie existe déjà');

        } else {
          setWarningMessage('Un problème est survenu');
        };

        setDisableButton(false);
        setShowLoader(false);
      })
      .catch((error) => {
        setWarningMessage('Un problème est survenu');

        setShowLoader(false);
        console.log(error);
      });
    };
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
          isDisabled={false}
          required={true}
          autoFocus={false}
          setState={setCategoryName}
        />

        <button
          className={styles.button}
          type='submit'
          title='Ajouter une nouvelle catégorie'
          aria-label='Ajouter une nouvelle catégorie'
          disabled={disableButton}
        >
          +
        </button>
      </form>

      {message &&
        <Message
          message={message}
          setMessage={setMessage}
        />
      }

      {warningMessage &&
        <Warning
          warningMessage={warningMessage}
          setWarningMessage={setWarningMessage}
        />
      }
    </>
  );
};

export default CategoryForm;