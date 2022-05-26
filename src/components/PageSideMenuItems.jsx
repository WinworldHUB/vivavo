import jsonData from "./PageSideMenuItems.json";

function PageSideMenuItems() {
  const menuItmes = () => JSON.parse(JSON.stringify(jsonData));

  const listItems = menuItmes.map((menuItem) => (
    <li className="nav-item">
      <a href="index.html">
        <i className="{'la' + menuItem.icon }"></i>
        <span className="menu-title" data-i18n="">
          {menuItem.title}
        </span>
      </a>
    </li>
  ));
  return <h1>Hi</h1>;
}
