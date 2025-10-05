import css from "./layout.module.css";
interface Props {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}
const Layout = ({ children, sidebar }: Props) => {
  return (
    <div className={css.layout}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <main className={css.main}>{children}</main>
    </div>
  );
};

export default Layout;
