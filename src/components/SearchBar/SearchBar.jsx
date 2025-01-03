import { Formik, Form, Field } from 'formik';
import style from './SearchBar.module.css';

const SearchBar = ({ handleSubmit }) => {
  return (
    <Formik initialValues={{ search: '' }} onSubmit={handleSubmit}>
      {({ handleChange, handleSubmit, values }) => (
        <Form onSubmit={handleSubmit} className={style.searchForm}>
          <Field
            name="search"
            placeholder="Search movies"
            value={values.search}
            onChange={handleChange}
            className={style.searchField}
          />
          <button className={style.searchBtn} type="submit">
            Search
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SearchBar;
