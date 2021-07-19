import style from "./Styles.module.css";

export function Note({ prop, handleDelete, handleEdit }) {
  console.log(prop);
  return (
    <div className={style.section}>
      {prop.map((ele) => {
        return (
          <div key={ele.id}>
            <h2>{ele.title}</h2>
            <p>{ele.desc}</p>
            <button onClick={() => handleDelete(ele.id)}>Delete</button>
            <button onClick={() => handleEdit(ele.id)}>Edit</button>
          </div>
        );
      })}
    </div>
  );
}
