export default function validation(input) {
  const errors = {};
  
  if (!input.name) {
    errors.name = "Name is required";
  } else if (input.name.length < 4) {
    errors.name = "Game name must have at least 4 chars";
  }

  if (input.name[0] === " ") {
    errors.name = "No spaceblanks allowed";
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

  if (!input.description) {
    errors.description = "Description is required";
  } else if (input.description.length < 10) {
    errors.description = "Description must have at least 10 chars";
  }

  if (!input.background_image) {
    errors.background_image = "Image URL is required";
  }
  if (input.background_image[0] === " ") {
    errors.background_image = "No spaceblanks allowed";
  }

  if (input.genres.length < 1) {
    errors.genres = "At least one genre";
  }

  if (input.platforms.length < 1) {
    errors.platforms = "At least one platform";
  }

  return errors;
}
