import PropTypes from "prop-types";

export const funcPropType = PropTypes.func;
export const ingredientPropType = PropTypes.shape({
  count: PropTypes.number,
  calories: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  __v: PropTypes.number,
  _id: PropTypes.string.isRequired,
})
export const ingredientArrayPropType = PropTypes.arrayOf(ingredientPropType)

export const ingredientsObjectPropType = PropTypes.shape({
  [PropTypes.string]: ingredientArrayPropType,
  [PropTypes.string]: ingredientArrayPropType,
  [PropTypes.string]: ingredientArrayPropType,
});

export const modalInfoPropType = PropTypes.shape({
  header: PropTypes.string,
  ingredient: PropTypes.bool,
  order: PropTypes.bool,
  element: ingredientPropType,
})