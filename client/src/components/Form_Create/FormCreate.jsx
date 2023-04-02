import { useState } from "react";



export default function FormCreate() { 

    const [form, setForm] = useState({
      name: "",
      platforms: [],
      description: "",
      released: "",
      rating: 0,
    });

  const changeHandler = (e) => {
    const property = e.target.name;
    const value = e.target.value
    setForm({...form, [property]:value});  
    
    }
  
    return (
      <form>
        <div>
          <label>Name: </label>
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={changeHandler}
          />
        </div>
        <div>
          <label>Platforms: </label>
          <input
            name="platforms"
            type="text"
            value={form.platforms}
            onChange={changeHandler}
          />
        </div>
        <div>
          <label>Description: </label>
          <input
            name="description"
            type="text"
            value={form.description}
            onChange={changeHandler}
          />
        </div>
        <div>
          <label>Released: </label>
          <input
            name="released"
            type="text"
            value={form.released}
            onChange={changeHandler}
          />
        </div>
        <div>
          <label>Rating: </label>
          <input
            name="rating"
            type="text"
            value={form.rating}
            onChange={changeHandler}
          />
        </div>
        <button>Create</button>
      </form>
    );
}