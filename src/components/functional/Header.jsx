import ThemeToggle from './ThemeToggle.jsx'

function Header(props) {
  return (
    <header className="header">
      <h1>{props.title}</h1>
      <ThemeToggle />
    </header>
  )
}

export default Header
