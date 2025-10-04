import Link from "next/link";
import css from "./sidebar.module.css";
const Sidebar = () => {
  const Tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];
  return (
    <div>
      <ul className={css.menuList}>
        {Tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
