import css from "./TagsMenu.module.css";

const TagsMenu = () => {
  const Tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];
  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton}>Notes ▾</button>
      <ul className={css.menuList}>
        {Tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <a href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagsMenu;
