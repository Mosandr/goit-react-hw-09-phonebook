import { connect } from "react-redux";
import { filterChange } from "../../redux/contacts/contacts-actions";
import { getFilter } from "../../redux/contacts/contacts-selectors";
import shortId from "shortid";
import styles from "./Filter.module.scss";

const Filter = ({ value, onFilterChange }) => {
  const id = shortId.generate();
  return (
    <div className={styles.filter}>
      <label htmlFor={id}>Find Contacts by name</label>
      <input
        className={styles.input}
        id={id}
        onChange={onFilterChange}
        type="text"
        name="filter"
        value={value}
      ></input>
    </div>
  );
};

const mapStateToProps = (state) => ({
  value: getFilter(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFilterChange: ({ target }) => dispatch(filterChange(target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
