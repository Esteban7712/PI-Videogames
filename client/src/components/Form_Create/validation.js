export default function validation(input) {
  const errors = {};
  
  if (!input.name) {
    errors.name = "Name is required";
  }
  if (!input.rating) {
    errors.rating = "Rating is required";
  } else if (
    Number(input.rating) > 5 ||
    Number(input.rating) < 1 ||
    isNaN(Number(input.rating))
  ) {
    errors.rating = "Rating is invalid - Between 0 & 5";
  }
  if (!input.released) {
    errors.released = "Released is required";
  }
  if (!input.released) {
    errors.released = "Released is required";
  }
  if (!input.description) {
    errors.description = "description is required";
  }
  if (input.genres.length < 1) {
    errors.genres = "At least one genre";
  }
  if (input.platforms.length < 1) {
    errors.platforms = "At least one platform";
  }

  return errors;
}
